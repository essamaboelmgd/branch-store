import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { dimensions, formatMoney, materials, productFor, supplierFor, woodPhotos } from './data'
import { useApp } from './store'
import type { BuyerRequest, Product } from './types'
import { BoardDiagram, BrandLogo, EmptyState, Icon, Notice, PageTitle, ProductCard, QuantityControl, SearchBox, StatusBadge } from './components'

function SectionHeading({ title, action, to }: { title: string; action?: string; to?: string }) {
  return <div className="section-heading"><h2>{title}</h2>{action && to && <Link className="text-link" to={to}>{action}<Icon name="arrow" size={16} /></Link>}</div>
}

function phoneDigits(value: string) {
  return Array.from(value, (character) => {
    const code = character.codePointAt(0) ?? 0
    if (code >= 0x0660 && code <= 0x0669) return String(code - 0x0660)
    if (code >= 0x06f0 && code <= 0x06f9) return String(code - 0x06f0)
    if (code >= 0x0030 && code <= 0x0039) return character
    return ''
  }).join('')
}

export function HomePage() {
  const { state } = useApp()
  const products = state.products.slice(0, 8)
  const categories = [
    { title: 'MDF', image: woodPhotos.particleBoard, to: '/products?material=MDF' },
    { title: 'HDF', image: woodPhotos.studioPanels, to: '/products?material=HDF' },
    { title: 'كونتر', image: woodPhotos.lumberPile, to: '/products?material=%D9%83%D9%88%D9%86%D8%AA%D8%B1' },
    { title: 'خشب طبيعي', image: woodPhotos.plankStack, to: '/products?material=%D8%AE%D8%B4%D8%A8%20%D8%B7%D8%A8%D9%8A%D8%B9%D9%8A' },
    { title: 'كل الألواح', image: woodPhotos.warehouse, to: '/products' },
  ]
  return <>
    <section className="home-hero wrap" aria-labelledby="home-hero-title">
      <div className="home-hero-photo" aria-hidden="true"><img src={woodPhotos.warehouse} alt="" /></div>
      <div className="hero-copy">
        <p className="hero-label"><span className="hero-label-rule" /> سوق ألواح الخشب</p>
        <h1 id="home-hero-title">ألواح الخشب<br /><em>قارنها في مكان واحد.</em></h1>
        <p className="hero-description">استكشف الألواح، قارن تفاصيل المقاس والخامة، وتعرّف على المورد قبل إرسال طلبك.</p>
        <div className="hero-actions"><Link className="button hero-button-primary" to="/products">تصفّح الألواح <Icon name="arrow" size={16} /></Link><Link className="button hero-button-outline" to="/compare">قارن العروض <Icon name="compare" size={16} /></Link></div>
        <p className="hero-disclaimer">الأسعار والمخزون المعروضان بيانات تجريبية.</p>
      </div>
    </section>

    <section className="home-categories wrap" aria-labelledby="home-categories-title">
      <div className="home-section-heading"><div><span className="home-kicker">ابدأ من الخامة</span><h2 id="home-categories-title">تصفّح الفئات</h2></div><Link className="text-link" to="/products">عرض كل الألواح <Icon name="arrow" size={16} /></Link></div>
      <div className="home-category-grid">{categories.map((category) => <Link className="home-category-card" key={category.title} to={category.to}><span className="home-category-photo"><img src={category.image} alt="" loading="lazy" /></span><strong>{category.title}</strong><span className="category-arrow"><Icon name="arrow" size={15} /></span></Link>)}</div>
    </section>

    <section className="home-promotions wrap" aria-label="استكشف BRANCH">
      <Link className="home-promo-card" to="/compare"><span className="home-promo-photo"><img src={woodPhotos.plankStack} alt="" loading="lazy" /></span><span className="home-promo-copy"><small>قبل إرسال الطلب</small><strong>قارن تفاصيل<br />الألواح بسهولة.</strong><span>ابدأ المقارنة <Icon name="arrow" size={15} /></span></span></Link>
      <Link className="home-promo-card" to="/suppliers"><span className="home-promo-photo"><img src={woodPhotos.workshopWorkers} alt="" loading="lazy" /></span><span className="home-promo-copy"><small>اعرف مصدر العرض</small><strong>تصفّح الموردين<br />وتفاصيلهم.</strong><span>اكتشف الموردين <Icon name="arrow" size={15} /></span></span></Link>
    </section>

    <section className="popular-products wrap" aria-labelledby="popular-products-title"><div className="home-section-heading"><div><span className="home-kicker">تعرّف على الخيارات</span><h2 id="popular-products-title">تصفّح الألواح</h2></div><Link className="text-link" to="/products">عرض كل المنتجات <Icon name="arrow" size={16} /></Link></div><p className="home-section-note">الأسعار والتوفر معلومات تجريبية، راجع تفاصيل كل عرض.</p><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>

    <section className="wood-guidance-banner wrap"><div className="wood-guidance-copy"><span className="home-kicker">BRANCH · سوق الألواح</span><h2>اختَر من العروض<br />ما يناسب مشروعك.</h2><p>راجع بيانات اللوح والمورد، ثم أرسل طلبك من صفحة المنتج.</p><Link className="button guidance-button" to="/products">اكتشف الألواح <Icon name="arrow" size={16} /></Link></div><div className="wood-guidance-photo"><img src={woodPhotos.woodworker} alt="عامل يشكّل قطعة من الخشب في ورشة" loading="lazy" /></div></section>

    <section className="wood-guides wrap" aria-labelledby="wood-guides-title"><div className="home-section-heading"><div><span className="home-kicker">دليل BRANCH</span><h2 id="wood-guides-title">خطوات تساعدك في الاختيار</h2></div></div><div className="wood-guide-grid">
      <Link className="wood-guide-card" to="/products"><img src={woodPhotos.studioPanels} alt="ألواح خشبية موضوعة في استوديو" loading="lazy" /><span className="wood-guide-body"><small>الخامات</small><strong>تعرّف على خيارات الألواح</strong><span>تصفّح الخامات المدرجة في بيانات العرض.</span><b>استكشف الألواح <Icon name="arrow" size={15} /></b></span></Link>
      <Link className="wood-guide-card" to="/compare"><img src={woodPhotos.carpenter} alt="نجّار يعمل في ورشته" loading="lazy" /><span className="wood-guide-body"><small>المقارنة</small><strong>راجع التفاصيل قبل الطلب</strong><span>قارن المقاس والسُمك والسعر بين الألواح.</span><b>قارن العروض <Icon name="arrow" size={15} /></b></span></Link>
      <Link className="wood-guide-card" to="/suppliers"><img src={woodPhotos.woodworker} alt="حرفي يعمل على قطعة خشب" loading="lazy" /><span className="wood-guide-body"><small>الموردون</small><strong>تعرّف على مصدر العرض</strong><span>اعرف اسم المورد والمدينة المرتبطين بكل لوح.</span><b>تصفّح الموردين <Icon name="arrow" size={15} /></b></span></Link>
    </div></section>
  </>
}

