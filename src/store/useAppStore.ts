import { create } from 'zustand'

export interface QuotationItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export interface ClientInfo {
  name: string
  email: string
  phone: string
  company: string
}

export interface Draft {
  id: string
  name: string
  client: ClientInfo
  items: QuotationItem[]
  quotationNumber: string
  notes: string
  taxRate: number
  createdAt: string
  updatedAt: string
}

interface AppState {
  // Client
  client: ClientInfo
  setClient: (client: Partial<ClientInfo>) => void
  resetClient: () => void

  // Items
  items: QuotationItem[]
  addItem: (item: Omit<QuotationItem, 'id'>) => void
  updateItem: (id: string, item: Partial<QuotationItem>) => void
  removeItem: (id: string) => void
  clearItems: () => void

  // Quotation metadata
  quotationNumber: string
  notes: string
  taxRate: number
  setQuotationNumber: (num: string) => void
  setNotes: (notes: string) => void
  setTaxRate: (rate: number) => void

  // Computed helpers
  getSubtotal: () => number
  getTax: () => number
  getTotal: () => number

  // Drafts
  drafts: Draft[]
  activeDraftId: string | null
  saveDraft: (name?: string) => void
  loadDraft: (id: string) => void
  deleteDraft: (id: string) => void
  duplicateDraft: (id: string) => void
  loadDraftsFromStorage: () => void

  // Reset
  resetAll: () => void
}

const emptyClient: ClientInfo = {
  name: '',
  email: '',
  phone: '',
  company: '',
}

const DRAFTS_KEY = 'mi-cotizacion-drafts'

function persistDrafts(drafts: Draft[]) {
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts))
}

function readDrafts(): Draft[] {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

let itemCounter = 0

export const useAppStore = create<AppState>((set, get) => ({
  // Client
  client: { ...emptyClient },
  setClient: (partial) =>
    set((state) => ({ client: { ...state.client, ...partial } })),
  resetClient: () => set({ client: { ...emptyClient } }),

  // Items
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, { ...item, id: `item-${++itemCounter}` }],
    })),
  updateItem: (id, partial) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...partial } : item
      ),
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearItems: () => set({ items: [] }),

  // Metadata
  quotationNumber: `COT-${String(Date.now()).slice(-6)}`,
  notes: '',
  taxRate: 16,
  setQuotationNumber: (quotationNumber) => set({ quotationNumber }),
  setNotes: (notes) => set({ notes }),
  setTaxRate: (taxRate) => set({ taxRate }),

  // Computed
  getSubtotal: () =>
    get().items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
  getTax: () => get().getSubtotal() * (get().taxRate / 100),
  getTotal: () => get().getSubtotal() + get().getTax(),

  // Drafts
  drafts: [],
  activeDraftId: null,

  loadDraftsFromStorage: () => {
    set({ drafts: readDrafts() })
  },

  saveDraft: (name?: string) => {
    const state = get()
    const now = new Date().toISOString()
    const existingId = state.activeDraftId
    const draftName =
      name ||
      (state.client.name
        ? `${state.client.company || state.client.name} — ${state.quotationNumber}`
        : state.quotationNumber)

    if (existingId) {
      const updated = state.drafts.map((d) =>
        d.id === existingId
          ? {
              ...d,
              name: draftName,
              client: { ...state.client },
              items: [...state.items],
              quotationNumber: state.quotationNumber,
              notes: state.notes,
              taxRate: state.taxRate,
              updatedAt: now,
            }
          : d
      )
      persistDrafts(updated)
      set({ drafts: updated })
    } else {
      const newDraft: Draft = {
        id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: draftName,
        client: { ...state.client },
        items: [...state.items],
        quotationNumber: state.quotationNumber,
        notes: state.notes,
        taxRate: state.taxRate,
        createdAt: now,
        updatedAt: now,
      }
      const updated = [newDraft, ...state.drafts]
      persistDrafts(updated)
      set({ drafts: updated, activeDraftId: newDraft.id })
    }
  },

  loadDraft: (id) => {
    const draft = get().drafts.find((d) => d.id === id)
    if (!draft) return
    set({
      client: { ...draft.client },
      items: [...draft.items],
      quotationNumber: draft.quotationNumber,
      notes: draft.notes,
      taxRate: draft.taxRate,
      activeDraftId: draft.id,
    })
  },

  deleteDraft: (id) => {
    const updated = get().drafts.filter((d) => d.id !== id)
    persistDrafts(updated)
    set((state) => ({
      drafts: updated,
      activeDraftId: state.activeDraftId === id ? null : state.activeDraftId,
    }))
  },

  duplicateDraft: (id) => {
    const draft = get().drafts.find((d) => d.id === id)
    if (!draft) return
    const now = new Date().toISOString()
    const copy: Draft = {
      ...draft,
      id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: `${draft.name} (copia)`,
      quotationNumber: `COT-${String(Date.now()).slice(-6)}`,
      createdAt: now,
      updatedAt: now,
    }
    const updated = [copy, ...get().drafts]
    persistDrafts(updated)
    set({ drafts: updated })
  },

  // Reset
  resetAll: () =>
    set({
      client: { ...emptyClient },
      items: [],
      notes: '',
      quotationNumber: `COT-${String(Date.now()).slice(-6)}`,
      activeDraftId: null,
    }),
}))
