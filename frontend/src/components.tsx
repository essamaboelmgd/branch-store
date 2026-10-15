import { useEffect, useId, useState, type FormEvent, type PropsWithChildren, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { dimensions, formatMoney, productImageFor, supplierFor } from './data'
import { useApp } from './store'
import type { Product } from './types'

export function Icon({ name, size = 18 }: { name: 'search' | 'cart' | 'compare' | 'arrow' | 'menu' | 'close' | 'plus' | 'minus' | 'box' | 'orders' | 'settings' | 'home' | 'logout'; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }
  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
    cart: <><path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 1.9-1.4L21 9H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>,
    compare: <><path d="M5 5v14M19 5v14M3 8h7M14 16h7" /><path d="m7 6 2 2-2 2M17 14l-2 2 2 2" /></>,
    arrow: <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    box: <><path d="m3 7 9-4 9 4-9 4-9-4Z" /><path d="M3 7v10l9 4 9-4V7M12 11v10" /></>,
    orders: <><path d="M5 4h14v17H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.3v-2.6h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2H15v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z" transform="translate(-1 -1) scale(1.08)" /></>,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V10Z" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

export function BrandLogo({ className = '' }: { className?: string }) {
  return <Link className={`wordmark ${className}`.trim()} to="/" aria-label="BRANCH سوق ألواح الخشب">
    <img src={`${import.meta.env.BASE_URL}brand/branch-logo.png`} alt="" />
  </Link>
}

export function Header() {
  const { state } = useApp()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0)
  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = query.trim()
    navigate(`/products${value ? `?q=${encodeURIComponent(value)}` : ''}`)
    setMenuOpen(false)
  }
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <BrandLogo />
        <button className="mobile-menu-toggle icon-button" type="button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="التنقل الرئيسي">
          <Link onClick={() => setMenuOpen(false)} to="/">الرئيسية</Link>
          <Link onClick={() => setMenuOpen(false)} to="/products">الألواح</Link>
          <Link onClick={() => setMenuOpen(false)} to="/suppliers">الموردون</Link>
          <Link onClick={() => setMenuOpen(false)} className="nav-supplier" to="/supplier/login">بوابة المورد</Link>
        </nav>
        <form className="header-search" role="search" onSubmit={search}>
          <label className="sr-only" htmlFor="header-search-input">ابحث عن الألواح</label>
          <Icon name="search" size={17} />
          <input id="header-search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن خامة أو مقاس" />
          <button type="submit">بحث</button>
        </form>
        <div className="header-actions">
          <Link className="icon-link header-icon-link" to="/compare" aria-label={`المقارنة، ${state.compareIds.length} ألواح`} title="المقارنة"><Icon name="compare" />{state.compareIds.length > 0 && <b className="cart-badge">{state.compareIds.length}</b>}</Link>
          <Link className="icon-link cart-link header-icon-link" to="/cart" aria-label={`السلة، ${count} منتجات`} title="السلة"><Icon name="cart" />{count > 0 && <b className="cart-badge">{count}</b>}</Link>
        </div>
      </div>
    </header>
  )
}

export function PortalNav() {
  const { state, setState } = useApp()
  const navigate = useNavigate()
  const links = [
    { to: '/supplier/dashboard', label: 'نظرة عامة', icon: 'home' as const, end: true },
    { to: '/supplier/products', label: 'المنتجات', icon: 'box' as const },
    { to: '/supplier/orders', label: 'الطلبات', icon: 'orders' as const },
    { to: '/supplier/settings', label: 'بيانات الشركة', icon: 'settings' as const },
  ]
  return (
    <aside className="portal-sidebar">
      <BrandLogo className="portal-wordmark" />
      <div className="portal-company"><span className="company-avatar">{state.company.name.slice(0, 1)}</span><div><strong>{state.company.name}</strong><small>حساب تجريبي</small></div></div>
      <nav className="portal-links" aria-label="قائمة المورد">
        {links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => `portal-link ${isActive ? 'active' : ''}`}><Icon name={link.icon} /><span>{link.label}</span></NavLink>)}
      </nav>
      <div className="portal-sidebar-bottom">
        <p>بيانات تجريبية محفوظة على هذا الجهاز.</p>
        <button type="button" className="portal-link portal-logout" onClick={() => { setState((current) => ({ ...current, supplierSignedIn: false })); navigate('/supplier/login') }}><Icon name="logout" /><span>تسجيل الخروج</span></button>
        <Link className="back-store-link" to="/"><Icon name="arrow" size={16} /> العودة للمتجر</Link>
      </div>
    </aside>
  )
}

