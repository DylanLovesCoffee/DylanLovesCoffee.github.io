interface SectionHeaderProps {
  title: string
  className?: string
}

const SectionHeader = ({ title, className = '' }: SectionHeaderProps) => {
  return (
    <h2 className={`text-4xl lg:text-5xl font-bold font-mono mb-8 text-white retro-glow ${className}`}>
      {title}
    </h2>
  )
}

export default SectionHeader