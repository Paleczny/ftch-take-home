import React, { ReactNode } from 'react'
import { MultiSelect } from 'react-multi-select-component'
export interface Option {
  label: string
  value: string
  key?: string
  disabled?: boolean
}

export interface SelectProps {
  options: Option[]
  value: Option[]
  onChange?: any
  valueRenderer?: (selected: Option[], options: Option[]) => ReactNode
  ItemRenderer?: any
  ArrowRenderer?: ({ expanded }: { expanded: boolean }) => JSX.Element
  isLoading?: boolean
  disabled?: boolean
  disableSearch?: boolean
  shouldToggleOnHover?: boolean
  hasSelectAll?: boolean
  filterOptions?: (options: Option[], filter: string) => Promise<Option[]> | Option[]
  overrideStrings?: { [key: string]: string }
  labelledBy: string
  className?: string
  onMenuToggle?: any
  ClearIcon?: ReactNode
  debounceDuration?: number
  ClearSelectedIcon?: ReactNode
  defaultIsOpen?: boolean
  isOpen?: boolean
  isCreatable?: boolean
  onCreateOption?: any
  closeOnChangedValue?: boolean
}
const MultipleSelect = ({ ...props }: SelectProps) => {
  return <MultiSelect {...props} />
}

export default MultipleSelect
