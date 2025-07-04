"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, AreaChart, Area, ReferenceLine } from "recharts"

const salesByCampaign = [
    { name: "Campanha A", vendas: 45, meta: 50 },
    { name: "Campanha B", vendas: 32, meta: 40 },
    { name: "Campanha C", vendas: 28, meta: 30 },
    { name: "Campanha D", vendas: 15, meta: 25 },
]
const longTermSales = [
    { mes: "Jan", vendas: 120, meta: 100 },
    { mes: "Fev", vendas: 150, meta: 120 },
    { mes: "Mar", vendas: 180, meta: 140 },
    { mes: "Abr", vendas: 165, meta: 160 },
    { mes: "Mai", vendas: 200, meta: 180 },
    { mes: "Jun", vendas: 220, meta: 200 },
]
const leadsData = [
    { name: "Ativos", value: 45, color: "#0046ff" },
    { name: "Em Contato", value: 32, color: "#4169E1" },
    { name: "Agendados", value: 28, color: "#6495ED" },
    { name: "Realizadas", value: 15, color: "#87CEEB" },
    { name: "Ganhos", value: 12, color: "#00CED1" },
]
const conversionTime = [
    { periodo: "Sem 1", tempo: 3.2 },
    { periodo: "Sem 2", tempo: 2.8 },
    { periodo: "Sem 3", tempo: 3.5 },
    { periodo: "Sem 4", tempo: 2.9 },
]

export function SalesCharts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card className="min-h-[280px] sm:min-h-[320px] flex flex-col">
        <CardHeader>
          <CardTitle>Campanhas</CardTitle>
          <CardDescription>Vendas vs Meta</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByCampaign}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <ReferenceLine y={50} stroke="#f87171" strokeDasharray="3 3" />
              <Bar dataKey="vendas" fill="#0046ff" name="Vendas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="min-h-[280px] sm:min-h-[320px] flex flex-col">
        <CardHeader>
          <CardTitle>Status dos Leads</CardTitle>
          <CardDescription>Distribuição atual</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={leadsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" fontSize={12} />
              <YAxis dataKey="name" type="category" fontSize={12} width={80} />
              <Tooltip />
              <Bar dataKey="value" name="Leads">
                {leadsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="min-h-[280px] sm:min-h-[320px] flex flex-col">
        <CardHeader>
          <CardTitle>Vendas a Longo Prazo</CardTitle>
          <CardDescription>Últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={longTermSales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="vendas" stroke="#0046ff" fill="#0046ff" fillOpacity={0.3} />
              <Line type="monotone" dataKey="meta" stroke="#000000" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="min-h-[280px] sm:min-h-[320px] flex flex-col">
        <CardHeader>
          <CardTitle>Conversão</CardTitle>
          <CardDescription>Tempo médio (dias)</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversionTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="tempo" stroke="#0046ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}