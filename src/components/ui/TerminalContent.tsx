interface TerminalContentProps {
  content: string
  isTyping?: boolean
  className?: string
}

const TerminalContent = ({ content, isTyping = false, className = '' }: TerminalContentProps) => {
  return (
    <div className={`font-mono text-sm text-green-400 max-h-[50vh] overflow-y-auto leading-relaxed ${className}`}>
      {content.split('\n').map((line, index) => (
        <div key={index} className="leading-relaxed mb-1 min-h-[1.5rem]">
          {line || '\u00A0'}
          {index === content.split('\n').length - 1 && isTyping && (
            <span className="inline-block w-2 h-5 bg-green-400 ml-1 animate-pulse"></span>
          )}
        </div>
      ))}
    </div>
  )
}

export default TerminalContent