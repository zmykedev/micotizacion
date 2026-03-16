import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddItemForm } from './AddItemForm'
import { useAppStore } from '@/store/useAppStore'

beforeEach(() => {
  useAppStore.getState().resetAll()
  useAppStore.setState({ items: [] })
})

describe('AddItemForm', () => {
  it('renders all form fields', () => {
    render(<AddItemForm />)
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cantidad/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/precio unitario/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument()
  })

  it('adds an item when submitting valid data', async () => {
    const user = userEvent.setup()
    render(<AddItemForm />)

    await user.type(screen.getByLabelText(/descripción/i), 'Diseño web')
    await user.type(screen.getByLabelText(/cantidad/i), '3')
    await user.type(screen.getByLabelText(/precio unitario/i), '1500')
    await user.click(screen.getByRole('button', { name: /agregar/i }))

    const items = useAppStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0].description).toBe('Diseño web')
    expect(items[0].quantity).toBe(3)
    expect(items[0].unitPrice).toBe(1500)
  })

  it('clears form fields after successful submission', async () => {
    const user = userEvent.setup()
    render(<AddItemForm />)

    const descInput = screen.getByLabelText(/descripción/i)
    const qtyInput = screen.getByLabelText(/cantidad/i)
    const priceInput = screen.getByLabelText(/precio unitario/i)

    await user.type(descInput, 'Servicio')
    await user.type(qtyInput, '1')
    await user.type(priceInput, '100')
    await user.click(screen.getByRole('button', { name: /agregar/i }))

    expect(descInput).toHaveValue('')
    expect(qtyInput).toHaveValue(null)
    expect(priceInput).toHaveValue(null)
  })

  it('does not add item with empty description', async () => {
    const user = userEvent.setup()
    render(<AddItemForm />)

    await user.type(screen.getByLabelText(/cantidad/i), '1')
    await user.type(screen.getByLabelText(/precio unitario/i), '100')
    await user.click(screen.getByRole('button', { name: /agregar/i }))

    expect(useAppStore.getState().items).toHaveLength(0)
  })
})
