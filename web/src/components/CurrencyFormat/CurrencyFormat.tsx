interface CurrencyFormatProps {
  value: number
}

const CurrencyFormat = ({ value }: CurrencyFormatProps) => {
  const locale = navigator.language ?? 'en-AU'
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'AUD',
  })
  return <span>{formatter.format(value)}</span>
}

export default CurrencyFormat
