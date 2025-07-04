"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { InstanceQRCode } from "./InstanceQRCode"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/store"
import { useGetConnectionStateQuery } from "@/store/services/evolutionApi"

interface ConnectModalProps {
    open: boolean
    isLoading: boolean
}

export function ConnectModal({ open, isLoading }: ConnectModalProps) {
    const router = useRouter()
    const instanceName = useAppSelector((state) => state.whatsApp.schemaName)
    const [shouldOpen, setShouldOpen] = useState(open)

    const { data: connectionState } = useGetConnectionStateQuery(instanceName!, {
        skip: !instanceName,
        refetchOnFocus: true,
        refetchOnReconnect: true,
        pollingInterval: 3000,
    })

    // Fecha automaticamente quando conectado
    useEffect(() => {
        if (connectionState?.state === "open") {
            setShouldOpen(false)
        }
    }, [connectionState])

    // Reabre se a prop open mudar de true (fallback)
    useEffect(() => {
        if (open) {
            setShouldOpen(true)
        }
    }, [open])

    return (
        <Dialog open={shouldOpen}>
            <DialogContent
                className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-lg px-6 py-8 text-center space-y-6 border"
                showCloseButton={false}
            >

                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold tracking-tight">
                        Conectar ao WhatsApp
                    </DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">
                            Verificando conexão...
                        </p>
                    </div>
                ) : (
                    <>
                        <InstanceQRCode />

                        <div className="pt-2">
                            <Button
                                variant="ghost"
                                className="text-sm text-muted-foreground underline hover:text-foreground transition"
                                onClick={() => router.push("/dashboard")}
                            >
                                Voltar para a página inicial
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
