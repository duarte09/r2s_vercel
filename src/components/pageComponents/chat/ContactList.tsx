import { ContactItem } from "./ContactItem"
import { ChatContact } from "@/interfaces/evolution"

interface ContactListProps {
  contacts: ChatContact[]
  selectedPhone: string
  onSelect: (contact: ChatContact) => void
}

export function ContactList({ contacts, selectedPhone, onSelect }: ContactListProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col gap-2 px-2 pt-1">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.phoneNumber}
            contact={contact}
            selected={selectedPhone === contact.phoneNumber}
            onClick={() => onSelect(contact)}
          />
        ))}
      </div>
    </div>
  )
}