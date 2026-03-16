import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from './useAppStore'

beforeEach(() => {
  useAppStore.getState().resetAll()
  useAppStore.setState({ items: [], drafts: [] })
})

describe('useAppStore - Items', () => {
  it('adds an item', () => {
    useAppStore.getState().addItem({
      description: 'Servicio web',
      quantity: 2,
      unitPrice: 500,
    })
    const items = useAppStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0].description).toBe('Servicio web')
    expect(items[0].quantity).toBe(2)
    expect(items[0].unitPrice).toBe(500)
  })

  it('removes an item', () => {
    useAppStore.getState().addItem({
      description: 'Item A',
      quantity: 1,
      unitPrice: 100,
    })
    const id = useAppStore.getState().items[0].id
    useAppStore.getState().removeItem(id)
    expect(useAppStore.getState().items).toHaveLength(0)
  })

  it('updates an item', () => {
    useAppStore.getState().addItem({
      description: 'Original',
      quantity: 1,
      unitPrice: 100,
    })
    const id = useAppStore.getState().items[0].id
    useAppStore.getState().updateItem(id, { description: 'Updated', unitPrice: 200 })
    const item = useAppStore.getState().items[0]
    expect(item.description).toBe('Updated')
    expect(item.unitPrice).toBe(200)
    expect(item.quantity).toBe(1)
  })

  it('clears all items', () => {
    useAppStore.getState().addItem({ description: 'A', quantity: 1, unitPrice: 10 })
    useAppStore.getState().addItem({ description: 'B', quantity: 2, unitPrice: 20 })
    useAppStore.getState().clearItems()
    expect(useAppStore.getState().items).toHaveLength(0)
  })
})

describe('useAppStore - Client', () => {
  it('sets client info', () => {
    useAppStore.getState().setClient({ name: 'Juan', company: 'ACME' })
    const client = useAppStore.getState().client
    expect(client.name).toBe('Juan')
    expect(client.company).toBe('ACME')
    expect(client.email).toBe('')
  })

  it('resets client info', () => {
    useAppStore.getState().setClient({ name: 'Juan', email: 'juan@test.com' })
    useAppStore.getState().resetClient()
    const client = useAppStore.getState().client
    expect(client.name).toBe('')
    expect(client.email).toBe('')
  })
})

describe('useAppStore - Computed values', () => {
  it('calculates subtotal', () => {
    useAppStore.getState().addItem({ description: 'A', quantity: 2, unitPrice: 100 })
    useAppStore.getState().addItem({ description: 'B', quantity: 3, unitPrice: 50 })
    expect(useAppStore.getState().getSubtotal()).toBe(350)
  })

  it('calculates tax with default 16% rate', () => {
    useAppStore.getState().addItem({ description: 'A', quantity: 1, unitPrice: 1000 })
    expect(useAppStore.getState().getTax()).toBe(160)
  })

  it('calculates total (subtotal + tax)', () => {
    useAppStore.getState().addItem({ description: 'A', quantity: 1, unitPrice: 1000 })
    expect(useAppStore.getState().getTotal()).toBe(1160)
  })

  it('uses custom tax rate', () => {
    useAppStore.getState().setTaxRate(10)
    useAppStore.getState().addItem({ description: 'A', quantity: 1, unitPrice: 200 })
    expect(useAppStore.getState().getTax()).toBe(20)
    expect(useAppStore.getState().getTotal()).toBe(220)
  })

  it('returns 0 when no items', () => {
    expect(useAppStore.getState().getSubtotal()).toBe(0)
    expect(useAppStore.getState().getTax()).toBe(0)
    expect(useAppStore.getState().getTotal()).toBe(0)
  })
})

describe('useAppStore - Metadata', () => {
  it('sets quotation number', () => {
    useAppStore.getState().setQuotationNumber('COT-001')
    expect(useAppStore.getState().quotationNumber).toBe('COT-001')
  })

  it('sets notes', () => {
    useAppStore.getState().setNotes('Pago a 30 días')
    expect(useAppStore.getState().notes).toBe('Pago a 30 días')
  })

  it('sets tax rate', () => {
    useAppStore.getState().setTaxRate(8)
    expect(useAppStore.getState().taxRate).toBe(8)
  })
})

describe('useAppStore - resetAll', () => {
  it('resets client, items, notes, and activeDraftId', () => {
    useAppStore.getState().setClient({ name: 'Test' })
    useAppStore.getState().addItem({ description: 'X', quantity: 1, unitPrice: 50 })
    useAppStore.getState().setNotes('note')
    useAppStore.getState().resetAll()

    const state = useAppStore.getState()
    expect(state.client.name).toBe('')
    expect(state.items).toHaveLength(0)
    expect(state.notes).toBe('')
    expect(state.activeDraftId).toBeNull()
  })
})
