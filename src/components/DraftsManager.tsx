import { useEffect, useState } from 'react'
import { useAppStore, type Draft } from '@/store/useAppStore'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Archive,
  Clock,
  Trash2,
  Copy,
  FolderOpen,
  FileText,
  ChevronRight,
} from 'lucide-react'

function timeAgo(iso: string) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return 'hace un momento'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `hace ${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `hace ${hours}h`
  const days = Math.floor(hours / 24)
  return `hace ${days}d`
}

function fmtCurrency(n: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(n)
}

function draftTotal(draft: Draft) {
  const sub = draft.items.reduce(
    (s, i) => s + i.quantity * i.unitPrice,
    0
  )
  return sub + sub * (draft.taxRate / 100)
}

function DraftCard({
  draft,
  isActive,
  onLoad,
  onDelete,
  onDuplicate,
}: {
  draft: Draft
  isActive: boolean
  onLoad: () => void
  onDelete: () => void
  onDuplicate: () => void
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div
      className={`
        group relative rounded-lg border p-4 transition-all duration-300
        hover:shadow-md hover:border-[#b87333]/40
        ${isActive
          ? 'border-[#b87333] bg-[#faf8f5] shadow-sm'
          : 'border-[#e8e2da] bg-white'
        }
      `}
    >
      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-0 left-0 w-1 h-full bg-[#b87333] rounded-l-lg" />
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4 w-4 text-[#b87333] shrink-0" />
            <h3 className="text-sm font-medium text-[#1a1612] truncate">
              {draft.name}
            </h3>
            {isActive && (
              <Badge
                variant="secondary"
                className="text-[10px] bg-[#b87333]/10 text-[#b87333] border-0 shrink-0"
              >
                Activo
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-[#6b635a] mt-2">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo(draft.updatedAt)}
            </span>
            <span className="text-[#d6cfc5]">·</span>
            <span>
              {draft.items.length}{' '}
              {draft.items.length === 1 ? 'concepto' : 'conceptos'}
            </span>
            {draft.client.name && (
              <>
                <span className="text-[#d6cfc5]">·</span>
                <span className="truncate max-w-[120px]">
                  {draft.client.name}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="text-sm font-semibold text-[#1a1612]">
            {fmtCurrency(draftTotal(draft))}
          </p>
          <p className="text-[10px] text-[#6b635a] uppercase tracking-wider mt-0.5">
            {draft.quotationNumber}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-[#e8e2da]/60">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLoad}
          className="h-7 gap-1.5 text-xs text-[#b87333] hover:text-[#8b5a27] hover:bg-[#b87333]/5"
        >
          <FolderOpen className="h-3.5 w-3.5" />
          Cargar
          <ChevronRight className="h-3 w-3 opacity-50" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDuplicate}
          className="h-7 gap-1.5 text-xs text-[#6b635a] hover:text-[#1a1612] hover:bg-[#f0ece6]"
        >
          <Copy className="h-3.5 w-3.5" />
          Duplicar
        </Button>
        <div className="flex-1" />
        {confirmDelete ? (
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-destructive mr-1">
              ¿Eliminar?
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirmDelete(false)}
              className="h-6 text-[10px] text-[#6b635a]"
            >
              No
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-6 text-[10px] text-destructive hover:text-destructive"
            >
              Sí
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setConfirmDelete(true)}
            className="h-7 w-7 text-[#d6cfc5] hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  )
}

export function DraftsManager() {
  const drafts = useAppStore((s) => s.drafts)
  const activeDraftId = useAppStore((s) => s.activeDraftId)
  const loadDraft = useAppStore((s) => s.loadDraft)
  const deleteDraft = useAppStore((s) => s.deleteDraft)
  const duplicateDraft = useAppStore((s) => s.duplicateDraft)
  const loadDraftsFromStorage = useAppStore((s) => s.loadDraftsFromStorage)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    loadDraftsFromStorage()
  }, [loadDraftsFromStorage])

  const handleLoad = (id: string) => {
    loadDraft(id)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 border-[#d6cfc5] text-[#6b635a] hover:border-[#b87333] hover:text-[#b87333] transition-all duration-300"
        >
          <Archive className="h-4 w-4" />
          Borradores
          {drafts.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 min-w-[20px] text-[10px] bg-[#b87333]/10 text-[#b87333] border-0"
            >
              {drafts.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[80vh] flex flex-col p-0 gap-0 border-[#d6cfc5]">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#e8e2da] bg-gradient-to-r from-[#faf8f5] to-white">
          <DialogTitle className="font-serif text-xl tracking-wide text-[#1a1612]">
            Borradores
          </DialogTitle>
          <DialogDescription className="text-xs tracking-[0.15em] uppercase text-[#b87333]">
            {drafts.length}{' '}
            {drafts.length === 1
              ? 'cotización guardada'
              : 'cotizaciones guardadas'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {drafts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#f0ece6] flex items-center justify-center mb-4">
                <Archive className="h-7 w-7 text-[#d6cfc5]" />
              </div>
              <p className="text-sm font-medium text-[#1a1612]">
                Sin borradores
              </p>
              <p className="text-xs text-[#6b635a] mt-1 max-w-[200px]">
                Guarda tu cotización actual para acceder a ella después
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {drafts.map((draft, i) => (
                <div key={draft.id}>
                  <DraftCard
                    draft={draft}
                    isActive={draft.id === activeDraftId}
                    onLoad={() => handleLoad(draft.id)}
                    onDelete={() => deleteDraft(draft.id)}
                    onDuplicate={() => duplicateDraft(draft.id)}
                  />
                  {i < drafts.length - 1 && <Separator className="my-3 bg-[#e8e2da]/50" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
