import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ContactItemProps {
  contact: {
    name: string
    phoneNumber: string
    profilePicUrl?: string
  }
  selected: boolean
  onClick: () => void
}

export function ContactItem({ contact, selected, onClick }: ContactItemProps) {
  return (
    <div
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 cursor-pointer rounded-xl transition-colors
      ring-1 ${selected ? "bg-primary/10 ring-primary" : "hover:bg-muted/50 ring-transparent"}`}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={contact.profilePicUrl} />
        <AvatarFallback>
          {contact.name ? contact.name.split(" ").map((n) => n[0]).join("") : "?"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium truncate">{contact.name || contact.phoneNumber}</p>
        </div>
      </div>
    </div>
  )
}