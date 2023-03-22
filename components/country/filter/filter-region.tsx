import style from "./filter-region.module.css"

import { useEffect, useRef, useState } from "react"

import IconChevronDown from "../../shared/icons/icon-chevron-down"

interface FilterRegionProps {
  options: string[]
  onSelectRegion: (option: string) => void
}

const FilterRegion = ({ options, onSelectRegion }: FilterRegionProps) => {
  const [value, setValue] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleSelectRegion = (region: string) => {
    setValue(region)
    onSelectRegion(region)
    setIsMenuOpen(false)
  }

  // Handle closing of menu when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (e: PointerEvent) => {
      const isOutsideElem =
        (e.target as HTMLElement).parentNode !== menuRef.current &&
        e.target !== buttonRef.current &&
        e.target !== menuRef.current

      if (isOutsideElem) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick)

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick)
    }
  }, [])

  return (
    <div className={style.layout} data-cy="layout">
      <button
        ref={buttonRef}
        className={style.toggleMenu}
        type="button"
        id="filter-menu-button"
        aria-haspopup="true"
        aria-controls="filter-menu"
        aria-label="Filter by Region"
        aria-expanded={isMenuOpen}
        onClick={handleMenuToggle}
        data-cy="button"
      >
        {value !== "" ? value : "Filter by Region"}
        <IconChevronDown className={style.iconIsExpanded} aria-hidden="true" />
      </button>
      <ul
        ref={menuRef}
        className={style.menu}
        id="filter-menu"
        role="menu"
        aria-labelledby="filter-menu-button"
        data-cy="menu"
      >
        <li onClick={() => handleSelectRegion("")} tabIndex={0} role="menuitem">
          All
        </li>
        {options.map((region) => (
          <li
            key={region}
            onClick={() => handleSelectRegion(region)}
            tabIndex={0}
            role="menuitem"
          >
            {region}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterRegion
