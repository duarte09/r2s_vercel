"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, ChevronDown, Check } from "lucide-react"

type ContactType = "all" | "unread" | "awaiting" | "groups"

interface ContactTypeSelectorProps {
  selectedType: ContactType
  onSelectType: (type: ContactType) => void
  counts: Record<ContactType, number>
}

const contactOptions: { label: string; value: ContactType }[] = [
  { label: "Todos", value: "all" },
  { label: "Não lidos", value: "unread" },
  { label: "Aguardando resposta", value: "awaiting" },
  { label: "Grupos", value: "groups" },
]

export function ContactTypeSelector({ selectedType, onSelectType, counts }: ContactTypeSelectorProps) {
  const selectedLabel = contactOptions.find(opt => opt.value === selectedType)?.label || "Todos"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start items-center px-3 h-auto">
          <div className="flex items-center gap-3 w-full">
            <Users className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-base">{selectedLabel}</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-600 font-semibold">
              {counts[selectedType]}
            </Badge>
          </div>
          <ChevronDown className="h-5 w-5 text-gray-500 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[250px]">
        {contactOptions.map(option => (
          <DropdownMenuItem key={option.value} onSelect={() => onSelectType(option.value)}>
            {option.label}
            {selectedType === option.value && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}