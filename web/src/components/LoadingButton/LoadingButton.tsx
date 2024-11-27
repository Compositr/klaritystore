import { Loader } from 'lucide-react'

import { Button } from '../ui/Button'

export interface LoadingButtonProps
  extends React.ComponentProps<typeof Button> {
  loading?: boolean
  loadingMessage?: React.ReactNode

  asChild?: never
}

const LoadingButton = ({
  asChild: _asChild, // disallow passing asChild

  children,
  loading,
  loadingMessage,

  ...props
}: LoadingButtonProps) => {
  return (
    <Button disabled={loading} {...props}>
      {!loading && children}
      {loading && (
        <>
          <Loader className="animate-spin" />
          {/* Hide message as it would not fit on icon sized buttons */}
          {loadingMessage ?? (props.size === 'icon' ? null : 'Loading')}
        </>
      )}
    </Button>
  )
}

export default LoadingButton
