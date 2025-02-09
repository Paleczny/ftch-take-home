import { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

interface DropdownProps {
  options: string[]
  handleOnOptionSelected: (val: any) => void
}
const Dropdown = ({ options, handleOnOptionSelected }: DropdownProps) => {
  const [selected, setSelected] = useState<string>(options[0])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDropdownItemSelect = (option: string) => {
    handleOnOptionSelected(option)
    setSelected(option)
    setIsOpen(false)
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
      </button>

      {/* Dropdown Menu */}
      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {options.map((option) => (
          <li key={option}>
            <button className="dropdown-item" onClick={() => handleDropdownItemSelect(option)}>
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
