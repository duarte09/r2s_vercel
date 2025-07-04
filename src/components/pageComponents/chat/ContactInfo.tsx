import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, ChevronLeft, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface ContactInfoProps {
  name: string
  phone: string
  project: string
  lastActive: string
  unread: number
  tags?: string[]
  profilePicUrl?: string
  onBack?: () => void
}

export function ContactInfo({
  name,
  phone,
  project,
  lastActive,
  unread,
  tags = [],
  profilePicUrl,
  onBack,
}: ContactInfoProps) {
  const isMobile = useIsMobile()

  return (
    <div className="flex flex-col h-full space-y-4 p-3">
      <div className="grid grid-cols-3 items-center pb-2">
        <div className="justify-self-start">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8">
            {isMobile ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        </div>

        <h3 className="font-semibold text-lg text-center">Informações</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Perfil */}
        <div className="text-center">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarImage src={profilePicUrl} />
            <AvatarFallback className="text-xl">
              {name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{phone}</p>
        </div>

        <Separator />

        {/* Detalhes */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium block mb-1">Camapanha vinculada</label>
            <Badge className="bg-primary text-primary-foreground">{project}</Badge>
          </div>
          <div>
            <label className="text-sm font-medium">Última atividade</label>
            <p className="text-sm text-muted-foreground">{lastActive}</p>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Tags do contato</label>
            <div className="flex flex-wrap gap-2">
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Nenhuma tag adicionada</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Ações */}
        <div className="space-y-2">
          <Button className="w-full border-primary text-primary hover:bg-primary/10" variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Gerar orçamento
          </Button>
        </div>
      </div>
    </div>
  )
}