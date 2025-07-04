"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TrendingUp, TrendingDown, Clock, CalendarDays, LineChart, Info } from "lucide-react"
import { BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const salesInsights = [
  {
    title: "Meta diária",
    value: "R$ 2.4M",
    change: "Objetivo: R$ 2800,00",
    trend: "up",
    icon: TrendingUp,
    illustrationIcon: Clock,
    details: {
      vendasPeriodo: "R$ 2.600,00",
      superavit: "R$ 200,00",
      superavitPositive: true,
      alcance: 93,
      status: "Acima da meta",
      chartData: [
        { name: "Seg", value: 2200 },
        { name: "Ter", value: 2600 },
        { name: "Qua", value: 2500 },
        { name: "Qui", value: 2700 },
        { name: "Sex", value: 2400 },
        { name: "Sáb", value: 2000 },
        { name: "Dom", value: 1800 },
      ],
    },
  },
  {
    title: "Meta mensal",
    value: "R$ 60.0M",
    change: "Objetivo para Julho",
    trend: "down",
    icon: TrendingDown,
    illustrationIcon: CalendarDays,
    details: {
      vendasPeriodo: "R$ 58.000.000,00",
      superavit: "-R$ 2.000.000,00",
      superavitPositive: false,
      alcance: 76,
      status: "Abaixo da meta",
      chartData: [
        { name: "Semana 1", value: 12_000_000 },
        { name: "Semana 2", value: 13_000_000 },
        { name: "Semana 3", value: 14_000_000 },
        { name: "Semana 4", value: 19_000_000 },
      ],
    },
  },
  {
    title: "Meta anual",
    value: "R$ 720.1M",
    change: "Objetivo: R$ 740M",
    trend: "down",
    icon: TrendingDown,
    illustrationIcon: LineChart,
    details: {
      vendasPeriodo: "R$ 700.000.000,00",
      superavit: "-R$ 20.100.000,00",
      superavitPositive: false,
      alcance: 88,
      status: "Abaixo da meta",
      chartData: [
        { name: "Jan", value: 55_000_000 },
        { name: "Fev", value: 57_000_000 },
        { name: "Mar", value: 60_000_000 },
        { name: "Abr", value: 59_000_000 },
        { name: "Mai", value: 62_000_000 },
        { name: "Jun", value: 63_000_000 },
      ],
    },
  },
]

export function SalesInsights() {
  return (
    <TooltipProvider>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Progresso de metas</CardTitle>
          <CardDescription>
            Acompanhe os indicadores de desempenho das metas em tempo real.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {salesInsights.map(({ title, value, change, trend, icon: Icon, illustrationIcon: Illustration, details }, i) => {
              const isPositive = details.superavitPositive
              const valueColor = isPositive ? "text-green-600" : "text-red-600"
              const borderColor = isPositive ? "border-l-green-500" : "border-l-red-500"
              const badgeColor = isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"

              return (
                <div key={i} className={cn("relative p-4 rounded-lg border bg-background shadow-sm flex flex-col border-l-4", borderColor)}>
                  <div className={cn("absolute -top-2 right-3 text-[11px] px-2 py-0.5 rounded-full font-medium", badgeColor)}>
                    {details.status}
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Illustration className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm">{title}</span>
                        </TooltipTrigger>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Icon className={cn("h-5 w-5", isPositive ? "text-green-600" : "text-red-600")} />
                        </TooltipTrigger>
                      </Tooltip>
                    </div>
                  </div>

                  <div className={cn("text-xl font-bold", valueColor)}>{value}</div>
                  <div className="flex items-center space-x-1 mb-1">
                    <span className={cn("text-xs font-medium", valueColor)}>{change}</span>
                    {trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                    {trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Progress
                          value={details.alcance}
                          className={cn(
                            isPositive ? "[&>div]:bg-green-600" : "[&>div]:bg-red-600"
                          )}
                        />
                        <div className="text-xs text-right mt-1">{details.alcance}%</div>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>

                  <div className="mt-4 space-y-2 border-t pt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      <span>Vendas no período: {details.vendasPeriodo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      <span>
                        Superavit:{" "}
                        <span className={cn("font-semibold", valueColor)}>{details.superavit}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={details.chartData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} stroke="var(--muted-foreground)" />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid var(--border)",
                            borderRadius: 6,
                            fontSize: "0.75rem",
                            boxShadow: "none",
                          }}
                          labelStyle={{ color: "var(--muted-foreground)", fontWeight: 500 }}
                          formatter={(v) => [`R$ ${v}`, "Vendas"]}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="oklch(0.83 0 0)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
