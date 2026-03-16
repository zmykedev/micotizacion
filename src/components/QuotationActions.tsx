import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import { PDFPreviewDialog } from './PDFPreviewDialog'
import { DraftsManager } from './DraftsManager'
import { RotateCcw, Save, Check } from 'lucide-react'

export function QuotationActions() {
  const resetAll = useAppStore((s) => s.resetAll)
  const saveDraft = useAppStore((s) => s.saveDraft)
  const activeDraftId = useAppStore((s) => s.activeDraftId)
  const items = useAppStore((s) => s.items)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    saveDraft()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        onClick={handleSave}
        className={`gap-2 transition-all duration-300 ${
          saved
            ? 'border-emerald-400 text-emerald-600 bg-emerald-50'
            : 'border-[#d6cfc5] text-[#6b635a] hover:border-[#b87333] hover:text-[#b87333]'
        }`}
      >
        {saved ? (
          <>
            <Check className="h-4 w-4" />
            Guardado
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            {activeDraftId ? 'Guardar' : 'Guardar borrador'}
          </>
        )}
      </Button>

      <DraftsManager />

      <PDFPreviewDialog />

      <Button
        variant="ghost"
        onClick={resetAll}
        className="gap-2 text-[#6b635a] hover:text-destructive"
      >
        <RotateCcw className="h-4 w-4" />
        Nueva
      </Button>
    </div>
  )
}
