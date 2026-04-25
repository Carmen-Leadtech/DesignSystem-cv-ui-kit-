import type { ReactNode } from 'react';

import classNames from 'classnames';
import { useBreakPoint } from 'hooks';
import type { CvElement } from 'types/CvElement';

import styles from './SidebarMenu.module.css';

export interface SidebarMenuLayoutProps extends CvElement {
  showSlidingAccount: boolean;
  accountPanelOpen: boolean;
  accountTitle?: string;
  header: ReactNode;
  navigation: ReactNode;
  footer: ReactNode;
  accountSlidePanel?: ReactNode;
}

export const SidebarMenuLayout = ({
  'data-qa': dataQa,
  showSlidingAccount,
  accountPanelOpen,
  accountTitle,
  header,
  navigation,
  footer,
  accountSlidePanel,
}: SidebarMenuLayoutProps) => {
  const { isMobile } = useBreakPoint();

  const layoutBody = (
    <div className={styles.layout}>
      <div
        className={classNames(styles.panelsTrack, {
          [styles.panelsTrackDoubleWidth]: showSlidingAccount,
          [styles.panelsTrackShifted]: showSlidingAccount && accountPanelOpen,
        })}
      >
        <div
          className={classNames(styles.mainColumn, {
            [styles.mainColumnSplit]: showSlidingAccount,
          })}
          aria-hidden={showSlidingAccount && accountPanelOpen ? true : undefined}
        >
          <div
            className={classNames(styles.scrollArea, {
              [styles.scrollAreaMobile]: isMobile,
            })}
          >
            {header}
            <nav className={styles.sections} data-qa={`${dataQa}-navigation-panel`}>
              {navigation}
            </nav>
          </div>

          <div
            data-qa={`${dataQa}-footer-panel`}
            className={classNames(styles.footerSticky, {
              [styles.footerStickyMobile]: isMobile,
            })}
          >
            {footer}
          </div>
        </div>

        {showSlidingAccount && accountSlidePanel ? (
          <div
            className={styles.accountPanelSlide}
            data-qa={`${dataQa}-account-panel`}
            role="region"
            aria-roledescription="submenu"
            aria-label={accountTitle ?? ''}
            aria-hidden={!accountPanelOpen}
          >
            {accountSlidePanel}
          </div>
        ) : null}
      </div>
    </div>
  );

  if (!isMobile) {
    return (
      <div className={styles.railClip}>
        <div className={styles.railInner}>{layoutBody}</div>
      </div>
    );
  }

  return layoutBody;
};