export function ProductsPage() {
  const { state } = useApp()
  const [params, setParams] = useSearchParams()
  const initialQuery = params.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [maxPrice, setMaxPrice] = useState(params.get('max') ?? '')
  const [minPrice, setMinPrice] = useState(params.get('min') ?? '')
  const [supplierId, setSupplierId] = useState(params.get('supplier') ?? '')
  const [size, setSize] = useState(params.get('size') ?? '')
  const [thickness, setThickness] = useState(params.get('thickness') ?? '')
  const [availableOnly, setAvailableOnly] = useState(params.get('available') === 'true')
  const [sort, setSort] = useState(params.get('sort') ?? 'recommended')
  const [material, setMaterial] = useState(params.get('material') ?? '')

  useEffect(() => {
    setQuery(params.get('q') ?? '')
    setMaterial(params.get('material') ?? '')
    setSupplierId(params.get('supplier') ?? '')
    setSize(params.get('size') ?? '')
    setThickness(params.get('thickness') ?? '')
    setMinPrice(params.get('min') ?? '')
    setMaxPrice(params.get('max') ?? '')
    setAvailableOnly(params.get('available') === 'true')
    setSort(params.get('sort') ?? 'recommended')
  }, [params])

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('ar')
    const result = state.products.filter((product) => {
      const supplier = supplierFor(state.suppliers, product.supplierId)
      const haystack = `${product.name} ${product.material} ${supplier.name} ${dimensions(product)}`.toLocaleLowerCase('ar')
      return (!q || haystack.includes(q)) && (!material || product.material === material) && (!supplierId || product.supplierId === supplierId) && (!size || `${product.length}x${product.width}` === size) && (!thickness || product.thickness === Number(thickness)) && (!minPrice || product.price >= Number(minPrice)) && (!maxPrice || product.price <= Number(maxPrice)) && (!availableOnly || (product.available && product.stock > 0))
    })
    if (sort === 'price-low') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-high') result.sort((a, b) => b.price - a.price)
    else if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'ar'))
    return result
  }, [state.products, state.suppliers, query, material, supplierId, size, thickness, minPrice, maxPrice, availableOnly, sort])

  const updateParam = (key: string, value: string) => setParams((current) => {
    const next = new URLSearchParams(current)
    if (value) next.set(key, value)
    else next.delete(key)
    return next
  })
  const applySearch = (value: string) => { setQuery(value); updateParam('q', value) }
  const clearFilters = () => { setQuery(''); setMaterial(''); setSupplierId(''); setSize(''); setThickness(''); setMinPrice(''); setMaxPrice(''); setAvailableOnly(false); setSort('recommended'); setParams({}) }
  return <div className="wrap page-shell"><PageTitle title="كل الألواح" description="ابحث وقارن بين عروض تجريبية حسب الخامة والمقاس والمورد." action={<Link className="compare-shortcut" to="/compare"><Icon name="compare" /> المقارنة <span>{state.compareIds.length}/3</span></Link>} /><Notice>مواد وأقسام مثل MDF وHDF والكونتر أمثلة للعرض فقط، وليست تصنيفًا نهائيًا.</Notice><div className="listing-search"><SearchBox initialValue={query} onSubmit={applySearch} /></div><div className="listing-layout"><aside className="filter-panel"><div className="filter-heading"><h2>تصفية النتائج</h2><button type="button" className="clear-button" onClick={clearFilters}>مسح الكل</button></div><label className="field-label" htmlFor="filter-material">الخامة</label><select id="filter-material" value={material} onChange={(event) => { setMaterial(event.target.value); updateParam('material', event.target.value) }}><option value="">كل الخامات</option>{materials.map((item) => <option key={item}>{item}</option>)}</select><label className="field-label" htmlFor="filter-supplier">المورد</label><select id="filter-supplier" value={supplierId} onChange={(event) => { setSupplierId(event.target.value); updateParam('supplier', event.target.value) }}><option value="">كل الموردين</option>{state.suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}</select><label className="field-label" htmlFor="filter-size">المقاس</label><select id="filter-size" value={size} onChange={(event) => { setSize(event.target.value); updateParam('size', event.target.value) }}><option value="">كل المقاسات</option><option value="244x122">244 × 122 سم</option><option value="220x110">220 × 110 سم</option></select><label className="field-label" htmlFor="filter-thickness">السُمك</label><select id="filter-thickness" value={thickness} onChange={(event) => { setThickness(event.target.value); updateParam('thickness', event.target.value) }}><option value="">كل السُمك</option>{[3, 6, 12, 16, 18, 25].map((item) => <option key={item} value={item}>{item} مم</option>)}</select><fieldset className="price-fieldset"><legend>السعر لكل لوح (ج.م)</legend><div className="price-inputs"><label><span>من</span><input type="number" min="0" inputMode="numeric" value={minPrice} onChange={(event) => { setMinPrice(event.target.value); updateParam('min', event.target.value) }} /></label><label><span>إلى</span><input type="number" min="0" inputMode="numeric" value={maxPrice} onChange={(event) => { setMaxPrice(event.target.value); updateParam('max', event.target.value) }} /></label></div></fieldset><label className="check-row"><input type="checkbox" checked={availableOnly} onChange={(event) => { setAvailableOnly(event.target.checked); updateParam('available', event.target.checked ? 'true' : '') }} /><span>المتاح حاليًا فقط</span></label><p className="filter-caption">الأسعار والكميات المعروضة بيانات توضيحية.</p></aside><div className="results-area"><div className="results-toolbar"><p><strong>{visible.length}</strong> عروض في بيانات العرض</p><label htmlFor="sort-products">ترتيب حسب<select id="sort-products" value={sort} onChange={(event) => { setSort(event.target.value); updateParam('sort', event.target.value === 'recommended' ? '' : event.target.value) }}><option value="recommended">المقترح</option><option value="price-low">السعر: الأقل أولًا</option><option value="price-high">السعر: الأعلى أولًا</option><option value="name">الاسم</option></select></label></div>{visible.length ? <div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-results"><h2>لا توجد عروض بهذا الاختيار</h2><p>جرّب تغيير الخامة أو السعر أو المقاس.</p><button type="button" className="button button-outline" onClick={clearFilters}>مسح عوامل التصفية</button></div>}</div></div></div>
}

