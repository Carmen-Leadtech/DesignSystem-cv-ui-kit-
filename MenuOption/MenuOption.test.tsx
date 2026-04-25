import { Icon } from 'components';

import { fireEvent, render, screen } from '@testing-library/react';

import { MenuOption } from './MenuOption';

describe('MenuOption Component', () => {
  it('calls onClick', () => {
    const onClick = vi.fn();
    render(<MenuOption label="Account" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Account' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders footer row with prefix and suffix', () => {
    render(
      <MenuOption
        label="user@test.com"
        data-qa="footer-acc"
        prefix="J"
        suffix={<Icon name="chevron_right" />}
      />
    );
    expect(screen.getByRole('button', { name: /user@test\.com/ })).toBeInTheDocument();
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('collapsed footer uses aria-label only without duplicating visible label', () => {
    render(<MenuOption prefix="J" label="ignored-for-a11y" collapsed aria-label="Account menu" />);
    expect(screen.getByRole('button', { name: 'Account menu' })).toBeInTheDocument();
    expect(screen.queryByText('ignored-for-a11y')).not.toBeInTheDocument();
  });
});
