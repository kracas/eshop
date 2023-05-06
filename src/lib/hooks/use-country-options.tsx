import { useRegions } from "medusa-react"
import { useMemo } from "react"

export type CountryOption = {
  country: string
  region: string
  label: string
}

const useCountryOptions = () => {
  const { regions } = useRegions()

  const options: CountryOption[] | undefined = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
  }, [regions])

  if (options) options.sort((a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (b.label < a.label) {
      return 1;
    }
    return 0;
  });

  return options
}

export default useCountryOptions
