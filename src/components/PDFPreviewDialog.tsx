import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { useAppStore } from '@/store/useAppStore'
import { QuotationPDF } from './QuotationPDF'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, FileText, Loader2, Eye } from 'lucide-react'

export function PDFPreviewDialog() {
  const client = useAppStore((s) => s.client)
  const items = useAppStore((s) => s.items)
  const quotationNumber = useAppStore((s) => s.quotationNumber)
  const notes = useAppStore((s) => s.notes)
  const taxRate = useAppStore((s) => s.taxRate)
  const getSubtotal = useAppStore((s) => s.getSubtotal)
  const getTax = useAppStore((s) => s.getTax)
  const getTotal = useAppStore((s) => s.getTotal)

  const [generating, setGenerating] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const subtotal = getSubtotal()
  const tax = getTax()
  const total = getTotal()

  const generatePreview = async () => {
    setGenerating(true)
    try {
      const blob = await pdf(
        <QuotationPDF
          client={client}
          items={items}
          quotationNumber={quotationNumber}
          notes={notes}
          taxRate={taxRate}
        />
      ).toBlob()
      const url = URL.createObjectURL(blob)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(url)
    } finally {
      setGenerating(false)
    }
  }

  const handleDownload = async () => {
    setGenerating(true)
    try {
      const blob = await pdf(
        <QuotationPDF
          client={client}
          items={items}
          quotationNumber={quotationNumber}
          notes={notes}
          taxRate={taxRate}
        />
      ).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${quotationNumber}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setGenerating(false)
    }
  }

  const handleOpenChange = (v: boolean) => {
    setOpen(v)
    if (v) {
      generatePreview()
    } else if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(n)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button
          disabled={items.length === 0}
          className="gap-2 bg-[#1a1612] text-[#d4a574] hover:bg-[#2a2520] hover:text-[#e8c49a] transition-all duration-300"
        >
          <FileText className="h-4 w-4" />
          Generar PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 gap-0 overflow-hidden border-[#d6cfc5]">
        {/* ── Header ── */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#e8e2da] bg-gradient-to-r from-[#faf8f5] to-white">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="font-serif text-xl tracking-wide text-[#1a1612]">
                Vista Previa del Documento
              </DialogTitle>
              <DialogDescription className="text-xs tracking-[0.15em] uppercase text-[#b87333] mt-1">
                {quotationNumber}
              </DialogDescription>
            </div>
          </div>

          {/* ── Quick summary strip ── */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#e8e2da]">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#6b635a]">
                Cliente
              </p>
              <p className="text-sm font-medium text-[#1a1612] truncate">
                {client.name || client.company || '—'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#6b635a]">
                Subtotal
              </p>
              <p className="text-sm text-[#1a1612]">{fmtCurrency(subtotal)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#6b635a]">
                IVA
              </p>
              <p className="text-sm text-[#1a1612]">{fmtCurrency(tax)}</p>
            </div>
            <div className="text-right pl-4 border-l-2 border-[#b87333]">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#b87333]">
                Total
              </p>
              <p className="text-lg font-bold text-[#1a1612]">
                {fmtCurrency(total)}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* ── Preview Area ── */}
        <div className="flex-1 overflow-hidden bg-[#e8e2da] p-6 relative">
          {generating && !previewUrl ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#faf8f5]/80">
              <Loader2 className="h-8 w-8 animate-spin text-[#b87333]" />
              <p className="text-sm text-[#6b635a] tracking-wide">
                Generando documento...
              </p>
            </div>
          ) : previewUrl ? (
            <iframe
              src={previewUrl}
              className="w-full h-full rounded shadow-2xl bg-white"
              title="PDF Preview"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Eye className="h-10 w-10 text-[#d6cfc5]" />
              <p className="text-sm text-[#6b635a]">
                Cargando vista previa...
              </p>
            </div>
          )}
        </div>

        {/* ── Actions ── */}
        <div className="px-6 py-4 border-t border-[#e8e2da] bg-gradient-to-r from-[#faf8f5] to-white flex items-center justify-between">
          <button
            onClick={generatePreview}
            disabled={generating}
            className="text-sm text-[#b87333] hover:text-[#8b5a27] underline underline-offset-4 decoration-[#b87333]/30 hover:decoration-[#8b5a27] transition-colors disabled:opacity-50"
          >
            Actualizar vista previa
          </button>
          <Button
            onClick={handleDownload}
            disabled={generating}
            className="gap-2 bg-[#b87333] text-white hover:bg-[#8b5a27] transition-all duration-300 shadow-lg shadow-[#b87333]/20"
          >
            {generating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Descargar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
