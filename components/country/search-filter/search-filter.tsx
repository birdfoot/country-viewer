import style from "./search-filter.module.css"

interface SearchFilterProps {
  children: React.ReactNode
}

const SearchFilter = ({ children }: SearchFilterProps) => {
  return (
    <section className={style.layout} data-cy="layout">
      {children}
    </section>
  )
}

export default SearchFilter
