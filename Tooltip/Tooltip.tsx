import {
  Children,
  cloneElement,
  FocusEvent,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { createPortal } from 'react-dom';

import styles from './Tooltip.module.css';

/** Gap between anchor and tooltip; matches `--spacing-xs` (8px). */
const TOOLTIP_OFFSET_PX = 8;

export enum TooltipPlacement {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export interface TooltipProps extends CvElement {
  /** Tooltip text (shown on hover and keyboard focus when not `disabled`). */
  title: string;
  /** Position relative to the trigger. Collapsed sidebar uses `right`. */
  placement?: TooltipPlacement;
  /** When true, renders `children` only (no tooltip wrapper logic). */
  disabled?: boolean;
  children: ReactElement;
}

export const Tooltip = ({
  'data-qa': dataQa,
  children,
  className = '',
  id,
  title,
  placement = TooltipPlacement.RIGHT,
  disabled = false,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const triggerWrapRef = useRef<HTMLDivElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const setOpenIfEnabled = (next: boolean) => {
    if (!disabled && title) {
      setOpen(next);
    }
  };

  useLayoutEffect(() => {
    if (!open || !triggerWrapRef.current || !surfaceRef.current) {
      return;
    }

    const anchor = triggerWrapRef.current.getBoundingClientRect();
    const bubble = surfaceRef.current.getBoundingClientRect();
    const pad = TOOLTIP_OFFSET_PX;
    let top = 0;
    let left = 0;

    switch (placement) {
      case TooltipPlacement.RIGHT:
        top = anchor.top + anchor.height / 2 - bubble.height / 2;
        left = anchor.right + pad;
        break;
      case TooltipPlacement.LEFT:
        top = anchor.top + anchor.height / 2 - bubble.height / 2;
        left = anchor.left - bubble.width - pad;
        break;
      case TooltipPlacement.TOP:
        top = anchor.top - bubble.height - pad;
        left = anchor.left + anchor.width / 2 - bubble.width / 2;
        break;
      case TooltipPlacement.BOTTOM:
        top = anchor.bottom + pad;
        left = anchor.left + anchor.width / 2 - bubble.width / 2;
        break;
      default:
        left = anchor.right + pad;
        top = anchor.top + anchor.height / 2 - bubble.height / 2;
    }

    const maxTop = window.innerHeight - bubble.height - pad;
    const maxLeft = window.innerWidth - bubble.width - pad;
    setPosition({
      top: Math.max(pad, Math.min(top, maxTop)),
      left: Math.max(pad, Math.min(left, maxLeft)),
    });
  }, [open, placement, title]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const child = Children.only(children);
  if (!isValidElement(child)) {
    throw new Error('Tooltip expects a single React element child');
  }

  const trigger = child as ReactElement<HTMLAttributes<HTMLElement>>;

  const mergedChild = cloneElement(trigger, {
    onFocus: (event: FocusEvent<HTMLElement>) => {
      trigger.props.onFocus?.(event);
      setOpenIfEnabled(true);
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      trigger.props.onBlur?.(event);
      setOpenIfEnabled(false);
    },
  });

  return (
    <>
      <div
        ref={triggerWrapRef}
        className={styles.trigger}
        onMouseEnter={() => setOpenIfEnabled(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {mergedChild}
      </div>
      {open
        ? createPortal(
            <div
              ref={surfaceRef}
              id={id}
              className={classNames(styles.surface, className)}
              role="presentation"
              aria-hidden
              data-qa={dataQa || undefined}
              style={{ top: position.top, left: position.left }}
            >
              {title}
            </div>,
            document.body
          )
        : null}
    </>
  );
};