export function PortalMobileNav() {
  const { setState } = useApp()
  const navigate = useNavigate()
  const links = [
    { to: '/supplier/dashboard', label: 'الرئيسية', icon: 'home' as const, end: true },
    { to: '/supplier/products', label: 'المنتجات', icon: 'box' as const },
    { to: '/supplier/orders', label: 'الطلبات', icon: 'orders' as const },
    { to: '/supplier/settings', label: 'الشركة', icon: 'settings' as const },
  ]
  return <nav className="portal-mobile-nav" aria-label="تنقل المورد">
    {links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => `portal-mobile-link ${isActive ? 'active' : ''}`}><Icon name={link.icon} /><span>{link.label}</span></NavLink>)}
    <button type="button" className="portal-mobile-link" onClick={() => { setState((current) => ({ ...current, supplierSignedIn: false })); navigate('/supplier/login') }}><Icon name="logout" /><span>خروج</span></button>
  </nav>
}

export function PortalLayout({ children }: PropsWithChildren) {
  const location = useLocation()
  const title = location.pathname.includes('orders') ? 'الطلبات' : location.pathname.includes('products') ? 'المنتجات' : location.pathname.includes('settings') ? 'بيانات الشركة' : 'نظرة عامة'
  return <div className="portal-shell"><PortalNav /><main className="portal-main"><div className="portal-mobile-brand"><BrandLogo /><Link to="/" className="portal-back-mobile">العودة للمتجر</Link></div><div className="portal-topbar"><p>مساحة المورد / <span>{title}</span></p><span className="demo-pill"><span className="status-dot" />وضع تجريبي</span></div><div className="portal-content">{children}</div></main><PortalMobileNav /></div>
}

export function Footer() {
  return <footer className="site-footer"><div className="wrap footer-main"><div><BrandLogo className="footer-wordmark" /><p>مساحة واحدة لمقارنة ألواح الخشب من موردين متعددين.</p></div><div><strong>تصفح</strong><Link to="/products">كل الألواح</Link><Link to="/suppliers">الموردون</Link><Link to="/compare">قارن العروض</Link></div><div><strong>للموردين</strong><Link to="/supplier/register">أنشئ حسابًا تجريبيًا</Link><Link to="/supplier/login">دخول المورد</Link></div></div><div className="wrap footer-bottom"><span>© BRANCH · نموذج واجهة تجريبي</span><span>الأسعار والشركات المعروضة بيانات توضيحية</span></div></footer>
}

export function StoreLayout({ children }: PropsWithChildren) {
  return <><Header /><main>{children}</main><Footer /></>
}

