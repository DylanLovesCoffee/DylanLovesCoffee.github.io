import BackgroundEffects from '../ui/BackgroundEffects'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen cyberpunk-grid scan-lines relative overflow-hidden ${className}`}>
      <BackgroundEffects />
      {children}
    </div>
  )
}

export default PageLayout