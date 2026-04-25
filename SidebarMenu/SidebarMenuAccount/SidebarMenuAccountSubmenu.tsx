import type { ReactNode, RefCallback } from 'react';

import classNames from 'classnames';
import type { Language } from 'types/Language';

import { CircularProgress } from 'components/CircularProgress/CircularProgress';
import { Icon } from 'components/Icon/Icon';
import { MenuOption } from 'components/MenuOption/MenuOption';

import type { SidebarMenuItemData } from '../SidebarMenu';

import styles from './SidebarMenuAccountSubmenu.module.css';

/** Account row, submenu, language picker, and related callbacks. */
export interface SidebarMenuAccountConfig {
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

export interface SidebarMenuAccountSubmenuTitles {
  account?: string;
  languages?: string;
}

export interface SidebarMenuAccountSubmenuDesktopLanguageTrigger {
  triggerRef: RefCallback<HTMLLIElement | null>;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

export interface SidebarMenuAccountSubmenuMenu {
  items: SidebarMenuItemData[];
  onItemClick: (item: SidebarMenuItemData) => void;
  /** Desktop: hover target for the separate languages popover (anchored to this row). */
  desktopLanguageTrigger?: SidebarMenuAccountSubmenuDesktopLanguageTrigger;
}

export interface SidebarMenuAccountSubmenuLanguage {
  options: Language[];
  selectedId?: string;
  loading: boolean;
  onSelect?: (code: string) => void;
}

export interface SidebarMenuAccountSubmenuPanel {
  nestedView: 'account' | 'languages';
  showBody: boolean;
}

export interface SidebarMenuAccountSubmenuProps {
  titles: SidebarMenuAccountSubmenuTitles;
  menu: SidebarMenuAccountSubmenuMenu;
  language?: SidebarMenuAccountSubmenuLanguage;
  panel: SidebarMenuAccountSubmenuPanel;
  layout: { isMobile: boolean };
  backButtonAriaLabel?: string;
  onBack: () => void;
  'data-qa'?: string;
}

const isLanguagesMenuRow = (item: SidebarMenuItemData) =>
  Boolean(item.id === 'languages' && item.suffix !== undefined);

const AccountItemsList = ({
  items,
  onItemClick,
  dataQa,
  desktopLanguageTrigger,
}: {
  items: SidebarMenuItemData[];
  onItemClick: (item: SidebarMenuItemData) => void;
  dataQa?: string;
  desktopLanguageTrigger?: SidebarMenuAccountSubmenuDesktopLanguageTrigger;
}) => (
  <ul className={styles.itemList}>
    {items.map((item) => {
      const attachLangHover = Boolean(desktopLanguageTrigger && isLanguagesMenuRow(item));
      return (
        <li
          key={item.id}
          ref={attachLangHover ? desktopLanguageTrigger?.triggerRef : undefined}
          onPointerEnter={attachLangHover ? desktopLanguageTrigger?.onPointerEnter : undefined}
          onPointerLeave={attachLangHover ? desktopLanguageTrigger?.onPointerLeave : undefined}
        >
          <MenuOption
            prefix={<Icon name={item.iconName} size={20} />}
            label={item.label}
            subLabel={item.subLabel}
            suffix={item.suffix}
            data-qa={dataQa ? `${dataQa}-account-item-${item.id}` : undefined}
            onClick={(e) => {
              item.onClick?.(e);
              onItemClick(item);
            }}
          />
        </li>
      );
    })}
  </ul>
);

export const LanguageOptionsList = ({
  options,
  selectedLanguageId,
  isLoadingLanguage,
  onSelect,
  dataQa,
}: {
  options: Language[];
  selectedLanguageId?: string;
  isLoadingLanguage: boolean;
  onSelect?: (code: string) => void;
  dataQa?: string;
}) => {
  if (isLoadingLanguage) {
    return (
      <div className={styles.languageOptionsLoading} aria-busy={true}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <ul className={styles.itemList} aria-busy={false}>
      {options.map((opt) => {
        const selected = selectedLanguageId === opt.code;
        return (
          <li key={opt.code}>
            <MenuOption
              label={opt.description}
              selected={selected}
              data-qa={dataQa ? `${dataQa}-language-${opt.code}` : undefined}
              onClick={() => onSelect?.(opt.code)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export const SidebarMenuAccountSubmenu = ({
  titles,
  menu,
  language,
  panel,
  layout,
  backButtonAriaLabel,
  onBack,
  'data-qa': dataQa,
}: SidebarMenuAccountSubmenuProps) => {
  const { nestedView, showBody } = panel;
  const { isMobile } = layout;
  const hasLanguagePicker = (language?.options?.length ?? 0) > 0;

  const renderHeader = ({ type }: { type: 'account' | 'languages' }) => {
    const title = type === 'account' ? (titles.account ?? '') : (titles.languages ?? '');
    const backDataQa = dataQa ? `${dataQa}-${type}-back` : undefined;

    return (
      <div className={styles.submenuHeader}>
        <div className={styles.submenuHeaderRow}>
          <div className={styles.headerBackSlot}>
            <button
              type="button"
              className={styles.submenuIconButton}
              aria-label={backButtonAriaLabel}
              data-qa={backDataQa}
              onClick={onBack}
            >
              <Icon name="arrow_back" size={24} aria-hidden />
            </button>
          </div>
          <h2 className={styles.submenuTitle}>{title}</h2>
          <div className={styles.headerSpacer} aria-hidden />
        </div>
        <hr className={styles.sectionDivider} aria-hidden />
      </div>
    );
  };

  if (hasLanguagePicker && language) {
    if (isMobile) {
      return (
        <div className={styles.accountInnerViewport}>
          <div
            className={classNames(styles.accountInnerTrack, {
              [styles.accountInnerTrackShifted]: nestedView === 'languages',
            })}
          >
            <div
              className={styles.accountSubPanel}
              role="group"
              aria-label={titles.account}
              aria-hidden={nestedView === 'languages' ? true : undefined}
            >
              {renderHeader({ type: 'account' })}
              <div className={styles.submenuScroll}>
                {showBody ? (
                  <AccountItemsList
                    items={menu.items}
                    onItemClick={menu.onItemClick}
                    dataQa={dataQa}
                  />
                ) : null}
              </div>
            </div>
            <div
              className={styles.accountSubPanel}
              role="group"
              aria-label={titles.languages}
              aria-hidden={nestedView !== 'languages' ? true : undefined}
            >
              {renderHeader({ type: 'languages' })}
              <div className={styles.submenuScroll}>
                {showBody && nestedView === 'languages' ? (
                  <LanguageOptionsList
                    options={language.options}
                    selectedLanguageId={language.selectedId}
                    isLoadingLanguage={language.loading}
                    onSelect={language.onSelect}
                    dataQa={dataQa}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.accountInnerViewport}>
        <div className={styles.submenuScroll}>
          {showBody ? (
            <AccountItemsList
              items={menu.items}
              onItemClick={menu.onItemClick}
              dataQa={dataQa}
              desktopLanguageTrigger={menu.desktopLanguageTrigger}
            />
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <>
      {renderHeader({ type: 'account' })}
      <div className={styles.submenuScroll}>
        {showBody ? (
          <AccountItemsList items={menu.items} onItemClick={menu.onItemClick} dataQa={dataQa} />
        ) : null}
      </div>
    </>
  );
};
