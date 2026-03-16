import { useAppStore } from '@/store/useAppStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { List, Trash2 } from 'lucide-react'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount)
}

export function ItemsTable() {
  const items = useAppStore((s) => s.items)
  const removeItem = useAppStore((s) => s.removeItem)

  if (items.length === 0) {
    return (
      <Card className="border-[#e0d9cf] shadow-sm bg-white">
        <CardContent className="py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-[#f0ece6] flex items-center justify-center mx-auto mb-4">
            <List className="h-6 w-6 text-[#d6cfc5]" />
          </div>
          <p className="text-sm font-medium text-[#1a1612]">Sin conceptos</p>
          <p className="text-xs text-[#6b635a] mt-1">
            Usa el formulario de arriba para agregar servicios o productos
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-[#e0d9cf] shadow-sm bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-[#b87333]/10">
            <List className="h-4 w-4 text-[#b87333]" />
          </div>
          <span className="tracking-wide text-[#1a1612]">Conceptos</span>
          <Badge
            variant="secondary"
            className="ml-auto text-[10px] bg-[#b87333]/10 text-[#b87333] border-0"
          >
            {items.length} {items.length === 1 ? 'concepto' : 'conceptos'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#e0d9cf] hover:bg-transparent">
              <TableHead className="w-[50%] text-[10px] uppercase tracking-[0.15em] text-[#6b635a]">
                Descripción
              </TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-[0.15em] text-[#6b635a]">
                Cantidad
              </TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-[0.15em] text-[#6b635a]">
                P. Unitario
              </TableHead>
              <TableHead className="text-right text-[10px] uppercase tracking-[0.15em] text-[#6b635a]">
                Subtotal
              </TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="border-[#e0d9cf]/60 group">
                <TableCell className="font-medium text-[#1a1612]">
                  {item.description}
                </TableCell>
                <TableCell className="text-right text-[#6b635a]">
                  {item.quantity}
                </TableCell>
                <TableCell className="text-right text-[#6b635a]">
                  {formatCurrency(item.unitPrice)}
                </TableCell>
                <TableCell className="text-right font-semibold text-[#1a1612]">
                  {formatCurrency(item.quantity * item.unitPrice)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Eliminar ${item.description}`}
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-[#d6cfc5] hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
