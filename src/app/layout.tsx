import type { Metadata } from 'next'
import './globals.css'
import { ReduxProvider } from '@/store/ReduxProvider'

export const metadata: Metadata = {
  title: "Run2Sell",
  description: "Criado por NeedAi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
