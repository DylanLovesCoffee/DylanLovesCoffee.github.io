import { type ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  id?: string
}

export const Container = ({ 
  children, 
  size = 'lg', 
  padding = 'md',
  className = '',
  id
}: ContainerProps) => {
  const sizeClasses = {
    sm: 'max-w-sm mx-auto',
    md: 'max-w-2xl mx-auto',
    lg: 'max-w-3xl mx-auto',
    xl: 'max-w-4xl mx-auto',
    full: 'w-full'
  }
  
  const paddingClasses = {
    none: '',
    sm: 'px-2',
    md: 'px-4 lg:px-6',
    lg: 'px-6 lg:px-8'
  }
  
  return (
    <div className={`${sizeClasses[size]} ${paddingClasses[padding]} ${className}`} id={id}>
      {children}
    </div>
  )
}

interface FlexProps {
  children: ReactNode
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Flex = ({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'md',
  className = ''
}: FlexProps) => {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col'
  }
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }
  
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around'
  }
  
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  }
  
  return (
    <div className={`flex ${directionClasses[direction]} ${alignClasses[align]} ${justifyClasses[justify]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}

interface GridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Grid = ({
  children,
  cols = 1,
  gap = 'md',
  className = ''
}: GridProps) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }
  
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-6',
    lg: 'gap-8'
  }
  
  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}