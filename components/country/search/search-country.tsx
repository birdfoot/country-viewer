import style from "./search-country.module.css"

import IconSearch from "../../shared/icons/icon-search"
import IconXCircle from "../../shared/icons/icon-x-circle"
import { useState } from "react"

interface SearchCountryProps {
  onSearch: (searchString: string) => void
}

const SearchCountry = ({ onSearch }: SearchCountryProps) => {
  const [text, setText] = useState("")

  const handleTextChange = (input: string) => {
    setText(input)
    onSearch(input)
  }

  return (
    <div className={style.layout} data-cy="layout">
      <IconSearch className={style.iconSearch} aria-hidden="true" />
      <input
        type="text"
        placeholder="Search for a country..."
        className={style.input}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        data-cy="input"
      />
      <button
        type="button"
        className={style.clear}
        onClick={(e) => handleTextChange("")}
        data-hidden={text === ""}
        data-cy="clear"
      >
        <IconXCircle aria-label="Clear input" />
      </button>
    </div>
  )
}

export default SearchCountry
