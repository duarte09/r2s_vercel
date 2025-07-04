import { PainelComercialHeader } from "@/components/pageComponents/painel-comercial/PainelComercialHeader";
import { SalesInsights } from "@/components/pageComponents/painel-comercial/SalesInsights";

export default function PainelComercialPage() {
  return (
    <div className="w-full space-y-6 p-4 md:p-8">
      <PainelComercialHeader />
      <SalesInsights />
    </div>
  )
}   