export function ProductDetailPage() {
  const { id = '' } = useParams()
  const { state, setState } = useApp()
  const navigate = useNavigate()
  const product = productFor(state.products, id)
  const [quantity, setQuantity] = useState(1)
  if (!product) return <div className="wrap page-shell"><EmptyState title="لم نعثر على هذا اللوح" body="قد يكون الرابط غير صحيح أو أن العرض لم يعد ضمن البيانات التجريبية." to="/products" action="العودة إلى الألواح" /></div>
  const supplier = supplierFor(state.suppliers, product.supplierId)
  const unavailable = !product.available || product.stock <= 0
  const addToCart = () => { setState((current) => { const existing = current.cart.find((line) => line.productId === product.id); return { ...current, cart: existing ? current.cart.map((line) => line.productId === product.id ? { ...line, quantity: Math.min(product.stock, line.quantity + quantity) } : line) : [...current.cart, { productId: product.id, quantity }] } }); navigate('/cart') }
  return <div className="wrap page-shell"><div className="breadcrumbs"><Link to="/">الرئيسية</Link><span>/</span><Link to="/products">الألواح</Link><span>/</span><span>{product.name}</span></div><div className="detail-grid"><div className="detail-visual"><BoardDiagram product={product} large /><div className="diagram-note"><span className="status-dot" /> رسم هندسي توضيحي للقياسات، وليس صورة للمنتج.</div></div><section className="detail-copy"><p className="detail-category">{product.material} <span>· بيانات تجريبية</span></p><h1>{product.name}</h1><p className="detail-supplier">مقدم من <Link to={`/suppliers/${supplier.id}`}>{supplier.name}</Link> · {supplier.city}</p><div className="detail-price"><strong>{formatMoney(product.price)}</strong><span>ج.م / {product.unit}</span><small>سعر توضيحي غير مؤكد</small></div><div className="spec-table"><div><span>الخامة</span><strong>{product.material}</strong></div><div><span>الطول × العرض</span><strong>{product.length} × {product.width} سم</strong></div><div><span>السُمك</span><strong>{product.thickness} مم</strong></div><div><span>المورد</span><strong>{supplier.name}</strong></div><div><span>التوفر في بيانات العرض</span><strong className={unavailable ? 'text-muted' : 'text-green'}>{unavailable ? 'غير متاح حاليًا' : `${product.stock} لوحًا — بيانات تجريبية`}</strong></div></div><div className="detail-actions"><div><span className="field-label">الكمية</span><QuantityControl value={quantity} onChange={setQuantity} max={Math.max(1, product.stock)} /></div><button type="button" className="button button-primary add-to-cart" onClick={addToCart} disabled={unavailable}><Icon name="cart" />{unavailable ? 'غير متاح حاليًا' : 'أضف إلى السلة'}</button></div><Notice>يمكنك إرسال طلب كضيف. هذا النموذج لا يتحقق من المخزون ولا يرسل الطلب للمورد.</Notice></section></div><section className="related-products"><SectionHeading title="عروض أخرى من بيانات العرض" action="العودة إلى الألواح" to="/products" /><div className="product-grid">{state.products.filter((item) => item.id !== product.id && item.material === product.material).slice(0, 3).map((item) => <ProductCard key={item.id} product={item} />)}</div></section></div>
}

export function SuppliersPage() {
  const { state } = useApp()
  return <div className="wrap page-shell"><PageTitle title="الموردون" description="تعرّف على الشركات المدرجة في بيانات العرض التجريبية." /><Notice>أسماء الشركات ومعلوماتها هنا افتراضية، ولا تمثل موردين معتمدين أو متحققًا منهم.</Notice><div className="supplier-directory">{state.suppliers.map((supplier) => { const count = state.products.filter((product) => product.supplierId === supplier.id).length; return <article className="supplier-directory-row" key={supplier.id}><div className="supplier-monogram">{supplier.name.slice(0, 1)}</div><div className="supplier-directory-info"><Link to={`/suppliers/${supplier.id}`}><h2>{supplier.name}</h2></Link><p>{supplier.city} · {supplier.materials.join(' · ')}</p><span>{count} عروض نموذجية</span></div><Link className="text-link" to={`/suppliers/${supplier.id}`}>عرض الملف <Icon name="arrow" size={16} /></Link></article> })}</div></div>
}

export function SupplierProfilePage() {
  const { id = '' } = useParams()
  const { state } = useApp()
  const supplier = state.suppliers.find((item) => item.id === id)
  if (!supplier) return <div className="wrap page-shell"><EmptyState title="لم نعثر على هذا المورد" body="المورد غير موجود في مجموعة البيانات التجريبية الحالية." to="/suppliers" action="كل الموردين" /></div>
  const products = state.products.filter((product) => product.supplierId === id)
  return <div className="wrap page-shell"><div className="breadcrumbs"><Link to="/suppliers">الموردون</Link><span>/</span><span>{supplier.name}</span></div><section className="supplier-profile-head"><div className="supplier-profile-mark">{supplier.name.slice(0, 1)}</div><div><span className="demo-tag">بيانات مورد تجريبية</span><h1>{supplier.name}</h1><p>{supplier.city} · {supplier.address}</p></div></section><div className="supplier-profile-grid"><section className="profile-about"><h2>نبذة عن الشركة</h2><p>{supplier.description}</p><dl><div><dt>المواد المذكورة</dt><dd>{supplier.materials.join('، ')}</dd></div><div><dt>هاتف توضيحي</dt><dd dir="ltr">{supplier.phone}</dd></div><div><dt>مدة نشاط افتراضية للعرض</dt><dd>{supplier.years} سنوات</dd></div></dl><Notice>كل معلومات هذه الصفحة افتراضية. لا يوجد اعتماد أو تحقق من الشركة.</Notice></section><section className="profile-offers"><SectionHeading title="العروض المدرجة" /><div className="mini-offer-list">{products.map((product) => <Link to={`/products/${product.id}`} key={product.id} className="mini-offer"><span className="mini-offer-mark">{product.material.slice(0, 1)}</span><span>{product.name}<small>{dimensions(product)}</small></span><strong>{formatMoney(product.price)} ج.م / {product.unit}</strong></Link>)}</div></section></div></div>
}

