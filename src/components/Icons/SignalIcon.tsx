import React from 'react'

interface SignalIconProps {
  size?: number
  className?: string
}

const SignalIcon: React.FC<SignalIconProps> = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='currentColor'
      className={className}
      aria-hidden='true'
    >
      <path d='M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5z' />
      <path d='M12 3c-4.962 0-9 4.038-9 9s4.038 9 9 9 9-4.038 9-9-4.038-9-9-9zm0 16.5c-4.142 0-7.5-3.358-7.5-7.5S7.858 4.5 12 4.5s7.5 3.358 7.5 7.5-3.358 7.5-7.5 7.5z' />
      <path d='M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10.5c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z' />
      <circle cx='12' cy='12' r='2.5' />
    </svg>
  )
}

export default SignalIcon
