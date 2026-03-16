import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import type { ClientInfo, QuotationItem } from '@/store/useAppStore'

/* ── Fonts ──────────────────────────────────────────────── */
Font.register({
  family: 'Cormorant',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQEl5fsA.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQWltfsA.ttf', fontWeight: 700 },
  ],
})

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf', fontWeight: 300 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZNhjQ.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZNhjQ.ttf', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZNhjQ.ttf', fontWeight: 700 },
  ],
})

/* ── Colors ─────────────────────────────────────────────── */
const C = {
  ink: '#1a1612',
  inkLight: '#6b635a',
  copper: '#b87333',
  copperLight: '#d4a574',
  cream: '#faf8f5',
  warmGray: '#f0ece6',
  rule: '#d6cfc5',
  white: '#ffffff',
}

/* ── Styles ─────────────────────────────────────────────── */
const s = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: C.ink,
    backgroundColor: C.white,
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 50,
  },

  /* header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  brand: {
    fontFamily: 'Cormorant',
    fontSize: 26,
    fontWeight: 700,
    color: C.ink,
    letterSpacing: 1.5,
  },
  brandSub: {
    fontFamily: 'Inter',
    fontSize: 7.5,
    color: C.inkLight,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  quotBadge: {
    backgroundColor: C.ink,
    color: C.white,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 8,
    fontWeight: 500,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  /* copper accent line */
  accentLine: {
    height: 2.5,
    backgroundColor: C.copper,
    marginTop: 12,
    marginBottom: 28,
  },

  /* info grid */
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  infoBlock: {
    width: '48%',
  },
  infoLabel: {
    fontSize: 7,
    fontWeight: 500,
    color: C.copper,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 9.5,
    lineHeight: 1.7,
    color: C.ink,
  },
  infoValueLight: {
    fontSize: 8.5,
    color: C.inkLight,
    lineHeight: 1.6,
  },

  /* table */
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: C.warmGray,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: C.rule,
    borderBottomWidth: 1,
    borderBottomColor: C.rule,
  },
  tableHeaderText: {
    fontSize: 7,
    fontWeight: 700,
    color: C.inkLight,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: C.rule,
  },
  tableRowAlt: {
    backgroundColor: C.cream,
  },
  colDesc: { width: '48%' },
  colQty: { width: '14%', textAlign: 'right' },
  colPrice: { width: '19%', textAlign: 'right' },
  colTotal: { width: '19%', textAlign: 'right' },
  cellText: {
    fontSize: 9,
    color: C.ink,
  },
  cellTextBold: {
    fontSize: 9,
    fontWeight: 500,
    color: C.ink,
  },

  /* totals */
  totalsContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalsBox: {
    width: 220,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  totalsLabel: {
    fontSize: 8.5,
    color: C.inkLight,
  },
  totalsValue: {
    fontSize: 9,
    fontWeight: 500,
    color: C.ink,
  },
  totalsDivider: {
    height: 0.5,
    backgroundColor: C.rule,
    marginHorizontal: 12,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: C.ink,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 4,
  },
  grandTotalLabel: {
    fontFamily: 'Cormorant',
    fontSize: 14,
    fontWeight: 600,
    color: C.white,
    letterSpacing: 0.5,
  },
  grandTotalValue: {
    fontFamily: 'Cormorant',
    fontSize: 14,
    fontWeight: 700,
    color: C.copperLight,
  },

  /* notes */
  notesContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: C.cream,
    borderLeftWidth: 3,
    borderLeftColor: C.copper,
  },
  notesTitle: {
    fontSize: 7,
    fontWeight: 500,
    color: C.copper,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  notesText: {
    fontSize: 8.5,
    color: C.inkLight,
    lineHeight: 1.6,
  },

  /* footer */
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: C.rule,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 7,
    color: C.inkLight,
    letterSpacing: 0.5,
  },
  footerAccent: {
    width: 20,
    height: 2,
    backgroundColor: C.copper,
  },
})

/* ── Helpers ────────────────────────────────────────────── */
function fmt(amount: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(amount)
}

