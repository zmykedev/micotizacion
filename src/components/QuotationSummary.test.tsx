import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QuotationSummary } from './QuotationSummary'
import { useAppStore } from '@/store/useAppStore'

beforeEach(() => {
  useAppStore.getState().resetAll()
  useAppStore.setState({ items: [] })
})

describe('QuotationSummary', () => {
  it('renders the summary heading', () => {
    render(<QuotationSummary />)
    expect(screen.getByText('Resumen')).toBeInTheDocument()
  })

  it('displays $0.00 values when no items exist', () => {
    render(<QuotationSummary />)
    const zeroValues = screen.getAllByText('$0.00')
    expect(zeroValues.length).toBeGreaterThanOrEqual(2)
  })

  it('renders quotation number input', () => {
    render(<QuotationSummary />)
    expect(screen.getByLabelText(/cotización/i)).toBeInTheDocument()
  })

  it('renders tax rate input with default value 16', () => {
    render(<QuotationSummary />)
    const taxInput = screen.getByLabelText(/iva/i)
    expect(taxInput).toHaveValue(16)
  })

  it('displays correct totals after adding items', () => {
    useAppStore.getState().addItem({
      description: 'Servicio',
      quantity: 2,
      unitPrice: 1000,
    })

    render(<QuotationSummary />)

    expect(screen.getByText('$2,000.00')).toBeInTheDocument()
    expect(screen.getByText('$320.00')).toBeInTheDocument()
    expect(screen.getByText('$2,320.00')).toBeInTheDocument()
  })
})
