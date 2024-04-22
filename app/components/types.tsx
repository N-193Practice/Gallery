import { KeyboardEventHandler, RefObject } from 'react'

export type imagesType = {
  id: string
  position: number[]
  image: string
}
// 絵画の型定義をする

export type inputTextTypes = {
  handleKeyPress: KeyboardEventHandler<HTMLInputElement>
  inputRef: RefObject<HTMLInputElement>
  loading: boolean
}
