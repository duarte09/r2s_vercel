"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { ChatHeader } from "@/components/pageComponents/chat/ChatHeader"
import { ChatMessages } from "@/components/pageComponents/chat/ChatMessages"
import { ChatInput } from "@/components/pageComponents/chat/ChatInput"
import { ContactList } from "@/components/pageComponents/chat/ContactList"
import { ContactInfo } from "@/components/pageComponents/chat/ContactInfo"
import { useAppSelector } from "@/store"
import { useGetChatContactsMutation, useSendTextMessagesMutation, useGetConnectionStateQuery } from "@/store/services/evolutionApi"
import { ChatContact, Message } from "@/interfaces/evolution"
import { ConnectModal } from "@/components/pageComponents/chat/ConnectModal"
import { cn } from "@/lib/utils"
import { ContactTypeSelector } from "@/components/pageComponents/chat/ContactTypeSelector"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ChatPage() {
  const instanceName = useAppSelector((state) => state.whatsApp.schemaName)
  const [getChatContacts] = useGetChatContactsMutation()
  const [sendTextMessage, { isLoading: isSending }] = useSendTextMessagesMutation()
  const { data: connectionStateData, isLoading: isCheckingConnection } = useGetConnectionStateQuery(instanceName!, {
    skip: !instanceName,
    refetchOnMountOrArgChange: true,
  })
  const [contacts, setContacts] = useState<ChatContact[]>([])
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [messagesByContact, setMessagesByContact] = useState<Record<string, Message[]>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [contactType, setContactType] = useState<"all" | "unread" | "awaiting" | "groups">("all")
  const isMobile = useIsMobile()
  const contactCounts = { all: contacts.length, unread: 5, awaiting: 2, groups: 1 }
  const filteredContacts = contacts.filter((contact) =>
    (contact.name || contact.phoneNumber).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact || !instanceName) return

    const contentToSend = newMessage.trim()
    setNewMessage("")

    try {
      await sendTextMessage({
        instanceName,
        message: contentToSend,
        number: selectedContact.phoneNumber,
      }).unwrap()

      const newMsg: Message = {
        id: Date.now(),
        content: contentToSend,
        time: new Date().toLocaleTimeString().slice(0, 5),
        isMe: true,
      }

      setMessagesByContact((prev) => ({
        ...prev,
        [selectedContact.phoneNumber]: [...(prev[selectedContact.phoneNumber] || []), newMsg],
      }))
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
    }
  }

  useEffect(() => {
    if (instanceName) {
      getChatContacts(instanceName).unwrap().then((res) => {
          setContacts(res.chats ?? [])
          if (res.chats?.length && !isMobile && !selectedContact) {
            setSelectedContact(res.chats[0])
          }
        })
    }
  }, [instanceName, getChatContacts, isMobile, selectedContact])

  useEffect(() => {
    if (isMobile) {
        setShowContactInfo(false);
    }
  }, [isMobile]);

  const isConnected = connectionStateData?.state === "open"

  return (
    <div className="flex flex-col h-full w-full p-4 md:p-6">
      <ConnectModal open={!isConnected} isLoading={isCheckingConnection} />

      <div className={cn("flex-1 min-h-0 md:grid md:gap-4", showContactInfo ? "md:grid-cols-[340px_1fr_320px]" : "md:grid-cols-[340px_1fr]")}>
        {/* Coluna 1: LISTA DE CONTATOS */}
        <div className={cn("flex flex-col gap-2 h-full min-h-0", isMobile && selectedContact ? "hidden" : "flex")}>
          <Card className="p-2 md:p-4">
            <ContactTypeSelector selectedType={contactType} onSelectType={setContactType} counts={contactCounts} />
          </Card>

          <Card className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {/* Campo de busca */}
            <div className="px-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar em todos..."
                  className="pl-10 bg-slate-100 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Lista de contatos */}
            <div className="flex-1 overflow-y-auto">
              <ContactList
                contacts={filteredContacts}
                selectedPhone={selectedContact?.phoneNumber || ""}
                onSelect={(contact) => setSelectedContact(contact)}
              />
            </div>
          </Card>
        </div>

        {/* Chat Principal */}
        {selectedContact && (
          <div className={cn("h-full flex-col", isMobile && showContactInfo ? "hidden" : "flex")}>
            <Card className="w-full flex-1 grid grid-rows-[auto_1fr_auto]">
              <ChatHeader
                name={selectedContact.name || selectedContact.phoneNumber}
                profilePicUrl={selectedContact.profilePicUrl}
                onToggleInfo={() => setShowContactInfo(!showContactInfo)}
                onBack={() => setSelectedContact(null)}
              />
                <ChatMessages messages={messagesByContact[selectedContact.phoneNumber] || []} />
              <div className="p-2">
                <ChatInput value={newMessage} onChange={setNewMessage} onSend={handleSendMessage} disabled={isSending} />
              </div>
            </Card>
          </div>
        )}

        {/* Informações do Contato */}
        {selectedContact && showContactInfo && (
           <div className="h-full">
            <Card className="flex flex-col w-full h-full">
                <ContactInfo
                    name={selectedContact.name || selectedContact.phoneNumber}
                    phone={selectedContact.phoneNumber}
                    profilePicUrl={selectedContact.profilePicUrl}
                    project="N/A" lastActive="-" unread={0} tags={[]}
                    onBack={() => setShowContactInfo(false)}
                />
            </Card>
           </div>
        )}
      </div>
    </div>
  )
}