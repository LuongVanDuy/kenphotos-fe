'use client'

import { useState } from 'react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

type CompareSliderProps = {
  beforeImage: string
  afterImage: string
  onDragStart?: () => void
  onDragEnd?: () => void
}

export const CompareSlider: React.FC<CompareSliderProps> = ({
  beforeImage,
  afterImage,
  onDragStart,
  onDragEnd,
}) => {
  const [position, setPosition] = useState(50)

  return (
    <div
      className='h-full'
      onPointerDown={() => onDragStart?.()}
      onPointerUp={() => onDragEnd?.()}
      onPointerLeave={() => onDragEnd?.()}
    >
      <ReactCompareSlider
        position={position}
        onPositionChange={(pos) => {
          const rounded = Math.round(pos * 10) / 10
          if (Math.round(position * 10) / 10 !== rounded) {
            setPosition(rounded)
          }
        }}
        itemOne={
          <div className='relative w-full h-full'>
            <ReactCompareSliderImage
              src={beforeImage}
              alt='Before'
              className='object-cover w-full h-full'
            />
            {position > 10 && (
              <div className='absolute top-3 left-3 bg-white/70 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full z-10'>
                Before
              </div>
            )}
          </div>
        }
        itemTwo={
          <div className='relative w-full h-full'>
            <ReactCompareSliderImage
              src={afterImage}
              alt='After'
              className='object-cover w-full h-full'
            />
            {position < 95 && (
              <div className='absolute top-3 right-3 bg-white/70 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full z-10'>
                After
              </div>
            )}
          </div>
        }
        className='h-full w-full react-compare-slider'
        style={{ height: '100%' }}
      />
    </div>
  )
}
