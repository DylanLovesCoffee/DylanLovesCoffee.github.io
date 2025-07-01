interface TerminalContainerProps {
  title: string
  children: React.ReactNode
  className?: string
}

const TerminalContainer = ({ title, children, className = '' }: TerminalContainerProps) => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-8 lg:px-12">
      <div className={`bg-blue-900 windows-border p-1 shadow-2xl max-h-[85vh] overflow-hidden ${className}`}>
        <div className="windows-titlebar p-2 mb-1">
          <span className="font-mono text-black text-sm font-bold">{title}</span>
        </div>
        <div className="bg-blue-900 p-6 lg:p-8 terminal-scanlines">
          {children}
        </div>
      </div>
    </div>
  )
}

export default TerminalContainer