function fmtDate(iso?: string) {
  const d = iso ? new Date(iso) : new Date()
  return d.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/* ── Component ──────────────────────────────────────────── */
interface QuotationPDFProps {
  client: ClientInfo
  items: QuotationItem[]
  quotationNumber: string
  notes: string
  taxRate: number
  date?: string
}

export function QuotationPDF({
  client,
  items,
  quotationNumber,
  notes,
  taxRate,
  date,
}: QuotationPDFProps) {
  const subtotal = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* ── Header ── */}
        <View style={s.header}>
          <View>
            <Text style={s.brand}>COTIZACIÓN</Text>
            <Text style={s.brandSub}>Documento Comercial</Text>
          </View>
          <View style={s.quotBadge}>
            <Text>{quotationNumber}</Text>
          </View>
        </View>

        <View style={s.accentLine} />

        {/* ── Client & Meta ── */}
        <View style={s.infoGrid}>
          <View style={s.infoBlock}>
            <Text style={s.infoLabel}>Cliente</Text>
            {client.name ? (
              <Text style={s.infoValue}>{client.name}</Text>
            ) : null}
            {client.company ? (
              <Text style={s.infoValue}>{client.company}</Text>
            ) : null}
            {client.email ? (
              <Text style={s.infoValueLight}>{client.email}</Text>
            ) : null}
            {client.phone ? (
              <Text style={s.infoValueLight}>{client.phone}</Text>
            ) : null}
          </View>
          <View style={[s.infoBlock, { alignItems: 'flex-end' }]}>
            <Text style={s.infoLabel}>Detalles</Text>
            <Text style={s.infoValue}>Fecha: {fmtDate(date)}</Text>
            <Text style={s.infoValueLight}>
              Vigencia: 30 días naturales
            </Text>
            <Text style={s.infoValueLight}>Moneda: MXN</Text>
          </View>
        </View>

        {/* ── Table ── */}
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderText, s.colDesc]}>Concepto</Text>
          <Text style={[s.tableHeaderText, s.colQty]}>Cant.</Text>
          <Text style={[s.tableHeaderText, s.colPrice]}>P. Unitario</Text>
          <Text style={[s.tableHeaderText, s.colTotal]}>Importe</Text>
        </View>
        {items.map((item, i) => (
          <View
            key={item.id}
            style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}
          >
            <Text style={[s.cellText, s.colDesc]}>{item.description}</Text>
            <Text style={[s.cellText, s.colQty]}>{item.quantity}</Text>
            <Text style={[s.cellText, s.colPrice]}>
              {fmt(item.unitPrice)}
            </Text>
            <Text style={[s.cellTextBold, s.colTotal]}>
              {fmt(item.quantity * item.unitPrice)}
            </Text>
          </View>
        ))}

        {/* ── Totals ── */}
        <View style={s.totalsContainer}>
          <View style={s.totalsBox}>
            <View style={s.totalsRow}>
              <Text style={s.totalsLabel}>Subtotal</Text>
              <Text style={s.totalsValue}>{fmt(subtotal)}</Text>
            </View>
            <View style={s.totalsDivider} />
            <View style={s.totalsRow}>
              <Text style={s.totalsLabel}>IVA ({taxRate}%)</Text>
              <Text style={s.totalsValue}>{fmt(tax)}</Text>
            </View>
            <View style={s.grandTotalRow}>
              <Text style={s.grandTotalLabel}>Total</Text>
              <Text style={s.grandTotalValue}>{fmt(total)}</Text>
            </View>
          </View>
        </View>

        {/* ── Notes ── */}
        {notes ? (
          <View style={s.notesContainer}>
            <Text style={s.notesTitle}>Notas y Condiciones</Text>
            <Text style={s.notesText}>{notes}</Text>
          </View>
        ) : null}

        {/* ── Footer ── */}
        <View style={s.footer} fixed>
          <View style={s.footerAccent} />
          <Text style={s.footerText}>
            {quotationNumber} · Generado el {fmtDate()}
          </Text>
          <View style={s.footerAccent} />
        </View>
      </Page>
    </Document>
  )
}
