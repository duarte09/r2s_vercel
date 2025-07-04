"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCreateNewInstanceMutation, useGetQrCodeForInstanceQuery } from "@/store/services/evolutionApi"
import { useAppDispatch } from "@/store"
import { setWhatsAppConnection } from "@/store/slices/whatsappSlice"
import QRCode from "qrcode"

export function InstanceQRCode() {
  const [instanceName, setInstanceName] = useState("")
  const [submittedName, setSubmittedName] = useState("")
  const [qrImage, setQrImage] = useState<string | null>(null)

  const dispatch = useAppDispatch()
  const [createInstance, { isLoading: isCreating }] = useCreateNewInstanceMutation()
  const { data: qrData, isFetching: isFetchingQr } = useGetQrCodeForInstanceQuery(submittedName, {
    skip: !submittedName,
  })

  const handleCreateInstance = async () => {
    if (!instanceName.trim()) return

    try {
      await createInstance({ instanceName }).unwrap()
      setSubmittedName(instanceName)

      // Salva no Redux
      dispatch(
        setWhatsAppConnection({
          schemaName: instanceName,
          instanceId: instanceName,
          connected: false,
          qrCodeData: null,
          responsibleName: null,
          phone: null,
        })
      )
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.message ||
        (typeof error === "object" ? JSON.stringify(error) : String(error))

      console.error("Erro ao criar instância:", message)
    }
  }

  useEffect(() => {
    if (qrData?.code) {
      QRCode.toDataURL(qrData.code)
        .then((url) => setQrImage(url))
        .catch((err) => {
          console.error("Erro ao gerar QR Code:", err)
          setQrImage(null)
        })
    }
  }, [qrData?.code])

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">
        <Input
          placeholder="Nome da instância"
          value={instanceName}
          onChange={(e) => setInstanceName(e.target.value)}
        />
        <Button onClick={handleCreateInstance} disabled={isCreating || !instanceName}>
          {isCreating ? "Criando..." : "Criar instância"}
        </Button>
      </div>

      {isFetchingQr && <p className="text-muted-foreground text-sm">Carregando QR Code...</p>}

      {qrData && (
        <div className="text-center space-y-2">
          <p className="font-semibold">Escaneie o QR Code abaixo:</p>

          {qrImage ? (
            <img
              src={qrImage}
              alt="QR Code"
              className="w-64 h-64 mx-auto rounded shadow"
            />
          ) : (
            <div className="w-64 h-64 mx-auto bg-muted flex items-center justify-center rounded">
              <span className="text-sm text-muted-foreground">QR Code não disponível</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
