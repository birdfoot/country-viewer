/* eslint-disable @next/next/no-img-element */
import style from "./country-detail.module.css"

import Link from "next/link"

import { ICountry } from "../../../types"

interface CountryDetailProps {
  country: ICountry
  borders: ICountry[]
}

const CountryDetail = ({ country, borders }: CountryDetailProps) => {
  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    tld,
    languages,
    currencies,
  } = country

  const nativeNames = name.nativeName
    ? Object.keys(name.nativeName)
        .reduce(
          (acc, curr) => [
            ...acc,
            `${name.nativeName![curr].common} (${languages[curr]})`,
          ],
          [] as string[]
        )
        .join(", ")
    : ""

  const currencyNames = Object.values(currencies)
    .reduce(
      (acc, curr) => [...acc, `${curr.name} (${curr.symbol})`],
      [] as string[]
    )
    .join(", ")

  const languageNames = Object.values(languages)
    .reduce((acc, curr) => [...acc, curr], [] as string[])
    .join(", ")

  return (
    <section className={`${style.layout} mb`}>
      <img
        className="image-cover"
        src={flags.svg}
        alt={`Flag of ${country.name.common}`}
        width={225}
        height={135}
      />
      <div className={style.info}>
        <h2 className={style.title}>{name.common}</h2>

        <ul className="list list--mb mb">
          {nativeNames && (
            <li>
              <span className="text-bold">Native Name: </span>
              {nativeNames}
            </li>
          )}
          <li>
            <span className="text-bold">Population: </span>
            {population.toLocaleString()}
          </li>
          <li>
            <span className="text-bold">Region: </span>
            {region}
          </li>
          <li>
            <span className="text-bold">Subregion: </span>
            {subregion}
          </li>
          <li>
            <span className="text-bold">Capital: </span>
            {capital[0]}
          </li>
        </ul>

        <ul className="list list-mb mb">
          <li>
            <span className="text-bold">Top Level Domain: </span>
            {tld[0]}
          </li>
          <li>
            <span className="text-bold">Currencies: </span>
            {currencyNames}
          </li>
          <li>
            <span className="text-bold">Languages: </span>
            {languageNames}
          </li>
        </ul>

        {!!borders.length && (
          <ul className="list">
            <li>
              <span className="text-bold">Borders: </span>
              <div className="inline-flow" data-cy="border-links">
                {borders.map((border) => (
                  <Link
                    className="link-button small"
                    href={{
                      pathname: "/countries/[countryId]",
                      query: { countryId: border.cca3 },
                    }}
                    key={border.cca3}
                  >
                    {border.name.common}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        )}
      </div>
    </section>
  )
}

export default CountryDetail