export function ComparePage() {
  const { state, setState } = useApp()
  const compared = state.compareIds.map((id) => productFor(state.products, id)).filter((product): product is Product => Boolean(product))
  return <div className="wrap page-shell"><PageTitle title="مقارنة العروض" description="ضع التفاصيل الأساسية جنبًا إلى جنب قبل اختيارك." /><Notice>يمكنك مقارنة ثلاثة ألواح كحد أقصى. بيانات الأسعار والمخزون للعرض فقط.</Notice>{compared.length === 0 ? <EmptyState title="ابدأ بإضافة ألواح للمقارنة" body="اختر زر المقارنة على أي عرض، وستظهر تفاصيله هنا." to="/products" action="تصفح الألواح" /> : <div className="compare-wrap"><div className="compare-grid"><div className="compare-labels"><span>العرض</span><span>المادة</span><span>المقاس</span><span>السُمك</span><span>السعر لكل لوح</span><span>المورد</span><span>التوفر</span><span>الإجراء</span></div>{compared.map((product) => { const supplier = supplierFor(state.suppliers, product.supplierId); return <article className="compare-column" key={product.id}><div className="compare-product"><BoardDiagram product={product} /><Link to={`/products/${product.id}`}><h2>{product.name}</h2></Link><span>بيانات تجريبية</span></div><div><strong>{product.material}</strong></div><div>{product.length} × {product.width} سم</div><div>{product.thickness} مم</div><div><strong>{formatMoney(product.price)} ج.م</strong><small>/ {product.unit}</small></div><div><Link to={`/suppliers/${supplier.id}`}>{supplier.name}</Link></div><div><span className={`stock-tag ${product.available && product.stock ? '' : 'stock-out'}`}>{product.available && product.stock ? 'متاح' : 'غير متاح'}</span></div><div className="compare-actions"><Link className="text-link" to={`/products/${product.id}`}>التفاصيل</Link><button type="button" className="link-button danger-link" onClick={() => setState((current) => ({ ...current, compareIds: current.compareIds.filter((id) => id !== product.id) }))}>إزالة</button></div></article> })}</div></div>}</div>
}

export function CartPage() {
  const { state, setState } = useApp()
  const lines = state.cart.map((line) => ({ line, product: productFor(state.products, line.productId) })).filter((entry): entry is { line: (typeof state.cart)[number]; product: Product } => Boolean(entry.product))
  const groups = state.suppliers.map((supplier) => ({ supplier, lines: lines.filter(({ product }) => product.supplierId === supplier.id) })).filter((group) => group.lines.length > 0)
  const total = lines.reduce((sum, { line, product }) => sum + line.quantity * product.price, 0)
  const changeQuantity = (productId: string, quantity: number) => setState((current) => ({ ...current, cart: current.cart.map((line) => line.productId === productId ? { ...line, quantity } : line) }))
  const remove = (productId: string) => setState((current) => ({ ...current, cart: current.cart.filter((line) => line.productId !== productId) }))
  return <div className="wrap page-shell"><PageTitle title="سلة الطلب" description="راجع الكميات والعروض قبل إرسال بيانات التواصل." />{lines.length === 0 ? <EmptyState title="سلتك فارغة الآن" body="أضف لوحًا متاحًا من بيانات العرض لمتابعة الطلب التجريبي." to="/products" action="تصفح الألواح" /> : <div className="cart-layout"><div className="cart-items">{groups.map(({ supplier, lines: groupLines }) => <section className="cart-supplier-group" key={supplier.id}><div className="cart-group-head"><div><small>المورد</small><Link to={`/suppliers/${supplier.id}`}>{supplier.name}</Link></div><span>{groupLines.length} منتجات</span></div>{groupLines.map(({ line, product }) => <article className="cart-row" key={product.id}><div className="cart-item-main"><span className="cart-material-chip">{product.material}</span><div><Link to={`/products/${product.id}`}><h2>{product.name}</h2></Link><p>{dimensions(product)} · {formatMoney(product.price)} ج.م / {product.unit}</p><span className="demo-caption">السعر والكمية بيانات تجريبية</span></div></div><div className="cart-row-controls"><QuantityControl value={line.quantity} onChange={(quantity) => changeQuantity(product.id, quantity)} max={Math.max(1, product.stock)} /><strong>{formatMoney(product.price * line.quantity)} ج.م</strong><button type="button" className="link-button danger-link" onClick={() => remove(product.id)}>إزالة</button></div></article>)}</section>)}<Notice tone="warning">تضم السلة عروضًا من موردين مستقلين. آلية إرسال الطلبات متعددة الموردين ما زالت قرارًا مفتوحًا؛ هذا النموذج لا يوزع الطلب على الموردين.</Notice></div><aside className="cart-summary"><h2>ملخص تجريبي</h2><div><span>عدد الألواح</span><strong>{lines.reduce((sum, { line }) => sum + line.quantity, 0)}</strong></div><div><span>قيمة المنتجات</span><strong>{formatMoney(total)} ج.م</strong></div><p>لا تشمل القيمة أي رسوم أو شحن. لا يتم تحصيل دفعة.</p><Link className="button button-primary full-button" to="/checkout">متابعة كضيف <Icon name="arrow" /></Link><Link className="summary-back-link" to="/products">العودة للتصفح</Link></aside></div>}</div>
}

