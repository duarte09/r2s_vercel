"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, TrendingDown, AlertTriangle } from "lucide-react"

const alertsData = [
  { id: 1, type: "critical", title: "Representantes sem vendas há 7+ dias", count: "12 representantes", color: "bg-red-50 border-red-200", iconColor: "text-red-600", },
  { id: 2, type: "warning", title: "Meta mensal em risco", count: "22% abaixo do esperado", color: "bg-yellow-50 border-yellow-200", iconColor: "text-yellow-600", },
  { id: 3, type: "info", title: "Clientes prestes a churn", count: "8 clientes identificados", color: "bg-blue-50 border-blue-200", iconColor: "text-blue-600", },
  { id: 4, type: "success", title: "Oportunidades quentes", count: "15 deals > R$ 50k", color: "bg-green-50 border-green-200", iconColor: "text-green-600", },
]

export function SmartAlerts() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="h-5 w-5" />
      case "warning": return <TrendingDown className="h-5 w-5" />
      case "info": return <Users className="h-5 w-5" />
      case "success": return <DollarSign className="h-5 w-5" />
      default: return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Alertas Inteligentes</span>
            </CardTitle>
            <CardDescription>Situações que precisam da sua atenção</CardDescription>
          </div>
          <Badge variant="destructive">4</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 h-full">
          {alertsData.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 md:p-4 rounded-lg border ${alert.color} flex items-center`}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={alert.iconColor}>{getAlertIcon(alert.type)}</div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                  <p className="text-xs text-gray-600">{alert.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}