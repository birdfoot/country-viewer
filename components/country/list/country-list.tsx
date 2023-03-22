import style from "./country-list.module.css"

import Tilt from "react-parallax-tilt"
import CountryCard from "./country-card"

import { ICountry } from "../../../types"

interface CountryListProps {
  countries: ICountry[]
}

const CountryList = ({ countries }: CountryListProps) => {
  if (countries.length === 0) return <div>No countries.</div>

  return (
    <section className={style.layout}>
      {countries.map((country, index) => (
        <Tilt
          key={country.cca3}
          tiltReverse={true}
          tiltAxis="x"
          scale={1.1}
          transitionSpeed={1500}
          glareEnable={true}
          glarePosition="all"
          glareMaxOpacity={0.5}
          glareColor="rgb(250, 250, 255)"
          glareBorderRadius="0.5rem"
          perspective={2000}
        >
          <CountryCard index={index} country={country} />
        </Tilt>
      ))}
    </section>
  )
}

export default CountryList
