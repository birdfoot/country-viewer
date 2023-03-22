import style from "./masthead.module.css"

import { useState } from "react"

import Link from "next/link"

import IconDarkMode from "../../shared/icons/icon-dark-mode"
import IconLightMode from "../../shared/icons/icon-light-mode"

const Masthead = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <header
      className={`${style.layout} ${isDarkMode ? "dark-mode" : ""}`}
      data-cy="layout"
    >
      <div className={`container ${style.layoutInner}`}>
        <h1 className={style.brand} data-cy="brand">
          <Link href="/">Where in the world?</Link>
        </h1>
        <button
          type="button"
          className={style.toggleMode}
          onClick={() => setIsDarkMode((prev) => !prev)}
          data-cy="toggle-mode"
        >
          {isDarkMode ? (
            <>
              <IconLightMode className={style.iconMode} aria-hidden="true" />
              Light Mode
            </>
          ) : (
            <>
              <IconDarkMode className={style.iconMode} aria-hidden="true" />
              Dark Mode
            </>
          )}
        </button>
      </div>
    </header>
  )
}

export default Masthead
