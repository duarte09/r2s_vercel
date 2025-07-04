"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Phone, CheckCircle, TrendingUp, MoreHorizontal, Download, Mail } from "lucide-react"

const representativesData = [
    { id: 1, name: "João Silva", region: "Sul", status: "ativo", lastSale: 2, salesAmount: 45000, goalPercentage: 85, clients: { active: 23, inactive: 5, recurring: 18 }, },
    { id: 2, name: "Maria Santos", region: "Norte", status: "crítico", lastSale: 8, salesAmount: 12000, goalPercentage: 35, clients: { active: 15, inactive: 12, recurring: 8 }, },
    { id: 3, name: "Carlos Oliveira", region: "Sudeste", status: "ativo", lastSale: 1, salesAmount: 62000, goalPercentage: 92, clients: { active: 35, inactive: 3, recurring: 28 }, },
    { id: 4, name: "Ana Costa", region: "Nordeste", status: "inativo", lastSale: 15, salesAmount: 8500, goalPercentage: 28, clients: { active: 8, inactive: 18, recurring: 4 }, },
]

export function RepresentativesTable() {
    const getStatusBadge = (status: string) => {
        switch (status) {
        case "ativo":
            return <Badge className="bg-green-100 text-green-800 border-green-200">ativo</Badge>
        case "crítico":
            return <Badge className="bg-red-100 text-red-800 border-red-200">crítico</Badge>
        case "inativo":
            return <Badge className="bg-gray-100 text-gray-800 border-gray-200">inativo</Badge>
        default:
            return <Badge variant="secondary">{status}</Badge>
        }
    }
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <CardTitle>Dashboard Individual</CardTitle>
          <CardDescription>Performance detalhada da equipe</CardDescription>
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Representante</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="whitespace-nowrap">Última Venda</TableHead>
              <TableHead className="whitespace-nowrap">Vendas do Mês</TableHead>
              <TableHead className="whitespace-nowrap">Meta (%)</TableHead>
              <TableHead className="whitespace-nowrap">Clientes</TableHead>
              <TableHead className="whitespace-nowrap">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {representativesData.map((rep) => (
              <TableRow key={rep.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                      <AvatarFallback>
                        {rep.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium whitespace-nowrap">{rep.name}</div>
                      <div className="text-sm text-gray-500">{rep.region}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(rep.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1 whitespace-nowrap">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{rep.lastSale} dias</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1 whitespace-nowrap">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="font-medium">R$ {rep.salesAmount.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 min-w-[120px]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{rep.goalPercentage}%</span>
                    </div>
                    <Progress
                      value={rep.goalPercentage}
                      className={`h-2 ${
                        rep.goalPercentage >= 80
                          ? "[&>div]:bg-green-500"
                          : rep.goalPercentage >= 50
                            ? "[&>div]:bg-yellow-500"
                            : "[&>div]:bg-red-500"
                      }`}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 whitespace-nowrap">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Ativos: {rep.clients.active}</span>
                    </div>
                    <div className="flex items-center space-x-2 whitespace-nowrap">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs">Inativos: {rep.clients.inactive}</span>
                    </div>
                    <div className="flex items-center space-x-2 whitespace-nowrap">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs">Recorrentes: {rep.clients.recurring}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Phone className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Mail className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MessageSquare className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}