export function CheckoutPage() {
  const { state, setState } = useApp()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const lines = state.cart.map((line) => ({ line, product: productFor(state.products, line.productId) })).filter((entry): entry is { line: (typeof state.cart)[number]; product: Product } => Boolean(entry.product))
  const total = lines.reduce((sum, { line, product }) => sum + line.quantity * product.price, 0)
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const phone = phoneDigits(String(data.get('phone') ?? ''))
    if (phone.length < 10 || phone.length > 13) { setError('أدخل رقم موبايل من 10 إلى 13 رقمًا للمتابعة.'); return }
    const request: BuyerRequest = {
      id: `BR-${Date.now().toString().slice(-6)}`,
      name: String(data.get('name') ?? ''), phone,
      city: String(data.get('city') ?? ''),
      note: String(data.get('note') ?? ''), createdAt: new Date().toISOString().slice(0, 10),
      items: lines.map(({ line }) => line), total,
    }
    setState((current) => ({ ...current, cart: [], buyerRequests: [...current.buyerRequests, request], lastRequestId: request.id }))
    navigate('/order-success')
  }
  if (!lines.length) return <div className="wrap page-shell"><EmptyState title="أضف ألواحًا قبل إرسال الطلب" body="لا يمكن إرسال طلب تجريبي من سلة فارغة." to="/products" action="العودة إلى الألواح" /></div>
  return <div className="wrap page-shell"><div className="breadcrumbs"><Link to="/cart">سلة الطلب</Link><span>/</span><span>بيانات التواصل</span></div><PageTitle title="إرسال طلب تجريبي" description="أدخل بيانات التواصل المطلوبة. لا تحتاج إلى تسجيل الدخول." /><div className="checkout-layout"><form className="checkout-form" onSubmit={submit} noValidate><fieldset><legend>بيانات التواصل</legend><div className="form-grid"><label className="form-field"><span>الاسم <b>*</b></span><input name="name" autoComplete="name" required placeholder="الاسم بالكامل" /></label><label className="form-field"><span>رقم الموبايل <b>*</b></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-describedby="phone-hint phone-error" aria-invalid={Boolean(error)} placeholder="01xxxxxxxxx" /><small id="phone-hint">رقم من 10 إلى 13 رقمًا</small></label><label className="form-field"><span>المدينة <small>اختياري</small></span><select name="city" defaultValue=""><option value="">لم تُحدد</option><option>القاهرة</option><option>الجيزة</option><option>الإسكندرية</option><option>مدينة أخرى</option></select></label><label className="form-field form-field-wide"><span>ملاحظة للمورد <small>اختياري</small></span><textarea name="note" rows={3} placeholder="اكتب أي تفاصيل تساعد على مراجعة الطلب" /></label></div></fieldset><Notice tone="warning">السلة قد تحتوي على عروض من أكثر من مورد. طريقة التعامل مع الطلبات متعددة الموردين لم تُحسم بعد؛ الإرسال هنا محلي للعرض فقط.</Notice><p className="form-error" id="phone-error" role="alert">{error}</p><button className="button button-primary" type="submit">تأكيد الطلب التجريبي <Icon name="arrow" /></button></form><aside className="checkout-summary"><h2>ملخص السلة</h2>{lines.map(({ line, product }) => { const supplier = supplierFor(state.suppliers, product.supplierId); return <div className="checkout-line" key={product.id}><span>{product.name}<small>المورد: {supplier.name}</small><small>{line.quantity} × {formatMoney(product.price)} ج.م</small></span><strong>{formatMoney(line.quantity * product.price)} ج.م</strong></div> })}<div className="checkout-total"><span>قيمة توضيحية</span><strong>{formatMoney(total)} ج.م</strong></div><p>لا يوجد دفع إلكتروني أو رسوم شحن في هذا النموذج.</p></aside></div></div>
}

export function OrderSuccessPage() {
  const { state } = useApp()
  const request = state.buyerRequests.find((item) => item.id === state.lastRequestId)
  return <div className="wrap page-shell order-success"><div className="success-symbol"><span /></div><p className="success-label">تم حفظ الطلب في النموذج</p><h1>طلبك التجريبي جاهز للمراجعة.</h1><p className="success-copy">هذه رسالة تأكيد محلية فقط. لم يتم إرسال الطلب إلى مورد أو إنشاء التزام شراء.</p>{request && <div className="success-receipt"><div><span>رقم مرجعي تجريبي</span><strong>{request.id}</strong></div><div><span>اسم مقدم الطلب</span><strong>{request.name}</strong></div><div><span>عدد الألواح</span><strong>{request.items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div><div><span>قيمة توضيحية</span><strong>{formatMoney(request.total)} ج.م</strong></div></div>}<Notice tone="warning">الموردون يراجعون طلبات منتجاتهم في التصور المقترح. التوزيع الفعلي لطلب يضم عدة موردين لم يُحسم، ولن يرسل هذا النموذج بياناتك.</Notice><div className="success-actions"><Link className="button button-primary" to="/products">متابعة التصفح</Link><Link className="button button-outline" to="/">العودة للرئيسية</Link></div></div>
}

function SupplierAuthShell({ children }: { children: ReactNode }) {
  return <div className="auth-shell">
    <header className="auth-header"><BrandLogo /><Link className="auth-store-link" to="/">العودة إلى المتجر <Icon name="arrow" size={16} /></Link></header>
    <main className="auth-page">
      <section className="auth-aside"><h1>من عروض واضحة<br />إلى طلبات أسهل.</h1><p>حدّث منتجاتك، وراجع الطلبات الموجهة إلى شركتك من مساحة واحدة.</p><div className="auth-note"><strong>مساحة المورد</strong><span>تجربة محلية تحفظ تغييراتك على هذا الجهاز.</span></div></section>
      <section className="auth-card">{children}</section>
    </main>
  </div>
}

export function SupplierLoginPage() {
  const { state, setState } = useApp()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const phone = phoneDigits(String(data.get('phone') ?? ''))
    const password = String(data.get('password') ?? '')
    if (phone.length < 10 || phone.length > 13) { setError('أدخل رقم موبايل من 10 إلى 13 رقمًا.'); return }
    if (password.length < 4) { setError('أدخل كلمة مرور من 4 أحرف على الأقل.'); return }
    setError('')
    setState((current) => ({ ...current, supplierSignedIn: true }))
    navigate('/supplier/dashboard')
  }
  return <SupplierAuthShell><h2>دخول المورد</h2><p>أي رقم موبايل وكلمة مرور من 4 أحرف يفتحان الحساب التجريبي.</p>{state.supplierSignedIn && <Notice tone="success">أنت داخل الوضع التجريبي. يمكنك متابعة مساحة المورد.</Notice>}<form onSubmit={submit} className="form-stack" noValidate><label className="form-field"><span>رقم الموبايل <b>*</b></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-describedby="login-phone-hint" placeholder="01xxxxxxxxx" /><small id="login-phone-hint">اقبل الأرقام العربية أو الإنجليزية، من 10 إلى 13 رقمًا.</small></label><label className="form-field"><span>كلمة المرور <b>*</b></span><input name="password" type="password" autoComplete="current-password" minLength={4} required placeholder="••••••••" /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary full-button" type="submit">دخول تجريبي <Icon name="arrow" /></button></form><p className="auth-switch">ليس لديك حساب؟ <Link to="/supplier/register">أنشئ ملفًا تجريبيًا</Link></p></SupplierAuthShell>
}

