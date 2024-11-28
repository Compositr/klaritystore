import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/Card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/Chart'
const chartData = [
  { date: '2024-04-01', desktop: 2220, mobile: 1500 },
  { date: '2024-04-02', desktop: 970, mobile: 1800 },
  { date: '2024-04-03', desktop: 1670, mobile: 1200 },
  { date: '2024-04-04', desktop: 2420, mobile: 2600 },
  { date: '2024-04-05', desktop: 3730, mobile: 2900 },
  { date: '2024-04-06', desktop: 3010, mobile: 3400 },
  { date: '2024-04-07', desktop: 2450, mobile: 1800 },
  { date: '2024-04-08', desktop: 4090, mobile: 3200 },
  { date: '2024-04-09', desktop: 590, mobile: 1100 },
  { date: '2024-04-10', desktop: 2610, mobile: 1900 },
  { date: '2024-04-11', desktop: 3270, mobile: 3500 },
  { date: '2024-04-12', desktop: 2920, mobile: 2100 },
  { date: '2024-04-13', desktop: 3420, mobile: 3800 },
  { date: '2024-04-14', desktop: 1370, mobile: 2200 },
  { date: '2024-04-15', desktop: 1200, mobile: 1700 },
  { date: '2024-04-16', desktop: 1380, mobile: 1900 },
  { date: '2024-04-17', desktop: 4460, mobile: 3600 },
  { date: '2024-04-18', desktop: 3640, mobile: 4100 },
  { date: '2024-04-19', desktop: 2430, mobile: 1800 },
  { date: '2024-04-20', desktop: 890, mobile: 1500 },
  { date: '2024-04-21', desktop: 1370, mobile: 2000 },
  { date: '2024-04-22', desktop: 2240, mobile: 1700 },
  { date: '2024-04-23', desktop: 1380, mobile: 2300 },
  { date: '2024-04-24', desktop: 3870, mobile: 2900 },
  { date: '2024-04-25', desktop: 2150, mobile: 2500 },
  { date: '2024-04-26', desktop: 750, mobile: 1300 },
  { date: '2024-04-27', desktop: 3830, mobile: 4200 },
  { date: '2024-04-28', desktop: 1220, mobile: 1800 },
  { date: '2024-04-29', desktop: 3150, mobile: 2400 },
  { date: '2024-04-30', desktop: 4540, mobile: 3800 },
  { date: '2024-05-01', desktop: 1650, mobile: 2200 },
  { date: '2024-05-02', desktop: 2930, mobile: 3100 },
  { date: '2024-05-03', desktop: 2470, mobile: 1900 },
  { date: '2024-05-04', desktop: 3850, mobile: 4200 },
  { date: '2024-05-05', desktop: 4810, mobile: 3900 },
  { date: '2024-05-06', desktop: 4980, mobile: 5200 },
  { date: '2024-05-07', desktop: 3880, mobile: 3000 },
  { date: '2024-05-08', desktop: 1490, mobile: 2100 },
  { date: '2024-05-09', desktop: 2270, mobile: 1800 },
  { date: '2024-05-10', desktop: 2930, mobile: 3300 },
  { date: '2024-05-11', desktop: 3350, mobile: 2700 },
  { date: '2024-05-12', desktop: 1970, mobile: 2400 },
  { date: '2024-05-13', desktop: 1970, mobile: 1600 },
  { date: '2024-05-14', desktop: 4480, mobile: 4900 },
  { date: '2024-05-15', desktop: 4730, mobile: 3800 },
  { date: '2024-05-16', desktop: 3380, mobile: 4000 },
  { date: '2024-05-17', desktop: 4990, mobile: 4200 },
  { date: '2024-05-18', desktop: 3150, mobile: 3500 },
  { date: '2024-05-19', desktop: 2350, mobile: 1800 },
  { date: '2024-05-20', desktop: 1770, mobile: 2300 },
  { date: '2024-05-21', desktop: 820, mobile: 1400 },
  { date: '2024-05-22', desktop: 810, mobile: 1200 },
  { date: '2024-05-23', desktop: 2520, mobile: 2900 },
  { date: '2024-05-24', desktop: 2940, mobile: 2200 },
  { date: '2024-05-25', desktop: 2010, mobile: 2500 },
  { date: '2024-05-26', desktop: 2130, mobile: 1700 },
  { date: '2024-05-27', desktop: 4200, mobile: 4600 },
  { date: '2024-05-28', desktop: 2330, mobile: 1900 },
  { date: '2024-05-29', desktop: 780, mobile: 1300 },
  { date: '2024-05-30', desktop: 3400, mobile: 2800 },
  { date: '2024-05-31', desktop: 1780, mobile: 2300 },
  { date: '2024-06-01', desktop: 1780, mobile: 2000 },
  { date: '2024-06-02', desktop: 4700, mobile: 4100 },
  { date: '2024-06-03', desktop: 1030, mobile: 1600 },
  { date: '2024-06-04', desktop: 4390, mobile: 3800 },
  { date: '2024-06-05', desktop: 880, mobile: 1400 },
  { date: '2024-06-06', desktop: 2940, mobile: 2500 },
  { date: '2024-06-07', desktop: 3230, mobile: 3700 },
  { date: '2024-06-08', desktop: 3850, mobile: 3200 },
  { date: '2024-06-09', desktop: 4380, mobile: 4800 },
  { date: '2024-06-10', desktop: 1550, mobile: 2000 },
  { date: '2024-06-11', desktop: 920, mobile: 1500 },
  { date: '2024-06-12', desktop: 4920, mobile: 4200 },
  { date: '2024-06-13', desktop: 810, mobile: 1300 },
  { date: '2024-06-14', desktop: 4260, mobile: 3800 },
  { date: '2024-06-15', desktop: 3070, mobile: 3500 },
  { date: '2024-06-16', desktop: 3710, mobile: 3100 },
  { date: '2024-06-17', desktop: 4750, mobile: 5200 },
  { date: '2024-06-18', desktop: 1070, mobile: 1700 },
  { date: '2024-06-19', desktop: 3410, mobile: 2900 },
  { date: '2024-06-20', desktop: 4080, mobile: 4500 },
  { date: '2024-06-21', desktop: 1690, mobile: 2100 },
  { date: '2024-06-22', desktop: 3170, mobile: 2700 },
  { date: '2024-06-23', desktop: 4800, mobile: 5300 },
  { date: '2024-06-24', desktop: 1320, mobile: 1800 },
  { date: '2024-06-25', desktop: 1410, mobile: 1900 },
  { date: '2024-06-26', desktop: 4340, mobile: 3800 },
  { date: '2024-06-27', desktop: 4480, mobile: 4900 },
  { date: '2024-06-28', desktop: 1490, mobile: 2000 },
  { date: '2024-06-29', desktop: 1030, mobile: 1600 },
  { date: '2024-06-30', desktop: 4460, mobile: 4000 },
]

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function Component() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('desktop')

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Views by Device</CardTitle>
          <CardDescription>Past 3 months</CardDescription>
        </div>
        <div className="flex">
          {['desktop', 'mobile'].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
