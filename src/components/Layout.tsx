import type { ReactNode } from 'react'
import { FileText } from 'lucide-react'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f2ee]">
      {/* ── Header ── */}
      <header className="relative border-b border-[#e0d9cf] bg-[#1a1612] text-white overflow-hidden">
        {/* Copper accent strip */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b87333] via-[#d4a574] to-[#b87333]" />

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded border border-[#b87333]/40 bg-[#b87333]/10">
              <FileText className="h-5 w-5 text-[#d4a574]" />
            </div>
            <div>
              <h1
                className="text-lg font-bold tracking-[0.04em]"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Mi Cotización
              </h1>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#b87333]">
                Generador de Documentos
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#6b635a]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#b87333]/60" />
            <span className="text-[#d4a574]/70 tracking-wide">
              {new Date().toLocaleDateString('es-MX', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#e0d9cf] mt-8">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="w-8 h-[2px] bg-[#b87333]/40" />
          <p className="text-[10px] tracking-[0.15em] text-[#6b635a] uppercase">
            Mi Cotización · Documento Comercial
          </p>
          <div className="w-8 h-[2px] bg-[#b87333]/40" />
        </div>
      </footer>
    </div>
  )
}
