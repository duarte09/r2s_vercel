import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  content: string
  time: string
  isMe: boolean
}

export function MessageBubble({ content, time, isMe }: MessageBubbleProps) {
  return (
    <div className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3 text-sm",
          isMe ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        <p>{content}</p>
      </div>
      <span className="text-xs text-muted-foreground"> {time} </span>
    </div>
  )
}