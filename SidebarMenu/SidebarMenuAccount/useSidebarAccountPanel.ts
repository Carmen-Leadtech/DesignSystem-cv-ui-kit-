import { useCallback, useEffect, useRef, useState } from 'react';

import { useBreakPoint } from 'hooks';

import type { SidebarMenuAccountConfig, SidebarMenuItemData } from '../SidebarMenu';

import type { SidebarMenuAccountSubmenuProps } from './SidebarMenuAccountSubmenu';

const LANGUAGES_POPOVER_CLOSE_DELAY_MS = 200;

export interface UseSidebarAccountPanelParams {
  account?: SidebarMenuAccountConfig;
  onRailToggle: () => void;
  'data-qa'?: string;
}

export function useSidebarAccountPanel({
  account,
  onRailToggle,
  'data-qa': dataQa,
}: UseSidebarAccountPanelParams) {
  const { isMobile } = useBreakPoint();

  const accountSubmenuItems = account?.submenuItems ?? [];
  const accountLanguageOptions = account?.languageOptions ?? [];

  const {
    onAccountClick,
    onSubmenuItemClick,
    onPanelOpenChange: onAccountPanelOpenChange,
  } = account ?? {};

  const [accountAnchorEl, setAccountAnchorEl] = useState<HTMLElement | null>(null);
  const [accountPanelOpen, setAccountPanelOpen] = useState(false);
  const [accountNestedView, setAccountNestedView] = useState<'account' | 'languages'>('account');
  const [languagesAnchorEl, setLanguagesAnchorEl] = useState<HTMLElement | null>(null);
  const [languagesPopoverOpen, setLanguagesPopoverOpen] = useState(false);
  const languagesCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const accountAnchorRefCallback = useCallback((node: HTMLDivElement | null) => {
    setAccountAnchorEl(node);
  }, []);

  const hasLanguagePicker = accountLanguageOptions?.length > 0;
  const hasAccountSubmenu = accountSubmenuItems.length > 0;
  const showSlidingAccount = hasAccountSubmenu && isMobile;
  const showDesktopAccountPopover = hasAccountSubmenu && !isMobile;

  const clearLanguagesCloseTimer = useCallback(() => {
    if (languagesCloseTimerRef.current) {
      clearTimeout(languagesCloseTimerRef.current);
      languagesCloseTimerRef.current = null;
    }
  }, []);

  const resetAccountState = useCallback(() => {
    clearLanguagesCloseTimer();
    setAccountPanelOpen(false);
    setAccountNestedView('account');
    setLanguagesPopoverOpen(false);
  }, [clearLanguagesCloseTimer]);

  useEffect(() => {
    onAccountPanelOpenChange?.(accountPanelOpen);
    if (!accountPanelOpen) {
      setAccountNestedView('account');
      clearLanguagesCloseTimer();
      setLanguagesPopoverOpen(false);
    }
  }, [accountPanelOpen, onAccountPanelOpenChange, clearLanguagesCloseTimer]);

  useEffect(
    () => () => {
      clearLanguagesCloseTimer();
    },
    [clearLanguagesCloseTimer]
  );

  const handleToggleSidebar = useCallback(() => {
    if (!isMobile) {
      onRailToggle();
    }
    resetAccountState();
  }, [isMobile, onRailToggle, resetAccountState]);

  const handleAccountRowClick = useCallback(() => {
    if (hasAccountSubmenu) {
      if (accountNestedView === 'languages') {
        setAccountNestedView('account');
        setAccountPanelOpen(true);
      } else {
        setAccountPanelOpen(!accountPanelOpen);
      }
    }
    onAccountClick?.();
  }, [hasAccountSubmenu, accountNestedView, accountPanelOpen, onAccountClick]);

  const handleAccountPanelBack = useCallback(() => {
    if (accountNestedView === 'languages') {
      setAccountNestedView('account');
    } else {
      setAccountPanelOpen(false);
    }
  }, [accountNestedView]);

  const languagesAnchorRefCallback = useCallback((node: HTMLElement | null) => {
    setLanguagesAnchorEl(node);
  }, []);

  const openLanguagesPopover = useCallback(() => {
    clearLanguagesCloseTimer();
    setLanguagesPopoverOpen(true);
  }, [clearLanguagesCloseTimer]);

  const scheduleCloseLanguagesPopover = useCallback(() => {
    clearLanguagesCloseTimer();
    languagesCloseTimerRef.current = setTimeout(() => {
      setLanguagesPopoverOpen(false);
      languagesCloseTimerRef.current = null;
    }, LANGUAGES_POPOVER_CLOSE_DELAY_MS);
  }, [clearLanguagesCloseTimer]);

  const onLanguageRowPointerEnter = useCallback(() => {
    if (!isMobile && hasLanguagePicker) {
      openLanguagesPopover();
    }
  }, [isMobile, hasLanguagePicker, openLanguagesPopover]);

  const onLanguageRowPointerLeave = useCallback(() => {
    if (!isMobile && hasLanguagePicker) {
      scheduleCloseLanguagesPopover();
    }
  }, [isMobile, hasLanguagePicker, scheduleCloseLanguagesPopover]);

  const onLanguagePopoverPointerEnter = useCallback(() => {
    clearLanguagesCloseTimer();
    setLanguagesPopoverOpen(true);
  }, [clearLanguagesCloseTimer]);

  const onLanguagePopoverPointerLeave = useCallback(() => {
    scheduleCloseLanguagesPopover();
  }, [scheduleCloseLanguagesPopover]);

  const closeLanguagesPopover = useCallback(() => {
    clearLanguagesCloseTimer();
    setLanguagesPopoverOpen(false);
  }, [clearLanguagesCloseTimer]);

  const handleAccountSubmenuRow = useCallback(
    (item: SidebarMenuItemData) => {
      const opensLanguagePicker =
        hasLanguagePicker && item.id === 'languages' && item.suffix !== undefined;

      if (opensLanguagePicker && !isMobile) {
        return;
      }
      if (opensLanguagePicker) {
        setAccountNestedView('languages');
        return;
      }
      onSubmenuItemClick?.(item.id);
    },
    [hasLanguagePicker, isMobile, onSubmenuItemClick]
  );

  const getAccountSubmenuProps = useCallback(
    (showBody: boolean): SidebarMenuAccountSubmenuProps => ({
      titles: {
        account: account?.accountTitle,
        languages: account?.languageTitle,
      },
      menu: {
        items: accountSubmenuItems,
        onItemClick: handleAccountSubmenuRow,
        desktopLanguageTrigger:
          !isMobile && hasLanguagePicker
            ? {
                triggerRef: languagesAnchorRefCallback,
                onPointerEnter: onLanguageRowPointerEnter,
                onPointerLeave: onLanguageRowPointerLeave,
              }
            : undefined,
      },
      language:
        accountLanguageOptions?.length > 0
          ? {
              options: accountLanguageOptions ?? [],
              selectedId: account?.selectedLanguageId,
              loading: account?.isLoadingLanguage ?? false,
              onSelect: account?.onLanguageSelect,
            }
          : undefined,
      panel: {
        nestedView: accountNestedView,
        showBody,
      },
      layout: { isMobile },
      backButtonAriaLabel: account?.backButtonAriaLabel,
      onBack: handleAccountPanelBack,
      'data-qa': dataQa,
    }),
    [
      account,
      accountSubmenuItems,
      accountLanguageOptions,
      accountNestedView,
      handleAccountSubmenuRow,
      handleAccountPanelBack,
      hasLanguagePicker,
      isMobile,
      account?.backButtonAriaLabel,
      dataQa,
      languagesAnchorRefCallback,
      onLanguageRowPointerEnter,
      onLanguageRowPointerLeave,
    ]
  );

  return {
    accountAnchorEl,
    accountAnchorRefCallback,
    accountNestedView,
    accountPanelOpen,
    accountSubmenuItems,
    handleAccountPanelBack,
    handleAccountRowClick,
    handleAccountSubmenuRow,
    handleToggleSidebar,
    getAccountSubmenuProps,
    hasAccountSubmenu,
    hasLanguagePicker,
    resetAccountState,
    setAccountPanelOpen,
    showDesktopAccountPopover,
    showSlidingAccount,
    languagesAnchorEl,
    languagesPopoverOpen,
    onLanguagePopoverPointerEnter,
    onLanguagePopoverPointerLeave,
    closeLanguagesPopover,
  };
}
