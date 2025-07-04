"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, UserCheck, AlertTriangle, FileText, UserX } from "lucide-react"

const teamMetrics = [
  { title: "Vendas do Mês", value: "R$ 2.4M", change: "+18%", subtitle: "vs mês anterior", trend: "up", icon: TrendingUp, iconColor: "text-green-600", },
  { title: "Meta Mensal", value: "78%", change: "R$ 680K restante", subtitle: "até o objetivo", trend: "neutral", icon: Target, iconColor: "text-blue-600", },
  { title: "Representantes Ativos", value: "89", change: "+5", subtitle: "nesta semana", trend: "up", icon: UserCheck, iconColor: "text-purple-600", },
  { title: "Críticos", value: "12", change: "Sem vendas 7+ dias", subtitle: "precisam atenção", trend: "down", icon: AlertTriangle, iconColor: "text-red-600", },
  { title: "Orçamentos Pendentes", value: "24", change: "+3 hoje", subtitle: "aguardando resposta", trend: "neutral", icon: FileText, iconColor: "text-yellow-600", },
  { title: "Clientes Inativos", value: "156", change: "+8 esta semana", subtitle: "precisam reativação", trend: "down", icon: UserX, iconColor: "text-orange-600", },
]

export function TeamMetrics() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Números do Time - Hoje</CardTitle>
        <CardDescription>Métricas atualizadas em tempo real</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
          {teamMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={index}
                className="p-3 md:p-4 rounded-lg border bg-background flex flex-col justify-between min-h-[120px]"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs md:text-sm font-medium text-muted-foreground">{metric.title}</span>
                  <Icon className={`h-4 w-4 md:h-5 md:w-5 ${metric.iconColor}`} />
                </div>
                <div className="space-y-1 mt-auto">
                  <div className="text-xl md:text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center space-x-1">
                    <span className={`text-xs md:text-sm font-medium ${metric.trend === "up" ? "text-green-600" : metric.trend === "down" ? "text-red-600" : "text-gray-600"}`}>
                      {metric.change}
                    </span>
                    {metric.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                    {metric.trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}