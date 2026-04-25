import type { Language } from 'types/Language';

import { fireEvent, render, screen } from '@testing-library/react';

import { Icon } from 'components/Icon/Icon';

import { SidebarMenu } from './SidebarMenu';

const { mockUseBreakPoint } = vi.hoisted(() => ({
  mockUseBreakPoint: vi.fn(),
}));

vi.mock('hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('hooks')>();
  return {
    ...actual,
    useBreakPoint: mockUseBreakPoint,
  };
});

vi.mock('hooks/useBreakPoint/useBreakPoint', () => ({
  useBreakPoint: mockUseBreakPoint,
}));

const desktopBreakpoint = {
  breakpoints: { sm: 768, md: 1024, lg: 1440 },
  device: 'desktop' as const,
  isDesktop: true,
  isMobile: false,
  isTablet: false,
  isWide: true,
  width: 1200,
};

const mobileBreakpoint = {
  breakpoints: { sm: 768, md: 1024, lg: 1440 },
  device: 'mobile' as const,
  isDesktop: false,
  isMobile: true,
  isTablet: false,
  isWide: false,
  width: 400,
};

const sections = [
  {
    title: 'Documents',
    items: [{ id: 'resumes', label: 'Resumes', iconName: 'resume_doc', badge: '2' }],
  },
];

const accountItems = [
  { id: 'settings', label: 'Settings', iconName: 'gear' },
  {
    id: 'languages',
    label: 'English (US)',
    iconName: 'translate',
    suffix: <Icon name="chevron_right" />,
  },
  { id: 'logout', label: 'Sign Out', iconName: 'close' },
];

beforeEach(() => {
  mockUseBreakPoint.mockReturnValue(desktopBreakpoint);
});

