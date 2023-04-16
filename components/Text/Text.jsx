import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Text.module.css';
import Link from 'next/link';

export const Text = forwardRef(function Text({ color, children, className, as, ...props }, ref) {
  const Component = as || 'p';
  return (
    <Component
      style={color ? { '--color': `var(--${color})` } : undefined}
      className={clsx(styles.text, className)}
      {...props}
      ref={ref}
    >
      {children}
    </Component>
  );
});

export const TextLink = forwardRef(function Text({ color, children, className, href, onClick, variant }, ref) {
  return (
    <Link
      style={color ? { '--color': `var(--${color})` } : undefined}
      className={clsx(styles.text, styles.link, variant && styles[variant], className)}
      href={href || '/'}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </Link>
  );
});
