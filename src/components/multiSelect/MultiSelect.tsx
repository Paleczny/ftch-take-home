import React from 'react'
import { MultiSelect } from 'react-multi-select-component'
export interface Option {
  label: string
  value: string
}
interface MultiSelectProps {
  options: Option[]
  onChange: (selected: Option[]) => void
  labelledBy: string
  selected: Option[]
}

const MultipleSelect = ({ options, onChange, selected, labelledBy }: MultiSelectProps) => {
  return <MultiSelect options={options} value={selected} onChange={onChange} labelledBy={labelledBy} />
}

export default MultipleSelect