describe('SidebarMenu', () => {
  test('renders section title and items', () => {
    render(
      <SidebarMenu
        data-qa="sb"
        sections={sections}
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
      />
    );
    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('Resumes')).toBeInTheDocument();
  });

  test('applies custom labels for aside aria-label', () => {
    const { container } = render(
      <SidebarMenu
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
        sections={sections}
      />
    );
    expect(container.querySelector('aside')).toHaveAttribute('aria-label', 'Open sidebar');
  });

  test('calls item onClick when a row is activated', () => {
    const onItemClick = vi.fn();
    const sectionsWithHandler = [
      {
        ...sections[0],
        items: sections[0].items.map((item) => ({
          ...item,
          onClick: () => {
            onItemClick(item.id);
          },
        })),
      },
    ];
    render(
      <SidebarMenu
        sections={sectionsWithHandler}
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
      />
    );
    fireEvent.click(screen.getByText('Resumes'));
    expect(onItemClick).toHaveBeenCalledWith('resumes');
  });

  test('applies collapsed layout class on desktop when isOpen is false', () => {
    const { container } = render(
      <SidebarMenu
        isOpen={false}
        sections={sections}
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
      />
    );
    const aside = container.querySelector('aside');
    expect(aside?.className).toMatch(/railCollapsed/);
  });

  test('desktop controlled isOpen true starts expanded', () => {
    const { container } = render(
      <SidebarMenu
        isOpen
        sections={sections}
        onOpenChange={vi.fn()}
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
      />
    );
    expect(container.querySelector('aside')?.className).toMatch(/railExpanded/);
  });

  test('expanded desktop does not show language on main sticky; shows under Account', () => {
    render(
      <SidebarMenu
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
        sections={sections}
        account={{
          userEmail: 'user@test.com',
          submenuItems: accountItems,
          backButtonAriaLabel: 'Go back',
        }}
      />
    );
    expect(screen.queryByText('English (US)')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /user@test.com/i }));
    expect(screen.getByText('English (US)')).toBeInTheDocument();
  });

  test('desktop account popover outside click clears account row selected state', () => {
    render(
      <SidebarMenu
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
        sections={sections}
        account={{
          userEmail: 'user@test.com',
          submenuItems: accountItems,
          backButtonAriaLabel: 'Go back',
        }}
      />
    );
    const accountButton = screen.getByRole('button', { name: /user@test.com/i });
    fireEvent.click(accountButton);
    expect(screen.getByText('English (US)')).toBeInTheDocument();
    expect(accountButton.className).toMatch(/selected/);

    fireEvent.mouseDown(document.body);

    expect(screen.queryByText('English (US)')).not.toBeInTheDocument();
    expect(accountButton.className).not.toMatch(/selected/);
  });

  test('collapsed desktop has no first-level language control', () => {
    render(
      <SidebarMenu
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
        isOpen={false}
        sections={sections}
        account={{
          userEmail: 'user@test.com',
          submenuItems: accountItems,
          backButtonAriaLabel: 'Go back',
        }}
      />
    );
    expect(screen.queryByText('English (US)')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /English/i })).not.toBeInTheDocument();
  });

  test('has complementary landmark', () => {
    mockUseBreakPoint.mockReturnValue(mobileBreakpoint);
    render(
      <SidebarMenu
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
        sections={sections}
      />
    );
    expect(screen.getByRole('complementary', { name: 'Open sidebar' })).toBeInTheDocument();
  });

  test('mobile notifies when pointer down occurs outside the aside', () => {
    mockUseBreakPoint.mockReturnValue(mobileBreakpoint);
    const onOpenChange = vi.fn();
    const { container } = render(
      <SidebarMenu
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
        sections={sections}
        isOpen
        onOpenChange={onOpenChange}
      />
    );
    const aside = container.querySelector('aside');
    expect(aside?.className).not.toMatch(/mobileDrawerHidden/);
    fireEvent.mouseDown(document.body);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('mobile uncontrolled drawer closes on pointer down outside the aside', () => {
    mockUseBreakPoint.mockReturnValue(mobileBreakpoint);
    const { container } = render(
      <SidebarMenu
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
        sections={sections}
        defaultOpen
      />
    );
    const aside = container.querySelector('aside');
    expect(aside?.className).not.toMatch(/mobileDrawerHidden/);
    fireEvent.mouseDown(document.body);
    expect(aside?.className).toMatch(/mobileDrawerHidden/);
  });

  test('collapse control toggles rail width on desktop', () => {
    const { container } = render(
      <SidebarMenu
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
        sections={sections}
      />
    );
    const aside = container.querySelector('aside');
    expect(aside?.className).toMatch(/railExpanded/);
    fireEvent.click(screen.getByRole('button', { name: /Close sidebar/i }));
    expect(aside?.className).toMatch(/railCollapsed/);
    fireEvent.click(screen.getByRole('button', { name: /Open sidebar/i }));
    expect(aside?.className).toMatch(/railExpanded/);
  });

  test('account row opens submenu and back returns to main', () => {
    mockUseBreakPoint.mockReturnValue(mobileBreakpoint);
    render(
      <SidebarMenu
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
        sections={sections}
        account={{
          userEmail: 'a@b.com',
          accountTitle: 'Account',
          submenuItems: accountItems,
          backButtonAriaLabel: 'Go back',
        }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /a@b.com/i }));
    expect(screen.getByRole('heading', { name: 'Account' })).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('English (US)')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Go back' }));
    expect(screen.queryByRole('heading', { name: 'Account' })).not.toBeInTheDocument();
    expect(screen.getByText('Documents')).toBeInTheDocument();
  });

  test('language row opens third-level list and back returns to Account', () => {
    mockUseBreakPoint.mockReturnValue(mobileBreakpoint);
    const onLanguageSelect = vi.fn();
    const languageOptions: Language[] = [
      {
        code: 'en-US',
        description: 'English (United States)',
        isProfileLanguage: true,
        flagIcon: 'us',
      },
      {
        code: 'es-ES',
        description: 'Español',
        isProfileLanguage: false,
        flagIcon: 'es',
      },
    ];
    render(
      <SidebarMenu
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
        sections={sections}
        account={{
          userEmail: 'a@b.com',
          accountTitle: 'Account',
          submenuItems: accountItems,
          languageTitle: 'Languages',
          languageOptions,
          selectedLanguageId: 'en-US',
          onLanguageSelect,
          backButtonAriaLabel: 'Go back',
        }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /a@b.com/i }));
    fireEvent.click(screen.getByRole('button', { name: /English \(US\)/ }));
    expect(screen.getByRole('heading', { name: 'Languages' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Español/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Español/ }));
    expect(onLanguageSelect).toHaveBeenCalledWith('es-ES');
    fireEvent.click(screen.getByRole('button', { name: 'Go back' }));
    expect(screen.getByRole('heading', { name: 'Account' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Languages' })).not.toBeInTheDocument();
  });
});
