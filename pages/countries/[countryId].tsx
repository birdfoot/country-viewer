import { GetServerSidePropsContext } from "next"

import Head from "next/head"
import Link from "next/link"
import CountryDetail from "../../components/country/detail/country-detail"
import IconArrowLeft from "../../components/shared/icons/icon-arrow-left"

import { ICountry } from "../../types"

interface CountryPageProps {
  country: ICountry
  borders: ICountry[]
}

const CountryPage = ({ country, borders }: CountryPageProps) => {
  const title = `Where in the world is ${country.name.common}?`
  const metaDescription = `About ${country.name.common}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription}></meta>
      </Head>
      <div className="mb">
        <Link
          className="link-button"
          href="/"
          aria-label="Back to main page"
          data-cy="country-back-link"
        >
          <IconArrowLeft className="link-button__icon" aria-hidden="true" />
          Back
        </Link>
      </div>
      <CountryDetail country={country} borders={borders} />
    </>
  )
}

export default CountryPage

export async function getServerSideProps({
  query,
  res,
}: GetServerSidePropsContext) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1000, stale-while-revalidate=60"
  )

  const response = await fetch(
    `https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,subregion,capital,tld,languages,currencies,borders`
  )
  const countries: ICountry[] = await response.json()

  const country = countries.find(
    (entry) =>
      entry.cca3.toLowerCase() === (query.countryId as string).toLowerCase()
  )

  if (country === undefined) return { notFound: true }

  const borders = countries.filter(
    (c) => (country.borders ?? []).indexOf(c.cca3) > -1
  )

  return {
    props: {
      country,
      borders,
    },
  }
}
