import { ButtonHTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import styles from './MenuOption.module.css';

export interface MenuOptionProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type' | 'prefix'>,
    CvElement {
  label: string;
  subLabel?: string;
  selected?: boolean;
  collapsed?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const MenuOption = ({
  id,
  'data-qa': dataQa,
  className = '',
  label,
  subLabel,
  selected = false,
  collapsed = false,
  prefix,
  suffix,
  'aria-label': ariaLabel,
  onClick,
}: MenuOptionProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  const showSubLabel = !collapsed && Boolean(subLabel);
  /** Collapsed rail + explicit `aria-label`: name comes from the button only, not duplicated in DOM */
  const suppressTextColumn = collapsed && Boolean(ariaLabel);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={classNames(
        styles.root,
        {
          [styles.selected]: selected,
          [styles.collapsed]: collapsed,
        },
        className
      )}
      data-qa={dataQa || undefined}
      id={id}
      onClick={handleClick}
    >
      <span className={classNames(styles.iconLabelContainer, { [styles.collapsed]: collapsed })}>
        {prefix}
        {!suppressTextColumn && (
          <span
            className={classNames(styles.labelContainer, {
              [styles.hidden]: collapsed,
            })}
          >
            <span className={styles.label}>{label}</span>
            {showSubLabel && <span className={styles.subLabel}>{subLabel}</span>}
          </span>
        )}
      </span>
      {!collapsed && suffix && <span className={styles.suffix}>{suffix}</span>}
    </button>
  );
};
