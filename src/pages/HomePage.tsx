import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/prayers')
  }, [navigate])

  return null
}