export function SupplierRegisterPage() {
  const { setState } = useApp()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const name = String(data.get('company') ?? '').trim()
    const contactName = String(data.get('contact') ?? '').trim()
    const phone = phoneDigits(String(data.get('phone') ?? ''))
    const city = String(data.get('city') ?? 'القاهرة')
    if (name.length < 2 || contactName.length < 2 || phone.length < 10 || phone.length > 13) { setError('أكمل اسم الشركة واسم التواصل ورقم موبايل من 10 إلى 13 رقمًا.'); return }
    setError('')
    setState((current) => ({ ...current, supplierSignedIn: true, company: { ...current.company, name, contactName, phone, city }, suppliers: current.suppliers.map((supplier) => supplier.id === 's1' ? { ...supplier, name, city, phone } : supplier) }))
    navigate('/supplier/dashboard')
  }
  return <SupplierAuthShell><h2>إنشاء ملف المورد</h2><p>أدخل بيانات الشركة للانتقال إلى مساحة المورد التجريبية.</p><Notice>لا يوجد اعتماد للشركات. تحفظ البيانات على هذا الجهاز فقط.</Notice><form onSubmit={submit} className="form-stack" noValidate><label className="form-field"><span>اسم الشركة <b>*</b></span><input name="company" required minLength={2} autoComplete="organization" placeholder="اسم الشركة" /></label><label className="form-field"><span>اسم جهة التواصل <b>*</b></span><input name="contact" required minLength={2} autoComplete="name" placeholder="الاسم بالكامل" /></label><label className="form-field"><span>رقم الموبايل <b>*</b></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-describedby="register-phone-hint" placeholder="01xxxxxxxxx" /><small id="register-phone-hint">اقبل الأرقام العربية أو الإنجليزية، من 10 إلى 13 رقمًا.</small></label><label className="form-field"><span>المدينة</span><select name="city" defaultValue="القاهرة"><option>القاهرة</option><option>الجيزة</option><option>الإسكندرية</option><option>أخرى</option></select></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary full-button" type="submit">إنشاء ملف تجريبي <Icon name="arrow" /></button></form><p className="auth-switch">لديك ملف؟ <Link to="/supplier/login">دخول المورد</Link></p></SupplierAuthShell>
}

