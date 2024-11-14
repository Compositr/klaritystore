interface CurrencyFormatProps {
  value: number
}

const CurrencyFormat = ({ value }: CurrencyFormatProps) => {
  const locale = navigator.language ?? 'en-AU'
  return (
    <span>
      {value.toLocaleString(locale, {
        style: 'currency',
        currency: 'AUD',
      })}
    </span>
  )
}

export default CurrencyFormat
