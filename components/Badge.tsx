import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'success' | 'info' | 'warning' | 'primary';
  children: ReactNode;
  className?: string;
}

export default function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
  const variantStyles = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    primary: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
