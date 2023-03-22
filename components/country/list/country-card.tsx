/* eslint-disable @next/next/no-img-element */
import style from "./country-card.module.css"

import Link from "next/link"

import { ICountry } from "../../../types"

interface CountryCardProps {
  index: number
  country: ICountry
}

const CountryCard = ({ index, country }: CountryCardProps) => {
  const { cca3, name, flags, population, region, capital } = country

  return (
    <div className={style.layout}>
      <Link
        href={{
          pathname: "/countries/[countryId]",
          query: { countryId: cca3 },
        }}
        aria-label={name.common}
      >
        <img
          className={style.image}
          src={flags.svg}
          alt={`Flag of ${country.name.common}`}
          width={225}
          height={135}
          loading={index < 12 ? "eager" : "lazy"}
        />
      </Link>
      <div className={style.content}>
        <h2 className={style.title}>{name.common}</h2>
        <ul className="list">
          <li>
            <span className="text-bold">Population:</span>{" "}
            {population.toLocaleString()}
          </li>
          <li>
            <span className="text-bold">Region:</span> {region}
          </li>
          <li>
            <span className="text-bold">Capital:</span> {capital}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CountryCard
