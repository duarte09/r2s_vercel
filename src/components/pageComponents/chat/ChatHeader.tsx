import { Info, ChevronLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChatHeaderProps {
  name: string
  profilePicUrl?: string
  onToggleInfo: () => void
  onBack?: () => void
  company?: string
  status?: string
  onStatusChange?: (status: string) => void
}

export function ChatHeader({
  name,
  profilePicUrl,
  onToggleInfo,
  onBack,
  company = "nome da empresa",
  status,
  onStatusChange,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b md:px-4 h-16 bg-white w-full">
      <div className="flex items-center gap-2 md:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:hidden"
          onClick={onBack}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Avatar
          className="h-9 w-9 md:h-10 md:w-10 cursor-pointer"
          onClick={onToggleInfo}
        >
          {/* CORREÇÃO APLICADA AQUI */}
          <AvatarImage src={profilePicUrl || undefined} />
          <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>

        <div
          className="leading-tight cursor-pointer"
          onClick={onToggleInfo}
        >
          <p className="font-medium text-sm md:text-base">{name}</p>
          <p className="text-xs text-muted-foreground hidden md:block">
            {company}
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-3 md:flex md:gap-5">
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger
            className="h-12 w-[120px] text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
            style={{ "--muted-foreground": "oklch(1 0 0)" } as React.CSSProperties}
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="follow-up">Follow-up</SelectItem>
            <SelectItem value="ganho">Ganho</SelectItem>
            <SelectItem value="perdido">Perdido</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          className="h-10 w-10 border"
          onClick={onToggleInfo}
        >
          <Info className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </div>
  )
}