import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react"
import useCountryOptions from "@lib/hooks/use-country-options"


const CountrySelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ placeholder = "Country", ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    const options = useCountryOptions()

    return (
      <NativeSelect ref={innerRef} placeholder={placeholder} {...props}>
        {options && options.map((option, index) => (
          <option key={index} value={option.country}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
    )
  }
)

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
