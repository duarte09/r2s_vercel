import { Mic, Paperclip, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
}

export function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" className="h-12 w-12 p-0" size="icon"><Paperclip className="h-4 w-4" /></Button>
      <Input
        placeholder="Digite sua mensagem..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        className="flex-1 h-12 text-base"
        disabled={disabled}
      />
      <Button variant="ghost" className="h-12 w-12 p-0">
        <Mic className="h-5 w-5" />
      </Button>
      <Button
        onClick={onSend}
        disabled={disabled}
        className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  )
}