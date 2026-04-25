import { ReactNode } from 'react';

import { useBreakPoint } from 'hooks/useBreakPoint/useBreakPoint';
import type { CvElement } from 'types/CvElement';

import { Button } from 'components/Button/Button';
import { Icon } from 'components/Icon/Icon';
import { MenuOption } from 'components/MenuOption/MenuOption';
import { Tooltip, TooltipPlacement } from 'components/Tooltip/Tooltip';

import styles from './SidebarMenuFooter.module.css';

export interface SidebarMenuFooterProps extends CvElement {
  accountPanelOpen: boolean;
  isRailExpanded: boolean;
  userEmail: string;
  userAvatar?: ReactNode;
  accountTitle?: string;
  upgradeLabel?: string;
  showDesktopAccountPopover: boolean;
  accountAnchorRefCallback: (node: HTMLDivElement | null) => void;
  onAccountRowClick: () => void;
  onUpgradeClick?: () => void;
}

export const SidebarMenuFooter = ({
  'data-qa': dataQa,
  accountPanelOpen,
  isRailExpanded,
  userEmail,
  userAvatar,
  accountTitle,
  upgradeLabel,
  showDesktopAccountPopover,
  accountAnchorRefCallback,
  onAccountRowClick,
  onUpgradeClick,
}: SidebarMenuFooterProps) => {
  const { isMobile } = useBreakPoint();

  const getAccountIcon = () => {
    if (isMobile) {
      return 'chevron_right';
    }
    if (accountPanelOpen) {
      return 'expand_less';
    }
    return 'expand_more';
  };

  const accountItem = (
    <MenuOption
      data-qa={`${dataQa}-account`}
      aria-label={!isRailExpanded ? userEmail || 'Account' : undefined}
      prefix={<span className={styles.avatar}>{userAvatar}</span>}
      suffix={<Icon name={getAccountIcon()} />}
      label={userEmail}
      collapsed={!isRailExpanded}
      onClick={onAccountRowClick}
      selected={accountPanelOpen}
    />
  );

  const accountWithTooltip = accountTitle ? (
    <Tooltip
      title={accountTitle}
      placement={TooltipPlacement.RIGHT}
      disabled={isRailExpanded || isMobile}
      data-qa={`${dataQa}-tooltip-account`}
    >
      {accountItem}
    </Tooltip>
  ) : (
    accountItem
  );

  return (
    <>
      {showDesktopAccountPopover ? (
        <div ref={accountAnchorRefCallback} className={styles.popoverAnchor}>
          {accountWithTooltip}
        </div>
      ) : (
        accountWithTooltip
      )}

      {upgradeLabel && (
        <div className={styles.upgradeContainer}>
          {!isRailExpanded ? (
            <Tooltip
              title={upgradeLabel}
              placement={TooltipPlacement.RIGHT}
              disabled={isMobile}
              data-qa={`${dataQa}-tooltip-upgrade`}
            >
              <Button
                variant="secondary"
                shape="rounded"
                className={styles.upgradeButtonCollapsed}
                data-qa={`${dataQa}-upgrade`}
                aria-label={upgradeLabel}
                onClick={onUpgradeClick}
              >
                <Icon name="crown" size={24} color="var(--color-icons-interactivity-default)" />
              </Button>
            </Tooltip>
          ) : (
            <Button
              variant="secondary"
              shape="rounded"
              isFullWidth
              data-qa={`${dataQa}-upgrade`}
              onClick={onUpgradeClick}
            >
              <span className={styles.upgradeInner}>
                <Icon name="crown" size={24} color="var(--color-icons-interactivity-default)" />
                {upgradeLabel}
              </span>
            </Button>
          )}
        </div>
      )}
    </>
  );
};
