import { MouseEventHandler, useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import classNames from 'classnames';
import { useBreakPoint, useSidebarMenuOpenState } from 'hooks';
import type { CvElement } from 'types/CvElement';
import type { Language } from 'types/Language';

import { Icon } from 'components/Icon/Icon';
import { Popover, PopoverPlacement } from 'components/Popover/Popover';
import { Tooltip, TooltipPlacement } from 'components/Tooltip/Tooltip';

import styles from './SidebarMenu.module.css';
import {
  LanguageOptionsList,
  SidebarMenuAccountSubmenu,
} from './SidebarMenuAccount/SidebarMenuAccountSubmenu';
import { useSidebarAccountPanel } from './SidebarMenuAccount/useSidebarAccountPanel';
import { SidebarMenuFooter } from './SidebarMenuFooter/SidebarMenuFooter';
import { SidebarMenuLayout } from './SidebarMenuLayout';
import { SidebarMenuNavSections } from './SidebarNavSections/SidebarMenuNavSections';
import type { SidebarMenuNavSection } from './SidebarNavSections/SidebarMenuNavSections';

const defaultIconColor = 'var(--color-icons-default)';

export interface SidebarMenuItemData {
  id: string;
  label: string;
  iconName: string;
  badge?: string;
  selected?: boolean;
  subLabel?: string;
  suffix?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/** Account row, submenu, language picker, and related callbacks. */
export interface SidebarMenuAccountConfig {
  backButtonAriaLabel: string;
  userEmail?: string;
  userAvatar?: ReactNode;
  accountTitle?: string;
  submenuItems?: SidebarMenuItemData[];
  languageTitle?: string;
  languageOptions?: Language[];
  selectedLanguageId?: string;
  isLoadingLanguage?: boolean;
  onAccountClick?: () => void;
  onSubmenuItemClick?: (id: string) => void;
  onLanguageSelect?: (id: string) => void;
  onPanelOpenChange?: (open: boolean) => void;
}

export interface SidebarMenuProps extends CvElement {
  logo?: ReactNode;
  openButtonLabel: string;
  closeButtonLabel: string;
  sections?: SidebarMenuNavSection[];
  account?: SidebarMenuAccountConfig;
  upgradeLabel?: string;
  onUpgradeClick?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export const SidebarMenu = ({
  'data-qa': dataQa,
  id,
  className = '',
  openButtonLabel,
  closeButtonLabel,
  sections = [],
  logo,
  account,
  upgradeLabel,
  onUpgradeClick,
  isOpen,
  onOpenChange,
  defaultOpen,
}: SidebarMenuProps) => {
  const { userEmail = '', userAvatar, accountTitle } = account ?? {};

  const { isMobile } = useBreakPoint();

  const { asideRef, open, setOpen } = useSidebarMenuOpenState({
    isOpen,
    onOpenChange,
    defaultOpen,
  });

  const isCollapsed = !isMobile && !open;

  const onRailToggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const {
    accountAnchorEl,
    accountAnchorRefCallback,
    accountPanelOpen,
    closeLanguagesPopover,
    getAccountSubmenuProps,
    handleAccountRowClick,
    handleToggleSidebar,
    hasLanguagePicker,
    languagesAnchorEl,
    languagesPopoverOpen,
    onLanguagePopoverPointerEnter,
    onLanguagePopoverPointerLeave,
    setAccountPanelOpen,
    showDesktopAccountPopover,
    showSlidingAccount,
  } = useSidebarAccountPanel({
    account,
    onRailToggle,
    'data-qa': dataQa,
  });

  const [languagesPopoverSurfaceEl, setLanguagesPopoverSurfaceEl] = useState<HTMLElement | null>(
    null
  );

  const accountPopoverOutsideExclusions = useMemo(
    () => (languagesPopoverSurfaceEl ? [languagesPopoverSurfaceEl] : []),
    [languagesPopoverSurfaceEl]
  );

  const handleMobileOverlayClick = () => {
    setOpen(false);
  };

  return (
    <>
      <aside
        ref={asideRef}
        id={id}
        className={classNames(
          styles.rail,
          {
            [styles.railExpanded]: !isMobile && open,
            [styles.railCollapsed]: !isMobile && !open,
            [styles.mobileDrawer]: isMobile,
            [styles.mobileDrawerHidden]: isMobile && !open,
          },
          className
        )}
        data-qa={dataQa}
        aria-label={openButtonLabel}
        aria-hidden={isMobile && !open ? true : undefined}
      >
        <SidebarMenuLayout
          data-qa={dataQa}
          showSlidingAccount={showSlidingAccount}
          accountPanelOpen={accountPanelOpen}
          accountTitle={accountTitle}
          header={
            !isMobile ? (
              <div
                data-qa={`${dataQa}-header-panel`}
                className={classNames(styles.header, {
                  [styles.headerCollapsed]: isCollapsed,
                })}
              >
                {!isCollapsed && <div className={styles.logoSlot}>{logo}</div>}
                <Tooltip
                  title={isCollapsed ? openButtonLabel : closeButtonLabel}
                  placement={TooltipPlacement.RIGHT}
                  disabled={isMobile}
                  data-qa={`${dataQa}-tooltip-toggle`}
                >
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={isCollapsed ? openButtonLabel : closeButtonLabel}
                    data-qa={`${dataQa}-toggle-sidebar`}
                    onClick={handleToggleSidebar}
                  >
                    <Icon name="side_menu" size={20} color={defaultIconColor} aria-hidden />
                  </button>
                </Tooltip>
              </div>
            ) : null
          }
          navigation={
            <SidebarMenuNavSections
              sections={sections}
              isCollapsed={isCollapsed}
              data-qa={`${dataQa}-navigation-sections`}
            />
          }
          footer={
            <SidebarMenuFooter
              accountPanelOpen={accountPanelOpen}
              isRailExpanded={!isCollapsed}
              userEmail={userEmail}
              userAvatar={userAvatar}
              accountTitle={accountTitle}
              upgradeLabel={upgradeLabel}
              showDesktopAccountPopover={showDesktopAccountPopover}
              accountAnchorRefCallback={accountAnchorRefCallback}
              onAccountRowClick={handleAccountRowClick}
              onUpgradeClick={onUpgradeClick}
              data-qa={`${dataQa}-footer-sections`}
            />
          }
          accountSlidePanel={
            showSlidingAccount ? (
              <SidebarMenuAccountSubmenu {...getAccountSubmenuProps(accountPanelOpen)} />
            ) : undefined
          }
        />
      </aside>
      {isMobile && (
        <div
          className={classNames(styles.drawerOverlay, {
            [styles.drawerOverlayVisible]: open,
          })}
          onClick={handleMobileOverlayClick}
        />
      )}
      {showDesktopAccountPopover ? (
        <Popover
          anchorEl={accountAnchorEl}
          open={accountPanelOpen}
          placement={PopoverPlacement.TOP_RIGHT}
          className={styles.popoverSurface}
          data-qa={`${dataQa}-account-popover`}
          outsideInteractionContainers={accountPopoverOutsideExclusions}
          onClose={() => {
            setAccountPanelOpen(false);
          }}
        >
          <div className={styles.popoverInner}>
            <SidebarMenuAccountSubmenu {...getAccountSubmenuProps(true)} />
          </div>
        </Popover>
      ) : null}
      {showDesktopAccountPopover && hasLanguagePicker ? (
        <Popover
          anchorEl={languagesAnchorEl}
          open={languagesPopoverOpen}
          placement={PopoverPlacement.RIGHT_CENTER}
          className={classNames(styles.popoverSurface, styles.languagesPopoverSurface)}
          data-qa={`${dataQa}-languages-popover`}
          onClose={closeLanguagesPopover}
        >
          <div
            ref={setLanguagesPopoverSurfaceEl}
            className={styles.languagesPopoverInner}
            onPointerEnter={onLanguagePopoverPointerEnter}
            onPointerLeave={onLanguagePopoverPointerLeave}
          >
            <LanguageOptionsList
              options={account?.languageOptions ?? []}
              selectedLanguageId={account?.selectedLanguageId}
              isLoadingLanguage={account?.isLoadingLanguage ?? false}
              onSelect={(code) => {
                account?.onLanguageSelect?.(code);
              }}
              data-qa={dataQa}
            />
          </div>
        </Popover>
      ) : null}
    </>
  );
};
