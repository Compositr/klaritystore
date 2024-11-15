import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/Card'

interface StatCardProps {
  title: string
  description?: string
}
const StatCard = ({ title, description }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-5 py-3 sm:py-5">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <span className="text-lg font-bold leading-none sm:text-3xl">
          ${(10000).toLocaleString()}
        </span>
      </CardContent>
    </Card>
  )
}

export default StatCard
