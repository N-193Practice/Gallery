'use client'

import { imagesType } from './types'

import FrameItem from './frame-item'

// フレームリスト...引数で渡された絵画リストをフレームアイテムコンポーネントに渡す
const FrameList = ({ images }: { images: imagesType[] }) => {
  return (
    <group>
      {images.map((data, index) => (
        <FrameItem key={index} data={data} />
      ))}
    </group>
  )
}

export default FrameList
