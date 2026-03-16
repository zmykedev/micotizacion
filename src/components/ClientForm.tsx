import { useAppStore } from '@/store/useAppStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from 'lucide-react'

export function ClientForm() {
  const client = useAppStore((s) => s.client)
  const setClient = useAppStore((s) => s.setClient)

  return (
    <Card className="border-[#e0d9cf] shadow-sm bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-[#b87333]/10">
            <User className="h-4 w-4 text-[#b87333]" />
          </div>
          <span className="tracking-wide text-[#1a1612]">Datos del Cliente</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="client-name" className="text-xs tracking-wide text-[#6b635a] uppercase">
              Nombre
            </Label>
            <Input
              id="client-name"
              placeholder="Nombre completo"
              value={client.name}
              onChange={(e) => setClient({ name: e.target.value })}
              className="border-[#e0d9cf] focus-visible:ring-[#b87333]/30 focus-visible:border-[#b87333]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client-company" className="text-xs tracking-wide text-[#6b635a] uppercase">
              Empresa
            </Label>
            <Input
              id="client-company"
              placeholder="Nombre de la empresa"
              value={client.company}
              onChange={(e) => setClient({ company: e.target.value })}
              className="border-[#e0d9cf] focus-visible:ring-[#b87333]/30 focus-visible:border-[#b87333]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client-email" className="text-xs tracking-wide text-[#6b635a] uppercase">
              Email
            </Label>
            <Input
              id="client-email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={client.email}
              onChange={(e) => setClient({ email: e.target.value })}
              className="border-[#e0d9cf] focus-visible:ring-[#b87333]/30 focus-visible:border-[#b87333]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client-phone" className="text-xs tracking-wide text-[#6b635a] uppercase">
              Teléfono
            </Label>
            <Input
              id="client-phone"
              type="tel"
              placeholder="+52 555 123 4567"
              value={client.phone}
              onChange={(e) => setClient({ phone: e.target.value })}
              className="border-[#e0d9cf] focus-visible:ring-[#b87333]/30 focus-visible:border-[#b87333]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
