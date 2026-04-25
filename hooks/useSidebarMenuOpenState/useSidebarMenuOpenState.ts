import { useCallback, useRef, useState } from 'react';

import { useBreakPoint } from '../useBreakPoint/useBreakPoint';
import { useClickOutside } from '../useClickOutside/useClickOutside';

export interface UseSidebarMenuOpenStateProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Used when `isOpen` is omitted (uncontrolled). Defaults to `true`. */
  defaultOpen?: boolean;
}

export function useSidebarMenuOpenState({
  isOpen,
  onOpenChange,
  defaultOpen = true,
}: UseSidebarMenuOpenStateProps) {
  const { isMobile } = useBreakPoint();
  const asideRef = useRef<HTMLElement | null>(null);
  const isControlled = isOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const open = isControlled ? isOpen : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const handleMobileOutsideClick = useCallback(() => {
    if (isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open, setOpen]);

  useClickOutside([asideRef], handleMobileOutsideClick);

  return { asideRef, open, setOpen };
}
