import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-on-primary hover:bg-on-surface-variant transition-colors',
  secondary:
    'bg-beige-light text-primary border border-gray-beige hover:bg-gray-beige transition-colors',
  outline:
    'border-b-2 border-gold text-primary hover:text-gold transition-colors py-1',
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg ${variantClasses[variant]}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
