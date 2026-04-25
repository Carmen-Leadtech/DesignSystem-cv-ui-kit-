import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from 'components/Button/Button';

import { Tooltip } from './Tooltip';

vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>();
  return {
    ...actual,
    createPortal: (children: React.ReactNode) => children,
  };
});

const mockGetBoundingClientRect = vi.fn(
  (): DOMRect => ({
    top: 100,
    left: 100,
    bottom: 150,
    right: 200,
    width: 100,
    height: 50,
    x: 100,
    y: 100,
    toJSON: () => ({}),
  })
);

beforeAll(() => {
  HTMLElement.prototype.getBoundingClientRect = mockGetBoundingClientRect;
  Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
  Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
});

describe('Tooltip', () => {
  test('renders child', () => {
    render(
      <Tooltip title="Hint">
        <Button>Action</Button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  test('does not render tooltip surface when disabled', () => {
    render(
      <Tooltip title="Hidden" disabled>
        <Button>Action</Button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Action' }));
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  test('shows title on hover', () => {
    render(
      <Tooltip title="Save draft">
        <Button>Action</Button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Action' }));
    expect(screen.getByText('Save draft')).toBeInTheDocument();
  });

  test('hides title on mouse leave', () => {
    render(
      <Tooltip title="Save draft">
        <Button>Action</Button>
      </Tooltip>
    );
    const btn = screen.getByRole('button', { name: 'Action' });
    fireEvent.mouseEnter(btn);
    expect(screen.getByText('Save draft')).toBeInTheDocument();
    fireEvent.mouseLeave(btn);
    expect(screen.queryByText('Save draft')).not.toBeInTheDocument();
  });

  test('shows title on focus and hides on blur', () => {
    render(
      <Tooltip title="Focused">
        <Button>Hit</Button>
      </Tooltip>
    );
    const btn = screen.getByRole('button', { name: 'Hit' });
    fireEvent.focus(btn);
    expect(screen.getByText('Focused')).toBeInTheDocument();
    fireEvent.blur(btn);
    expect(screen.queryByText('Focused')).not.toBeInTheDocument();
  });

  test('closes on Escape when open', () => {
    render(
      <Tooltip title="Closable">
        <Button>Tab</Button>
      </Tooltip>
    );
    fireEvent.focus(screen.getByRole('button', { name: 'Tab' }));
    expect(screen.getByText('Closable')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Closable')).not.toBeInTheDocument();
  });

  test('sets data-qa on surface when provided', () => {
    render(
      <Tooltip title="X" data-qa="tip-1">
        <Button>B</Button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByRole('button', { name: 'B' }));
    expect(document.querySelector('[data-qa="tip-1"]')).toBeInTheDocument();
  });
});