export function PageTitle({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="page-title-row"><div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>
}

export function Notice({ children, tone = 'neutral' }: PropsWithChildren<{ tone?: 'neutral' | 'success' | 'warning' }>) {
  return <div className={`notice notice-${tone}`} role="note">{children}</div>
}

const boardColors: Record<string, { top: string; side: string; edge: string }> = {
  MDF: { top: '#d6b78a', side: '#b88f60', edge: '#e6ccaa' },
  HDF: { top: '#b79467', side: '#95724c', edge: '#d1b48f' },
  كونتر: { top: '#b9854d', side: '#8c5d35', edge: '#e0b375' },
  'خشب طبيعي': { top: '#996a3e', side: '#6d4729', edge: '#c9975d' },
}

export function BoardDiagram({ product, large = false }: { product: Product; large?: boolean }) {
  const color = boardColors[product.material] ?? boardColors.MDF
  const layers = product.material === 'كونتر' ? 6 : product.material === 'HDF' ? 2 : 3
  return <div className={`board-diagram ${large ? 'board-diagram-large' : ''}`}>
    <svg viewBox="0 0 340 210" role="img" aria-label={`رسم توضيحي هندسي للوح ${product.material} بمقاس ${dimensions(product)}`}>
      <defs><marker id={`arrow-${product.id}`} markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto-start-reverse"><path d="M 0 0 L 5 2.5 L 0 5 z" fill="#617365" /></marker></defs>
      <g transform="translate(45 27)">
        {[0, 1, 2].map((index) => {
          const y = 24 + index * 24
          return <g key={index} opacity={0.72 + index * 0.12}>
            <polygon points={`28,${y + 40} 176,${y} 282,${y + 34} 135,${y + 74}`} fill={color.top} stroke="#6d5a45" strokeWidth="1" />
            <polygon points={`135,${y + 74} 282,${y + 34} 282,${y + 43} 135,${y + 84}`} fill={color.side} stroke="#6d5a45" strokeWidth="1" />
            <polygon points={`28,${y + 40} 135,${y + 74} 135,${y + 84} 28,${y + 50}`} fill={color.edge} stroke="#6d5a45" strokeWidth="1" />
            {product.material === 'كونتر' && Array.from({ length: layers - 1 }).map((_, layer) => <path key={layer} d={`M ${30 + layer} ${y + 42 + layer * 1.5} L ${135 + layer} ${y + 76 + layer * 1.5}`} stroke="#76553b" strokeWidth="0.8" opacity="0.7" />)}
          </g>
        })}
        <path d="M30 174 L30 188 M282 131 L282 146 M30 184 L282 142" stroke="#617365" strokeWidth="1" markerStart={`url(#arrow-${product.id})`} markerEnd={`url(#arrow-${product.id})`} />
        <text x="154" y="172" textAnchor="middle" fill="#405c4b" fontSize="11" direction="ltr">{product.length} × {product.width} cm</text>
        <path d="M292 77 L308 73 M292 85 L308 81 M305 75 L305 79" stroke="#617365" strokeWidth="1" />
        <text x="319" y="74" fill="#405c4b" fontSize="10" direction="ltr">{product.thickness} mm</text>
      </g>
    </svg>
    <span className="diagram-label">مخطط قياسات توضيحي</span>
  </div>
}

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { state, setState } = useApp()
  const supplier = supplierFor(state.suppliers, product.supplierId)
  const selected = state.compareIds.includes(product.id)
  const unavailable = !product.available || product.stock <= 0
  const toggleCompare = () => setState((current) => {
    if (current.compareIds.includes(product.id)) return { ...current, compareIds: current.compareIds.filter((id) => id !== product.id) }
    if (current.compareIds.length >= 3) return current
    return { ...current, compareIds: [...current.compareIds, product.id] }
  })
  const add = () => setState((current) => {
    const existing = current.cart.find((line) => line.productId === product.id)
    const cart = existing ? current.cart.map((line) => line.productId === product.id ? { ...line, quantity: Math.min(product.stock, line.quantity + 1) } : line) : [...current.cart, { productId: product.id, quantity: 1 }]
    return { ...current, cart }
  })
  return <article className={`product-card ${compact ? 'product-card-compact' : ''}`}>
    <div className="product-card-visual"><Link to={`/products/${product.id}`} className="product-photo-link" aria-label={`عرض ${product.name}`}><img className="product-photo" src={productImageFor(product)} alt="" loading="lazy" /></Link><span className={`stock-tag ${unavailable ? 'stock-out' : ''}`}>{unavailable ? 'غير متاح حاليًا' : 'متاح'}</span><button className={`compare-toggle ${selected ? 'selected' : ''}`} type="button" onClick={toggleCompare} aria-pressed={selected} aria-label={selected ? `إزالة ${product.name} من المقارنة` : `إضافة ${product.name} للمقارنة`} disabled={!selected && state.compareIds.length >= 3}><Icon name="compare" /></button></div>
    <div className="product-card-body"><div className="product-card-meta"><span>{product.material}</span><span>بيانات تجريبية</span></div><h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3><p className="product-measurements">{dimensions(product)}</p><Link className="product-supplier" to={`/suppliers/${supplier.id}`}>{supplier.name} <span>· {supplier.city}</span></Link><div className="product-card-bottom"><div className="price"><strong>{formatMoney(product.price)}</strong><span>ج.م / {product.unit}</span></div><button type="button" className="add-button" onClick={add} disabled={unavailable} aria-label={`أضف ${product.name} إلى السلة`}><Icon name="plus" /></button></div></div>
  </article>
}

export function SearchBox({ initialValue = '', placeholder = 'ابحث عن خامة أو مقاس أو مورد', onSubmit }: { initialValue?: string; placeholder?: string; onSubmit: (value: string) => void }) {
  const [value, setValue] = useState(initialValue)
  useEffect(() => setValue(initialValue), [initialValue])
  const submit = (event: FormEvent) => { event.preventDefault(); onSubmit(value.trim()) }
  return <form className="search-box" onSubmit={submit}><label className="sr-only" htmlFor="site-search">بحث عن لوح</label><Icon name="search" /><input id="site-search" value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} /><button type="submit">ابحث عن لوح</button></form>
}

export function QuantityControl({ value, onChange, max = 999 }: { value: number; onChange: (value: number) => void; max?: number }) {
  const inputId = useId()
  return <div className="quantity-control" aria-label="الكمية"><button type="button" aria-label="تقليل الكمية" disabled={value <= 1} onClick={() => onChange(Math.max(1, value - 1))}><Icon name="minus" size={16} /></button><label className="sr-only" htmlFor={inputId}>الكمية</label><input id={inputId} type="number" min="1" max={max} value={value} onChange={(event) => { const next = Number(event.target.value); if (Number.isFinite(next)) onChange(Math.min(max, Math.max(1, next))) }} /><button type="button" aria-label="زيادة الكمية" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}><Icon name="plus" size={16} /></button></div>
}

export function EmptyState({ title, body, to, action }: { title: string; body: string; to: string; action: string }) {
  return <div className="empty-state"><span className="empty-mark"><Icon name="box" size={28} /></span><h2>{title}</h2><p>{body}</p><Link className="button button-primary" to={to}>{action}</Link></div>
}

export function StatusBadge({ status }: { status: 'pending' | 'accepted' | 'rejected' }) {
  const labels = { pending: 'قيد المراجعة', accepted: 'مقبول', rejected: 'مرفوض' }
  return <span className={`status-badge status-${status}`}><span />{labels[status]}</span>
}
