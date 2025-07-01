interface ContentContainerProps {
  children: React.ReactNode
  className?: string
}

const ContentContainer = ({ children, className = '' }: ContentContainerProps) => {
  return (
    <div className={`min-h-screen max-h-screen overflow-y-auto py-4 px-6 lg:px-12 ${className}`}>
      <div className="max-w-5xl mx-auto relative z-10 px-4 lg:px-8">
        <div className="flex justify-center py-4">
          <div className="w-full max-w-4xl px-2 lg:px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentContainer