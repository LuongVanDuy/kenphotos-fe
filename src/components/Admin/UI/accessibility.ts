/**
 * Accessibility utilities and helpers for the admin interface
 */

// ARIA roles and properties
export const ariaRoles = {
  button: 'button',
  link: 'link',
  navigation: 'navigation',
  main: 'main',
  banner: 'banner',
  contentinfo: 'contentinfo',
  complementary: 'complementary',
  search: 'search',
  form: 'form',
  dialog: 'dialog',
  alertdialog: 'alertdialog',
  alert: 'alert',
  status: 'status',
  progressbar: 'progressbar',
  tab: 'tab',
  tabpanel: 'tabpanel',
  tablist: 'tablist',
  menu: 'menu',
  menuitem: 'menuitem',
  menubar: 'menubar',
  grid: 'grid',
  gridcell: 'gridcell',
  row: 'row',
  columnheader: 'columnheader',
  rowheader: 'rowheader',
} as const;

// Common ARIA attributes
export const ariaAttributes = {
  label: 'aria-label',
  labelledby: 'aria-labelledby',
  describedby: 'aria-describedby',
  expanded: 'aria-expanded',
  hidden: 'aria-hidden',
  current: 'aria-current',
  selected: 'aria-selected',
  checked: 'aria-checked',
  disabled: 'aria-disabled',
  required: 'aria-required',
  invalid: 'aria-invalid',
  live: 'aria-live',
  atomic: 'aria-atomic',
  busy: 'aria-busy',
  controls: 'aria-controls',
  owns: 'aria-owns',
  activedescendant: 'aria-activedescendant',
  level: 'aria-level',
  setsize: 'aria-setsize',
  posinset: 'aria-posinset',
} as const;

// Keyboard navigation constants
export const keyboardKeys = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

// Focus management utilities
export const focusUtils = {
  /**
   * Get all focusable elements within a container
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors));
  },

  /**
   * Trap focus within a container (useful for modals)
   */
  trapFocus: (container: HTMLElement, event: KeyboardEvent) => {
    const focusableElements = focusUtils.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === keyboardKeys.TAB) {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }
  },

  /**
   * Move focus to the next/previous focusable element
   */
  moveFocus: (direction: 'next' | 'previous', container?: HTMLElement) => {
    const containerElement = container || document.body;
    const focusableElements = focusUtils.getFocusableElements(containerElement);
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

    if (currentIndex === -1) return;

    const nextIndex = direction === 'next' 
      ? (currentIndex + 1) % focusableElements.length
      : (currentIndex - 1 + focusableElements.length) % focusableElements.length;

    focusableElements[nextIndex]?.focus();
  },

  /**
   * Set focus to the first focusable element in a container
   */
  focusFirst: (container: HTMLElement) => {
    const focusableElements = focusUtils.getFocusableElements(container);
    focusableElements[0]?.focus();
  },

  /**
   * Restore focus to a previously focused element
   */
  restoreFocus: (element: HTMLElement | null) => {
    if (element && document.contains(element)) {
      element.focus();
    }
  },
};

// Screen reader utilities
export const screenReaderUtils = {
  /**
   * Announce a message to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;

    document.body.appendChild(announcer);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  /**
   * Create a visually hidden element for screen readers
   */
  createScreenReaderOnly: (text: string): HTMLElement => {
    const element = document.createElement('span');
    element.className = 'sr-only';
    element.textContent = text;
    return element;
  },
};

// Color contrast utilities
export const contrastUtils = {
  /**
   * Calculate relative luminance of a color
   */
  getLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio: (color1: [number, number, number], color2: [number, number, number]): number => {
    const lum1 = contrastUtils.getLuminance(...color1);
    const lum2 = contrastUtils.getLuminance(...color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  /**
   * Check if contrast ratio meets WCAG standards
   */
  meetsWCAG: (ratio: number, level: 'AA' | 'AAA' = 'AA', size: 'normal' | 'large' = 'normal'): boolean => {
    if (level === 'AAA') {
      return size === 'large' ? ratio >= 4.5 : ratio >= 7;
    }
    return size === 'large' ? ratio >= 3 : ratio >= 4.5;
  },
};

// Keyboard navigation hooks and utilities
export const keyboardNavigation = {
  /**
   * Handle arrow key navigation in a list
   */
  handleListNavigation: (
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    onIndexChange: (index: number) => void,
    orientation: 'horizontal' | 'vertical' = 'vertical'
  ) => {
    const { key } = event;
    let newIndex = currentIndex;

    if (orientation === 'vertical') {
      if (key === keyboardKeys.ARROW_UP) {
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      } else if (key === keyboardKeys.ARROW_DOWN) {
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      }
    } else {
      if (key === keyboardKeys.ARROW_LEFT) {
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      } else if (key === keyboardKeys.ARROW_RIGHT) {
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      }
    }

    if (key === keyboardKeys.HOME) {
      newIndex = 0;
    } else if (key === keyboardKeys.END) {
      newIndex = items.length - 1;
    }

    if (newIndex !== currentIndex) {
      event.preventDefault();
      onIndexChange(newIndex);
      items[newIndex]?.focus();
    }
  },

  /**
   * Handle escape key to close modals/dropdowns
   */
  handleEscape: (event: KeyboardEvent, onEscape: () => void) => {
    if (event.key === keyboardKeys.ESCAPE) {
      event.preventDefault();
      onEscape();
    }
  },

  /**
   * Handle enter/space activation
   */
  handleActivation: (event: KeyboardEvent, onActivate: () => void) => {
    if (event.key === keyboardKeys.ENTER || event.key === keyboardKeys.SPACE) {
      event.preventDefault();
      onActivate();
    }
  },
};

// Accessibility validation utilities
export const a11yValidation = {
  /**
   * Check if an element has proper labeling
   */
  hasProperLabeling: (element: HTMLElement): boolean => {
    return !!(
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      element.textContent?.trim() ||
      (element as HTMLInputElement).labels?.length
    );
  },

  /**
   * Check if interactive elements are keyboard accessible
   */
  isKeyboardAccessible: (element: HTMLElement): boolean => {
    const tabIndex = element.getAttribute('tabindex');
    return element.tagName.toLowerCase() === 'button' ||
           element.tagName.toLowerCase() === 'a' ||
           element.tagName.toLowerCase() === 'input' ||
           element.tagName.toLowerCase() === 'select' ||
           element.tagName.toLowerCase() === 'textarea' ||
           (tabIndex !== null && tabIndex !== '-1');
  },

  /**
   * Validate form accessibility
   */
  validateForm: (form: HTMLFormElement): string[] => {
    const issues: string[] = [];
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach((input, index) => {
      const element = input as HTMLInputElement;
      
      if (!a11yValidation.hasProperLabeling(element)) {
        issues.push(`Input ${index + 1} lacks proper labeling`);
      }

      if (element.hasAttribute('required') && !element.getAttribute('aria-required')) {
        issues.push(`Required input ${index + 1} missing aria-required`);
      }

      if (element.getAttribute('aria-invalid') === 'true' && !element.getAttribute('aria-describedby')) {
        issues.push(`Invalid input ${index + 1} lacks error description`);
      }
    });

    return issues;
  },
};
