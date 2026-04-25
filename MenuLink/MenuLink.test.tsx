import { fireEvent, render, screen } from '@testing-library/react';

import { MenuLink } from './MenuLink';

describe('MenuLink', () => {
  it('renders label', () => {
    render(<MenuLink label="Resumes" />);
    expect(screen.getByRole('button', { name: 'Resumes' })).toBeInTheDocument();
  });

  it('calls onClick', () => {
    const onClick = vi.fn();
    render(<MenuLink label="Go" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies active and selected styles', () => {
    render(<MenuLink label="Active" selected />);
    const btn = screen.getByRole('button', { name: 'Active' });
    expect(btn.className).toMatch(/selected/);
  });

  it('applies selected styles when selected', () => {
    render(<MenuLink label="Hub" selected />);
    const btn = screen.getByRole('button', { name: 'Hub' });
    expect(btn.className).toMatch(/selected/);
  });

  it('sets data-qa when provided', () => {
    render(<MenuLink label="X" data-qa="nav-item" />);
    expect(screen.getByRole('button')).toHaveAttribute('data-qa', 'nav-item');
  });

  it('does not set data-qa when omitted', () => {
    render(<MenuLink label="X" />);
    expect(screen.getByRole('button')).not.toHaveAttribute('data-qa');
  });

  it('shows badge when expanded', () => {
    render(<MenuLink label="Docs" badge="3" collapsed={false} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('hides badge when collapsed', () => {
    render(<MenuLink label="Docs" badge="3" collapsed />);
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });

  it('merges aria-current from props', () => {
    render(<MenuLink label="Page" aria-current="page" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'page');
  });

  it('shows secondary label when expanded', () => {
    render(<MenuLink label="Main" subLabel="Extra" />);
    expect(screen.getByText('Extra')).toBeInTheDocument();
  });
});
