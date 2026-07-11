import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none';
  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
  };
  const variants = {
    primary:
      'bg-[#D35400] text-white hover:bg-[#E67E22] shadow-lg shadow-[#D35400]/20 hover:shadow-[#D35400]/40',
    outline:
      'border-2 border-[#D35400] text-[#D35400] hover:bg-[#D35400] hover:text-white',
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