function PortalHeading({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return <div className="portal-heading"><div><h1>{title}</h1><p>{text}</p></div>{action}</div>
}

export function SupplierDashboardPage() {
  const { state } = useApp()
  const products = state.products.filter((product) => product.supplierId === 's1')
  const orders = state.supplierOrders.filter((order) => order.supplierId === 's1')
  const pending = orders.filter((order) => order.status === 'pending').length
  const available = products.filter((product) => product.available && product.stock > 0).length
  const stockCount = products.reduce((sum, product) => sum + product.stock, 0)
  return <><PortalHeading title={`أهلًا، ${state.company.contactName.split(' ')[0]}`} text="إدارة عروضك ومتابعة الطلبات الموجهة إلى شركتك." action={<Link className="button button-primary" to="/supplier/products/new"><Icon name="plus" /> إضافة منتج</Link>} /><div className="dashboard-summary" aria-label="ملخص الشركة"><div><strong>{orders.length}</strong><span>طلبات الشركة</span></div><div><strong>{pending}</strong><span>تحتاج مراجعة</span></div><div><strong>{available} <small>/ {products.length}</small></strong><span>منتجات متاحة</span></div><div><strong>{formatMoney(stockCount)}</strong><span>لوح في المخزون</span></div></div><section className="portal-section portal-order-queue"><div className="portal-section-heading"><div><h2>طلبات تحتاج إلى مراجعة</h2><p>افتح الطلب لمراجعة بياناته وتسجيل القبول أو الرفض.</p></div><Link to="/supplier/orders" className="text-link">كل الطلبات <Icon name="arrow" size={16} /></Link></div>{orders.length ? <div className="order-queue-list">{orders.slice(0, 4).map((order) => <Link className="queue-order" to={`/supplier/orders/${order.id}`} key={order.id}><span className="queue-order-id">{order.id}<small>{order.createdAt}</small></span><span className="queue-order-customer">{order.customer}</span><StatusBadge status={order.status} /><span className="queue-order-action">التفاصيل <Icon name="arrow" size={14} /></span></Link>)}</div> : <p className="portal-empty-copy">لا توجد طلبات موجهة إلى شركتك حتى الآن.</p>}</section><section className="portal-section portal-stock-section"><div className="portal-section-heading"><div><h2>حالة المنتجات</h2><p>تابع المخزون والتوفر من القائمة.</p></div><Link to="/supplier/products" className="text-link">إدارة المنتجات <Icon name="arrow" size={16} /></Link></div><div className="mini-product-rows">{products.slice(0, 4).map((product) => <Link to={`/supplier/products/${product.id}/edit`} key={product.id}><span className="mini-product-name">{product.name}<small>{dimensions(product)}</small></span><strong className="mini-product-stock">{formatMoney(product.stock)} لوح</strong><span className={`stock-state ${product.available && product.stock ? 'stock-state-on' : 'stock-state-off'}`}>{product.available && product.stock ? 'متاح' : 'غير متاح'}</span></Link>)}</div></section></>
}

export function SupplierProductsPage() {
  const { state, setState } = useApp()
  const products = state.products.filter((product) => product.supplierId === 's1')
  const [message, setMessage] = useState('')
  const updateProduct = (id: string, patch: Partial<Product>) => setState((current) => ({ ...current, products: current.products.map((product) => product.id === id ? { ...product, ...patch } : product) }))
  return <><PortalHeading title="المنتجات" text="حدّث بيانات اللوح والسعر والتوفر في النسخة المحلية." action={<Link className="button button-primary" to="/supplier/products/new"><Icon name="plus" /> إضافة منتج</Link>} />{message && <Notice tone="success">{message}</Notice>}<div className="portal-toolbar"><span>{products.length} منتجات في بيانات العرض</span><span>السعر لكل لوح · العملة ج.م</span></div><div className="portal-table-wrap"><table className="portal-table product-management-table"><thead><tr><th>المنتج</th><th>الأبعاد</th><th>السعر / لوح</th><th>المخزون التجريبي</th><th>التوفر</th><th>تعديل</th></tr></thead><tbody>{products.map((product) => <tr key={product.id}><td><strong>{product.name}</strong><small>{product.material} · {product.code}</small></td><td>{dimensions(product)}</td><td>{formatMoney(product.price)} ج.م</td><td><label className="stock-input"><span className="sr-only">مخزون {product.name}</span><input type="number" min="0" value={product.stock} onChange={(event) => updateProduct(product.id, { stock: Math.max(0, Number(event.target.value) || 0) })} /></label></td><td><button type="button" className={`availability-toggle ${product.available ? 'on' : ''}`} aria-pressed={product.available} onClick={() => { updateProduct(product.id, { available: !product.available }); setMessage(`تم تحديث حالة ${product.name} محليًا.`) }}>{product.available ? 'متاح' : 'غير متاح'}</button></td><td><Link className="table-link" to={`/supplier/products/${product.id}/edit`}>تعديل</Link></td></tr>)}</tbody></table></div><p className="table-footnote">تُحفظ التعديلات في متصفحك فقط ولا تُرسل إلى خدمة خارجية.</p></>
}

const blankProduct: Product = { id: '', name: '', material: 'MDF', length: 244, width: 122, thickness: 18, price: 0, unit: 'لوح', supplierId: 's1', stock: 0, available: true, code: '' }

export function SupplierProductFormPage({ mode }: { mode: 'new' | 'edit' }) {
  const { id = '' } = useParams()
  const { state, setState } = useApp()
  const navigate = useNavigate()
  const existing = state.products.find((product) => product.id === id)
  const [form, setForm] = useState<Product>(() => mode === 'edit' && existing ? existing : blankProduct)
  const [error, setError] = useState('')
  if (mode === 'edit' && !existing) return <EmptyState title="المنتج غير موجود" body="تأكد من الرابط أو ارجع إلى قائمة منتجات شركتك." to="/supplier/products" action="قائمة المنتجات" />
  const update = (key: keyof Product, value: string | number | boolean) => setForm((current) => ({ ...current, [key]: value }))
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.price <= 0 || form.stock < 0 || form.length <= 0 || form.width <= 0 || form.thickness <= 0) { setError('أدخل سعرًا ومقاسات صحيحة، ومخزونًا يساوي صفرًا أو أكثر.'); return }
    if (mode === 'new') {
      const newProduct = { ...form, id: `p-${Date.now()}`, code: `BR-${Date.now().toString().slice(-5)}` }
      setState((current) => ({ ...current, products: [newProduct, ...current.products] }))
    } else setState((current) => ({ ...current, products: current.products.map((product) => product.id === id ? form : product) }))
    navigate('/supplier/products')
  }
  return <><Link className="back-to-list" to="/supplier/products"><Icon name="arrow" size={16} /> العودة للمنتجات</Link><PortalHeading title={mode === 'new' ? 'إضافة منتج' : 'تعديل المنتج'} text="أدخل تفاصيل اللوح وسعره لكل وحدة بوضوح." /><Notice>استخدم بيانات توضيحية. لا ينشر هذا النموذج عرضًا حقيقيًا.</Notice><form className="portal-form" onSubmit={submit}><div className="form-grid"><label className="form-field form-field-wide"><span>اسم المنتج <b>*</b></span><input required minLength={2} value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="مثال: لوح MDF خام" /></label><label className="form-field"><span>الخامة <b>*</b></span><select value={form.material} onChange={(event) => update('material', event.target.value)}>{materials.map((item) => <option key={item}>{item}</option>)}</select></label><label className="form-field"><span>السعر بالجنيه لكل لوح <b>*</b></span><input type="number" required min="1" inputMode="numeric" value={form.price || ''} onChange={(event) => update('price', Number(event.target.value))} /></label><label className="form-field"><span>الطول (سم) <b>*</b></span><input type="number" required min="1" value={form.length || ''} onChange={(event) => update('length', Number(event.target.value))} /></label><label className="form-field"><span>العرض (سم) <b>*</b></span><input type="number" required min="1" value={form.width || ''} onChange={(event) => update('width', Number(event.target.value))} /></label><label className="form-field"><span>السُمك (مم) <b>*</b></span><input type="number" required min="1" value={form.thickness || ''} onChange={(event) => update('thickness', Number(event.target.value))} /></label><label className="form-field"><span>عدد الألواح في المخزون التوضيحي</span><input type="number" min="0" value={form.stock} onChange={(event) => update('stock', Number(event.target.value))} /></label><label className="check-row form-check-row"><input type="checkbox" checked={form.available} onChange={(event) => update('available', event.target.checked)} /><span>إظهار المنتج كمتاح</span></label></div>{error && <p className="form-error" role="alert">{error}</p>}<div className="form-actions"><button className="button button-primary" type="submit">{mode === 'new' ? 'حفظ المنتج تجريبيًا' : 'حفظ التعديلات'} <Icon name="arrow" /></button><Link className="button button-outline" to="/supplier/products">إلغاء</Link></div></form></>
}

export function SupplierOrdersPage() {
  const { state } = useApp()
  const [status, setStatus] = useState('all')
  const orders = state.supplierOrders.filter((order) => order.supplierId === 's1' && (status === 'all' || order.status === status))
  return <><PortalHeading title="الطلبات" text="راجع الطلبات النموذجية الموجهة إلى شركتك." /><Notice>طلبات هذا الجدول افتراضية. طلبات العملاء في واجهة المتجر لا تُرسل إلى هذه القائمة.</Notice><div className="orders-filter"><label htmlFor="order-status">الحالة</label><select id="order-status" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">كل الحالات</option><option value="pending">قيد المراجعة</option><option value="accepted">مقبول</option><option value="rejected">مرفوض</option></select><span>{orders.length} طلبات تجريبية</span></div>{orders.length ? <div className="portal-table-wrap"><table className="portal-table"><thead><tr><th>رقم الطلب</th><th>اسم العميل</th><th>عدد الألواح</th><th>التاريخ</th><th>الحالة</th><th></th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><Link to={`/supplier/orders/${order.id}`}>{order.id}</Link></td><td>{order.customer}<small dir="ltr">{order.phone}</small></td><td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td><td>{order.createdAt}</td><td><StatusBadge status={order.status} /></td><td><Link to={`/supplier/orders/${order.id}`} className="table-link">عرض الطلب</Link></td></tr>)}</tbody></table></div> : <div className="empty-results"><h2>لا توجد طلبات بهذه الحالة</h2><p>اختر حالة أخرى لعرض البيانات التجريبية.</p></div>}</>
}

