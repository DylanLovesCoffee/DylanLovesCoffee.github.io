interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  autoFocus?: boolean
}

const Button = ({ children, onClick, variant = 'primary', className = '', autoFocus = false }: ButtonProps) => {
  const baseClasses = "group flex items-center font-mono text-sm transition-all duration-200 focus:outline-none windows-button"
  
  const variantClasses = {
    primary: "px-8 py-3 text-black hover:text-black focus:text-black",
    secondary: "px-6 py-2 text-black hover:text-black focus:text-black"
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick?.()
    }
  }

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      autoFocus={autoFocus}
      tabIndex={0}
    >
      {children}
    </button>
  )
}

export default Button