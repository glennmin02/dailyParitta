import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const baseClass = 'card'
  const interactiveClass = onClick
    ? 'cursor-pointer hover:shadow-md transition-shadow'
    : ''

  return (
    <div className={`${baseClass} ${interactiveClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}
