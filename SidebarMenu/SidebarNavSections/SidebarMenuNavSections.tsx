import { MenuLink, Tooltip, TooltipPlacement } from 'components';
import { useBreakPoint } from 'hooks';
import type { CvElement } from 'types/CvElement';

import type { SidebarMenuItemData } from '../SidebarMenu';

import styles from './SidebarMenuNavSections.module.css';

export interface SidebarMenuNavSection {
  title?: string;
  items: SidebarMenuItemData[];
}

export interface SidebarMenuNavSectionsProps extends CvElement {
  sections: SidebarMenuNavSection[];
  isCollapsed: boolean;
}

export const SidebarMenuNavSections = ({
  'data-qa': dataQa,
  sections,
  isCollapsed,
}: SidebarMenuNavSectionsProps) => {
  const { isMobile } = useBreakPoint();

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <div key={section.title ?? `section-${sectionIndex}`} className={styles.container}>
          {section.title && (
            <div className={styles.heading}>
              <hr className={styles.divider} aria-hidden />
              {!isCollapsed && <h2 className={styles.title}>{section.title}</h2>}
            </div>
          )}
          <ul className={styles.itemList}>
            {section.items.map((item) => {
              return (
                <li key={item.id}>
                  <Tooltip
                    title={item.label}
                    placement={TooltipPlacement.RIGHT}
                    disabled={!isCollapsed || isMobile}
                    data-qa={dataQa ? `${dataQa}-tooltip-item-${item.id}` : undefined}
                  >
                    <MenuLink
                      collapsed={isCollapsed}
                      label={item.label}
                      subLabel={item.subLabel}
                      iconName={item.iconName}
                      badge={item.badge}
                      selected={item.selected}
                      data-qa={dataQa ? `${dataQa}-item-${item.id}` : undefined}
                      aria-current={item.selected ? 'page' : undefined}
                      onClick={item.onClick}
                    />
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
};
