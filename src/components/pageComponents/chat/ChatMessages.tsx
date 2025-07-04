import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "./MessageBubble"
import { Message } from "@/interfaces/evolution"

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} {...message} />
        ))}
      </div>
    </ScrollArea>
  )
}