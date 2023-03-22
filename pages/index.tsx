import { memo, useCallback, useDeferredValue, useState } from "react"
import { GetServerSidePropsContext } from "next"

import Head from "next/head"
import CountryList from "../components/country/list/country-list"
import SearchFilter from "../components/country/search-filter/search-filter"
import SearchCountry from "../components/country/search/search-country"
import FilterRegion from "../components/country/filter/filter-region"

import { ICountry } from "../types"

interface HomePageProps {
  regions: string[]
  countries: ICountry[]
}

const MemoFilterRegion = memo(FilterRegion)

// TODO: Try filtering region from client-side via query params.
const HomePage = ({ regions, countries }: HomePageProps) => {
  const [searchString, setSearchString] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const debouncedSearch = useDeferredValue(searchString)

  const filteredCountries = countries
    .filter(
      (country) =>
        country.name.common
          .toLowerCase()
          .indexOf(debouncedSearch.toLowerCase()) > -1
    )
    .filter(
      (country) => country.region === selectedRegion || selectedRegion === ""
    )

  const handleSelectRegion = useCallback((region: string) => {
    setSelectedRegion(region)
  }, [])

  const handleSearchCountry = (text: string) => {
    setSearchString(text)
  }

  return (
    <>
      <Head>
        <title>Where in the world?</title>
        <meta
          name="description"
          content="Listing of countries in the world."
        ></meta>
      </Head>

      <SearchFilter>
        <SearchCountry onSearch={handleSearchCountry} />
        <MemoFilterRegion
          options={regions}
          onSelectRegion={handleSelectRegion}
        />
      </SearchFilter>
      <CountryList countries={filteredCountries} />
    </>
  )
}

export default HomePage

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1000, stale-while-revalidate=60"
  )

  const response = await fetch(
    `https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,capital`
  )
  const countries: ICountry[] = await response.json()
  const regions: string[] = countries
    .map((country) => country.region)
    .filter(
      (region: string, index: number, arr: string[]) =>
        arr.indexOf(region) === index
    )
    .sort()

  return {
    props: {
      regions,
      countries,
    },
  }
}
