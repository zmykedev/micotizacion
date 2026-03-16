import { useAppStore } from '@/store/useAppStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Calculator } from 'lucide-react'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount)
}

export function QuotationSummary() {
  const quotationNumber = useAppStore((s) => s.quotationNumber)
  const notes = useAppStore((s) => s.notes)
  const taxRate = useAppStore((s) => s.taxRate)
  const setQuotationNumber = useAppStore((s) => s.setQuotationNumber)
  const setNotes = useAppStore((s) => s.setNotes)
  const setTaxRate = useAppStore((s) => s.setTaxRate)
  const getSubtotal = useAppStore((s) => s.getSubtotal)
  const getTax = useAppStore((s) => s.getTax)
  const getTotal = useAppStore((s) => s.getTotal)

  const subtotal = getSubtotal()
  const tax = getTax()
  const total = getTotal()

  return (
    <Card className="border-[#e0d9cf] shadow-sm bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-[#b87333]/10">
            <Calculator className="h-4 w-4 text-[#b87333]" />
          </div>
          <span className="tracking-wide text-[#1a1612]">Resumen</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="quot-number" className="text-xs tracking-wide text-[#6b635a] uppercase">
              Nº Cotización
            </Label>
            <Input
              id="quot-number"
              value={quotationNumber}
              onChange={(e) => setQuotationNumber(e.target.value)}
              className="border-[#e0d9cf] focus-visible:ring-[#b87333]/30 focus-visible:border-[#b87333]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tax-rate" className="text-xs tracking-wide text-[#6b635a] uppercase">
              IVA (%)
            </Label>
            <Input
              id="tax-rate"
              type="number"
              min="0"
              max="100"
              step="1"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="border-[#e0d9cf] focus-visible:ring-[#b87333]/30 focus-visible:border-[#b87333]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes" className="text-xs tracking-wide text-[#6b635a] uppercase">
            Notas y Condiciones
          </Label>
          <Textarea
            id="notes"
            placeholder="Vigencia, forma de pago, condiciones comerciales..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="border-[#e0d9cf] focus-visible:ring-[#b87333]/30 focus-visible:border-[#b87333] resize-none"
          />
        </div>

        <Separator className="bg-[#e0d9cf]" />

        {/* ── Totals ── */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#6b635a]">Subtotal</span>
            <span className="text-sm text-[#1a1612]">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#6b635a]">IVA ({taxRate}%)</span>
            <span className="text-sm text-[#1a1612]">{formatCurrency(tax)}</span>
          </div>
          <div className="h-px bg-[#e0d9cf]" />
          <div className="flex justify-between items-center bg-[#1a1612] text-white rounded-md px-4 py-3">
            <span
              className="text-lg font-semibold tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Total
            </span>
            <span
              className="text-xl font-bold text-[#d4a574]"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
