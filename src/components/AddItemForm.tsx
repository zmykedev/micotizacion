import { useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export function AddItemForm() {
  const addItem = useAppStore((s) => s.addItem)
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unitPrice, setUnitPrice] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const qty = Number(quantity)
    const price = Number(unitPrice)
    if (!description.trim() || qty <= 0 || price <= 0) return

    addItem({ description: description.trim(), quantity: qty, unitPrice: price })
    setDescription('')
    setQuantity('')
    setUnitPrice('')
  }

  return (
    <Card className="border-[#e0d9cf] shadow-sm bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-[#b87333]/10">
            <Plus className="h-4 w-4 text-[#b87333]" />
          </div>
          <span className="tracking-wide text-[#1a1612]">Agregar Concepto</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="item-desc" className="text-xs tracking-wide text-[#6b635a] uppercase">
              Descripción
            </Label>
            <Input
              id="item-desc"
              placeholder="Servicio o producto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-[#e0d9cf] focus-visible:ring-[#b87333]/30 focus-visible:border-[#b87333]"
            />
          </div>
          <div className="w-full space-y-1.5 sm:w-28">
            <Label htmlFor="item-qty" className="text-xs tracking-wide text-[#6b635a] uppercase">
              Cantidad
            </Label>
            <Input
              id="item-qty"
              type="number"
              min="1"
              step="1"
              placeholder="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border-[#e0d9cf] focus-visible:ring-[#b87333]/30 focus-visible:border-[#b87333]"
            />
          </div>
          <div className="w-full space-y-1.5 sm:w-36">
            <Label htmlFor="item-price" className="text-xs tracking-wide text-[#6b635a] uppercase">
              Precio Unitario
            </Label>
            <Input
              id="item-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className="border-[#e0d9cf] focus-visible:ring-[#b87333]/30 focus-visible:border-[#b87333]"
            />
          </div>
          <Button
            type="submit"
            className="gap-2 bg-[#b87333] hover:bg-[#8b5a27] text-white shadow-sm transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
            Agregar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
