import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { createPortal } from 'react-dom';

import styles from './Popover.module.css';

const SPACING = 8;
const VIEWPORT_PADDING = 16;
const FALLBACK_WIDTH = 200;
const FALLBACK_HEIGHT = 100;
const ANIMATION_DELAY = 16;
const FALLBACK_TIMEOUT = 50;

export enum PopoverPlacement {
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  RIGHT_TOP = 'right-top',
  LEFT_TOP = 'left-top',
  RIGHT_BOTTOM = 'right-bottom',
  LEFT_BOTTOM = 'left-bottom',
  RIGHT_CENTER = 'right-center',
  LEFT_CENTER = 'left-center',
}

interface Position {
  top: number;
  left: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface SpaceInfo {
  above: number;
  below: number;
  left: number;
  right: number;
}

export interface PopoverProps extends CvElement {
  /** Element that the popover is anchored to */
  anchorEl: HTMLElement | null;
  /** Content of the popover */
  children?: ReactNode;
  /** Container element for the portal */
  container?: Element | null;
  /** If true, the popover is open */
  open?: boolean;
  /** Placement of the popover relative to the anchor */
  placement?: PopoverPlacement;
  /** Callback fired when the popover requests to be closed */
  onClose: () => void;
  /**
   * Extra roots that count as “inside” for outside-dismiss (e.g. a chained sub-popover
   * portaled next to this one).
   */
  outsideInteractionContainers?: readonly (HTMLElement | null)[];
}

const getScrollOffset = () => ({
  x: window.pageXOffset || document.documentElement.scrollLeft,
  y: window.pageYOffset || document.documentElement.scrollTop,
});

const getAvailableSpace = (anchorRect: DOMRect): SpaceInfo => ({
  above: anchorRect.top,
  below: window.innerHeight - anchorRect.bottom,
  left: anchorRect.left,
  right: window.innerWidth - anchorRect.right,
});

const getDimensions = (rect: DOMRect): Dimensions => ({
  width: rect.width || FALLBACK_WIDTH,
  height: rect.height || FALLBACK_HEIGHT,
});

const getOptimalPlacement = (
  requestedPlacement: PopoverPlacement,
  space: SpaceInfo,
  popoverDimensions: Dimensions
): PopoverPlacement => {
  let actualPlacement = requestedPlacement;
  const { width: popoverWidth, height: popoverHeight } = popoverDimensions;
  const requiredSpace = SPACING + VIEWPORT_PADDING;

  if (requestedPlacement.startsWith('bottom-')) {
    const fitsBelow = space.below >= popoverHeight + requiredSpace;
    const fitsAbove = space.above >= popoverHeight + requiredSpace;
    if (!fitsBelow && fitsAbove) {
      actualPlacement = requestedPlacement.replace('bottom-', 'top-') as PopoverPlacement;
    }
  } else if (requestedPlacement.startsWith('top-')) {
    const fitsAbove = space.above >= popoverHeight + requiredSpace;
    const fitsBelow = space.below >= popoverHeight + requiredSpace;
    if (!fitsAbove && fitsBelow) {
      actualPlacement = requestedPlacement.replace('top-', 'bottom-') as PopoverPlacement;
    }
  }

  if (actualPlacement.endsWith('-left')) {
    const fitsLeft = space.right >= popoverWidth + requiredSpace;
    const fitsRight = space.left >= popoverWidth + requiredSpace;
    if (!fitsLeft && fitsRight) {
      actualPlacement = actualPlacement.replace('-left', '-right') as PopoverPlacement;
    }
  } else if (actualPlacement.endsWith('-right')) {
    const fitsRight = space.left >= popoverWidth + requiredSpace;
    const fitsLeft = space.right >= popoverWidth + requiredSpace;
    if (!fitsRight && fitsLeft) {
      actualPlacement = actualPlacement.replace('-right', '-left') as PopoverPlacement;
    }
  }

  if (actualPlacement.startsWith('right-')) {
    const fitsRight = space.right >= popoverWidth + requiredSpace;
    const fitsLeft = space.left >= popoverWidth + requiredSpace;
    if (!fitsRight && fitsLeft) {
      actualPlacement = actualPlacement.replace('right-', 'left-') as PopoverPlacement;
    }
  } else if (actualPlacement.startsWith('left-')) {
    const fitsLeft = space.left >= popoverWidth + requiredSpace;
    const fitsRight = space.right >= popoverWidth + requiredSpace;
    if (!fitsLeft && fitsRight) {
      actualPlacement = actualPlacement.replace('left-', 'right-') as PopoverPlacement;
    }
  }

  return actualPlacement;
};

const calculatePositionForPlacement = (
  placement: PopoverPlacement,
  anchorRect: DOMRect,
  popoverDimensions: Dimensions,
  scrollOffset: { x: number; y: number }
): Position => {
  const { width: popoverWidth, height: popoverHeight } = popoverDimensions;

  switch (placement) {
    case PopoverPlacement.TOP_LEFT:
      return {
        top: anchorRect.top + scrollOffset.y - popoverHeight - SPACING,
        left: anchorRect.left + scrollOffset.x,
      };
    case PopoverPlacement.TOP_RIGHT:
      return {
        top: anchorRect.top + scrollOffset.y - popoverHeight - SPACING,
        left: anchorRect.right + scrollOffset.x - popoverWidth,
      };
    case PopoverPlacement.BOTTOM_LEFT:
      return {
        top: anchorRect.bottom + scrollOffset.y + SPACING,
        left: anchorRect.left + scrollOffset.x,
      };
    case PopoverPlacement.BOTTOM_RIGHT:
      return {
        top: anchorRect.bottom + scrollOffset.y + SPACING,
        left: anchorRect.right + scrollOffset.x - popoverWidth,
      };
    case PopoverPlacement.RIGHT_TOP:
      return {
        top: anchorRect.top + scrollOffset.y,
        left: anchorRect.right + scrollOffset.x + SPACING,
      };
    case PopoverPlacement.LEFT_TOP:
      return {
        top: anchorRect.top + scrollOffset.y,
        left: anchorRect.left + scrollOffset.x - popoverWidth - SPACING,
      };
    case PopoverPlacement.RIGHT_BOTTOM:
      return {
        top: anchorRect.bottom + scrollOffset.y - popoverHeight,
        left: anchorRect.right + scrollOffset.x + SPACING,
      };
    case PopoverPlacement.LEFT_BOTTOM:
      return {
        top: anchorRect.bottom + scrollOffset.y - popoverHeight,
        left: anchorRect.left + scrollOffset.x - popoverWidth - SPACING,
      };
    case PopoverPlacement.RIGHT_CENTER:
      return {
        top: anchorRect.top + scrollOffset.y + (anchorRect.height - popoverHeight) / 2,
        left: anchorRect.right + scrollOffset.x + SPACING,
      };
    case PopoverPlacement.LEFT_CENTER:
      return {
        top: anchorRect.top + scrollOffset.y + (anchorRect.height - popoverHeight) / 2,
        left: anchorRect.left + scrollOffset.x - popoverWidth - SPACING,
      };
    default:
      return {
        top: anchorRect.top + scrollOffset.y - popoverHeight - SPACING,
        left: anchorRect.left + scrollOffset.x,
      };
  }
};

const constrainToViewport = (
  position: Position,
  popoverDimensions: Dimensions,
  scrollOffset: { x: number; y: number }
): Position => {
  const { width: popoverWidth, height: popoverHeight } = popoverDimensions;

  const minLeft = scrollOffset.x + VIEWPORT_PADDING;
  const maxLeft = scrollOffset.x + window.innerWidth - popoverWidth - VIEWPORT_PADDING;
  const minTop = scrollOffset.y + VIEWPORT_PADDING;
  const maxTop = scrollOffset.y + window.innerHeight - popoverHeight - VIEWPORT_PADDING;

  return {
    left: Math.max(minLeft, Math.min(maxLeft, position.left)),
    top: Math.max(minTop, Math.min(maxTop, position.top)),
  };
};

export const Popover = ({
  anchorEl,
  children,
  container,
  'data-qa': dataQa,
  id,
  open = false,
  placement = PopoverPlacement.BOTTOM_LEFT,
  className = '',
  onClose,
  outsideInteractionContainers,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);

  const calculatePosition = useCallback(() => {
    if (!popoverRef.current || !anchorEl) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const scrollOffset = getScrollOffset();

    const popoverDimensions = getDimensions(popoverRect);
    const availableSpace = getAvailableSpace(anchorRect);
    const optimalPlacement = getOptimalPlacement(placement, availableSpace, popoverDimensions);

    let calculatedPosition = calculatePositionForPlacement(
      optimalPlacement,
      anchorRect,
      popoverDimensions,
      scrollOffset
    );

    calculatedPosition = {
      top: isNaN(calculatedPosition.top)
        ? anchorRect.bottom + scrollOffset.y + SPACING
        : calculatedPosition.top,
      left: isNaN(calculatedPosition.left)
        ? anchorRect.left + scrollOffset.x
        : calculatedPosition.left,
    };

    calculatedPosition = constrainToViewport(calculatedPosition, popoverDimensions, scrollOffset);

    setPosition(calculatedPosition);
    setTimeout(() => setIsPositioned(true), ANIMATION_DELAY);
  }, [anchorEl, placement]);

  useLayoutEffect(() => {
    if (!open || !anchorEl || !popoverRef.current) {
      if (!open) setIsPositioned(false);
      return;
    }

    setIsPositioned(false);

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        calculatePosition();
        resizeObserver.disconnect();
      }
    });

    resizeObserver.observe(popoverRef.current);

    const fallbackTimeout = setTimeout(() => {
      calculatePosition();
      resizeObserver.disconnect();
    }, FALLBACK_TIMEOUT);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(fallbackTimeout);
    };
  }, [open, anchorEl, placement, calculatePosition]);

  useEffect(() => {
    if (!open) return;

    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [open, calculatePosition]);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideChained = outsideInteractionContainers?.some(
        (root) => root && root.contains(target)
      );
      const isClickOutside =
        popoverRef.current &&
        anchorEl &&
        !popoverRef.current.contains(target) &&
        !anchorEl.contains(target) &&
        !insideChained;

      if (isClickOutside) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open, onClose, anchorEl, outsideInteractionContainers]);

  if (!open || !anchorEl) {
    return null;
  }

  const portalContainer = container ?? document.body;

  return createPortal(
    <div role="presentation" tabIndex={-1}>
      <div
        className={classNames(styles.root, { [styles.visible]: isPositioned }, className)}
        ref={popoverRef}
        id={id}
        data-qa={dataQa || undefined}
        tabIndex={0}
        style={{ top: position.top, left: position.left }}
      >
        {children}
      </div>
    </div>,
    portalContainer
  );
};
