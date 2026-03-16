import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { Layout } from '@/components/Layout'
import { ClientForm } from '@/components/ClientForm'
import { AddItemForm } from '@/components/AddItemForm'
import { ItemsTable } from '@/components/ItemsTable'
import { QuotationSummary } from '@/components/QuotationSummary'
import { QuotationActions } from '@/components/QuotationActions'

function App() {
  const loadDraftsFromStorage = useAppStore((s) => s.loadDraftsFromStorage)

  useEffect(() => {
    loadDraftsFromStorage()
  }, [loadDraftsFromStorage])

  return (
    <Layout>
      <div className="space-y-6">
        {/* ── Action bar ── */}
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-2xl font-bold text-[#1a1612] tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Nueva Cotización
            </h2>
            <p className="text-sm text-[#6b635a] mt-0.5">
              Completa los datos para generar tu documento
            </p>
          </div>
          <QuotationActions />
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d6cfc5] to-transparent" />

        {/* ── Forms ── */}
        <ClientForm />
        <AddItemForm />
        <ItemsTable />
        <QuotationSummary />
      </div>
    </Layout>
  )
}

export default App
