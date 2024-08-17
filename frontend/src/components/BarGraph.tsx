import { Bar, BarChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import GraphIcon from '@/assets/graphs.svg'
import { useTheme } from "@/ThemeContext"
import { CartesianGrid, XAxis } from "recharts"

type Pricing = {
  inference: string;
  ingestPrice: number | null;
  outputPrice: number | null;
}

export function BarGraph({ title, chartData, chartConfig, info }: {
  title: string,
  chartData: Pricing[],
  chartConfig: any,
  info: string
}) {
  const { isDarkTheme } = useTheme();

  const filteredData = chartData.filter(data => data.ingestPrice !== null || data.outputPrice !== null);

  return (
    <div className="flex justify-center text=#1E1E1E] my-8">
      <div className="border border-gray-700 rounded-xl w-11/12 flex flex-col  gap-6">
        <h1 className="border-b p-4">
          <img className="inline mr-2" src={GraphIcon} />
          <span className="text-sm">
            {title}
          </span>
        </h1>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full mx-1">
          <BarChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} horizontal={false}/>
            <XAxis
              dataKey="inference"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 15)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="ingestPrice" fill={isDarkTheme ? "#2662D9" : "#2A9D90"} radius={4} />
            <Bar dataKey="outputPrice" fill={isDarkTheme ? "#E23670" : "#E76E50"} radius={4} />
          </BarChart>
        </ChartContainer>
        <h2 className="text-sm px-4 py-8">{info}</h2>
      </div>
    </div>
  )
}