export function SupplierOrderDetailPage() {
  const { id = '' } = useParams()
  const { state, setState } = useApp()
  const order = state.supplierOrders.find((item) => item.id === id && item.supplierId === 's1')
  if (!order) return <EmptyState title="لم نعثر على الطلب" body="هذا الطلب غير موجود في بيانات الشركة التجريبية." to="/supplier/orders" action="العودة للطلبات" />
  const items = order.items.map((line) => ({ line, product: productFor(state.products, line.productId) })).filter((item): item is { line: (typeof order.items)[number]; product: Product } => Boolean(item.product))
  const update = (status: 'accepted' | 'rejected') => setState((current) => ({ ...current, supplierOrders: current.supplierOrders.map((item) => item.id === order.id ? { ...item, status } : item) }))
  return <><Link className="back-to-list" to="/supplier/orders"><Icon name="arrow" size={16} /> العودة للطلبات</Link><PortalHeading title={`طلب ${order.id}`} text={`تاريخ الطلب: ${order.createdAt} · بيانات تجريبية`} action={<StatusBadge status={order.status} />} /><div className="order-detail-grid"><section className="portal-section order-customer"><h2>بيانات العميل التجريبية</h2><div><span>الاسم</span><strong>{order.customer}</strong></div><div><span>رقم الهاتف</span><strong dir="ltr">{order.phone}</strong></div><div><span>ملاحظات</span><strong>{order.note || 'لا توجد ملاحظات'}</strong></div></section><section className="portal-section order-detail-items"><h2>الألواح المطلوبة</h2><div className="portal-table-wrap"><table className="portal-table"><thead><tr><th>المنتج</th><th>المقاس</th><th>الكمية</th><th>قيمة توضيحية</th></tr></thead><tbody>{items.map(({ line, product }) => <tr key={product.id}><td>{product.name}<small>{product.material}</small></td><td>{dimensions(product)}</td><td>{line.quantity} لوح</td><td>{formatMoney(product.price * line.quantity)} ج.م</td></tr>)}</tbody></table></div><p className="table-footnote">القيم لا تمثل سعرًا مؤكدًا أو فاتورة.</p></section></div><section className="order-decision"><div><h2>قرار المورد</h2><p>يمكنك تجربة تحديث حالة هذا الطلب النموذجي.</p></div><div className="form-actions"><button type="button" className="button button-primary" disabled={order.status !== 'pending'} onClick={() => update('accepted')}>قبول الطلب</button><button type="button" className="button button-danger" disabled={order.status !== 'pending'} onClick={() => update('rejected')}>رفض الطلب</button></div>{order.status !== 'pending' && <span className="decision-help">تم تسجيل القرار محليًا ولا يمكن تغييره في هذا النموذج.</span>}</section></>
}

export function SupplierSettingsPage() {
  const { state, setState } = useApp()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const company = { name: String(data.get('name') ?? '').trim(), contactName: String(data.get('contact') ?? '').trim(), phone: phoneDigits(String(data.get('phone') ?? '')), city: String(data.get('city') ?? ''), address: String(data.get('address') ?? '').trim(), description: String(data.get('description') ?? '').trim() }
    if (company.name.length < 2 || company.contactName.length < 2 || company.phone.length < 10 || company.phone.length > 13) { setError('تحقق من اسم الشركة واسم التواصل ورقم موبايل من 10 إلى 13 رقمًا.'); setSaved(false); return }
    setState((current) => ({ ...current, company, suppliers: current.suppliers.map((supplier) => supplier.id === 's1' ? { ...supplier, name: company.name, city: company.city, address: company.address, phone: company.phone, description: company.description } : supplier) }))
    setError(''); setSaved(true)
  }
  return <><PortalHeading title="بيانات الشركة" text="حدّث الملف التعريفي التجريبي الذي يظهر بجوار منتجاتك." /><Notice>أي تعديل هنا محلي على جهازك ولا يُرسل إلى BRANCH أو العملاء.</Notice>{saved && <Notice tone="success">تم حفظ بيانات الشركة محليًا.</Notice>}<form className="portal-form" onSubmit={submit}><div className="form-grid"><label className="form-field"><span>اسم الشركة <b>*</b></span><input name="name" required defaultValue={state.company.name} /></label><label className="form-field"><span>اسم جهة التواصل <b>*</b></span><input name="contact" required defaultValue={state.company.contactName} /></label><label className="form-field"><span>رقم الموبايل <b>*</b></span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-describedby="settings-phone-hint" defaultValue={state.company.phone} /><small id="settings-phone-hint">اقبل الأرقام العربية أو الإنجليزية، من 10 إلى 13 رقمًا.</small></label><label className="form-field"><span>المدينة</span><select name="city" defaultValue={state.company.city}><option>القاهرة</option><option>الجيزة</option><option>الإسكندرية</option><option>أخرى</option></select></label><label className="form-field"><span>العنوان</span><input name="address" defaultValue={state.company.address} /></label><label className="form-field form-field-wide"><span>نبذة قصيرة</span><textarea name="description" rows={4} defaultValue={state.company.description} /></label></div>{error && <p className="form-error" role="alert">{error}</p>}<div className="form-actions"><button className="button button-primary" type="submit">حفظ التغييرات</button><Link className="button button-outline" to={`/suppliers/s1`}>عرض الملف العام</Link></div></form><section className="settings-decisions"><h2>قبل الإطلاق الفعلي</h2><p>اعتماد الموردين، تفاصيل العنوان والتوصيل، وطريقة التعامل مع طلب يضم منتجات من أكثر من مورد قرارات مفتوحة.</p></section></>
}

export function NotFoundPage() {
  return <div className="wrap page-shell"><EmptyState title="هذه الصفحة غير موجودة" body="تحقق من الرابط أو ارجع إلى تصفح الألواح." to="/" action="العودة للرئيسية" /></div>
}
