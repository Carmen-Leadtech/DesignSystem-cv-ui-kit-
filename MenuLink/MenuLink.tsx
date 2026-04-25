import { ButtonHTMLAttributes, MouseEventHandler, ReactNode, useState } from 'react';

import classNames from 'classnames';
import { CvElement } from 'types/CvElement';

import { Badge } from 'components/Badge/Badge';
import { Icon } from 'components/Icon/Icon';

import styles from './MenuLink.module.css';

export interface MenuLinkProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'>,
    CvElement {
  label: string;
  subLabel?: string;
  suffix?: ReactNode;
  iconName?: string;
  iconColor?: string;
  badge?: string;
  selected?: boolean;
  collapsed?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}

export const MenuLink = ({
  'data-qa': dataQa,
  className = '',
  id,
  label,
  subLabel,
  suffix,
  iconName,
  iconColor,
  badge,
  selected = false,
  collapsed = false,
  'aria-label': ariaLabel,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  ...rest
}: MenuLinkProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const showBadge = !collapsed && Boolean(badge);
  const showSubLabel = !collapsed && Boolean(subLabel);
  const resolvedIconColor =
    iconColor ?? (selected ? 'var(--color-icons-brand)' : 'var(--color-icons-default)');

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      type="button"
      {...rest}
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
      onMouseEnter={(e) => {
        onMouseEnter();
        onMouseEnterProp?.(e);
      }}
      onMouseLeave={(e) => {
        onMouseLeave();
        onMouseLeaveProp?.(e);
      }}
    >
      <span className={classNames(styles.iconLabelContainer, { [styles.collapsed]: collapsed })}>
        {iconName ? (
          <span className={styles.iconContainer}>
            <Icon name={iconName!} size={20} color={resolvedIconColor} aria-hidden />
          </span>
        ) : null}
        <span
          className={classNames(styles.labelContainer, {
            [styles.hidden]: collapsed,
          })}
        >
          <span className={classNames(styles.label, { [styles.selected]: selected })}>{label}</span>
          {showSubLabel && <span className={styles.subLabel}>{subLabel}</span>}
        </span>
      </span>
      {showBadge && (
        <Badge variant={selected || isHovered ? 'info' : 'neutral'} size="M">
          {badge}
        </Badge>
      )}
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </button>
  );
};
