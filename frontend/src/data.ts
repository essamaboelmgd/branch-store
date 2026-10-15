import type { AppState, Product, Supplier } from './types'

const unsplashPhoto = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const woodPhotos = {
  warehouse: unsplashPhoto('photo-1690768162582-342e1e9097a2', 1800),
  lumberPile: unsplashPhoto('photo-1564522606461-abbc84c73c11', 1200),
  particleBoard: unsplashPhoto('photo-1758749130179-46ebeba477bb', 1000),
  workshopWorkers: unsplashPhoto('photo-1769430838075-4bbbd79f914b', 1400),
  woodworker: unsplashPhoto('photo-1722411927625-0e478acf502b', 1000),
  carpenter: unsplashPhoto('photo-1769353086138-19ee65291a04', 1000),
  plankStack: unsplashPhoto('photo-1733058017950-8b227136473d', 1000),
  studioPanels: unsplashPhoto('photo-1760794751749-6df8746cf42b', 1000),
}

const productPhotos: Record<string, string> = {
  p1: woodPhotos.particleBoard,
  p2: woodPhotos.plankStack,
  p3: woodPhotos.lumberPile,
  p4: woodPhotos.studioPanels,
  p5: woodPhotos.woodworker,
  p6: woodPhotos.lumberPile,
  p7: woodPhotos.particleBoard,
  p8: woodPhotos.studioPanels,
}

export function productImageFor(product: Product) {
  if (productPhotos[product.id]) return productPhotos[product.id]
  if (product.material === 'خشب طبيعي') return woodPhotos.woodworker
  if (product.material === 'كونتر') return woodPhotos.lumberPile
  if (product.material === 'HDF') return woodPhotos.studioPanels
  return woodPhotos.particleBoard
}

export const demoSuppliers: Supplier[] = [
  {
    id: 's1', name: 'لوحيات الدلتا', city: 'القاهرة',
    description: 'مورد تجريبي للألواح الخشبية ومواد الأثاث. بيانات الشركة والأسعار للعرض فقط.',
    phone: '01012345678', address: 'مدينة نصر، القاهرة', years: 12,
    materials: ['MDF', 'كونتر', 'خشب طبيعي'],
  },
  {
    id: 's2', name: 'ورشة النيل للأخشاب', city: 'الجيزة',
    description: 'قائمة تجريبية لمقاسات متعددة من ألواح MDF وHDF.',
    phone: '01123456789', address: 'فيصل، الجيزة', years: 8,
    materials: ['MDF', 'HDF'],
  },
  {
    id: 's3', name: 'مخزن المحور', city: 'الإسكندرية',
    description: 'مورد توضيحي لألواح الكونتر والخشب الطبيعي.',
    phone: '01234567890', address: 'سموحة، الإسكندرية', years: 6,
    materials: ['كونتر', 'خشب طبيعي'],
  },
]

export const demoProducts: Product[] = [
  { id: 'p1', name: 'لوح MDF خام', material: 'MDF', length: 244, width: 122, thickness: 18, price: 820, unit: 'لوح', supplierId: 's1', stock: 34, available: true, code: 'BR-MDF-18' },
  { id: 'p2', name: 'لوح MDF أبيض', material: 'MDF', length: 244, width: 122, thickness: 16, price: 960, unit: 'لوح', supplierId: 's2', stock: 18, available: true, code: 'BR-MDF-16W' },
  { id: 'p3', name: 'لوح كونتر مقاوم للرطوبة', material: 'كونتر', length: 244, width: 122, thickness: 18, price: 1320, unit: 'لوح', supplierId: 's3', stock: 0, available: false, code: 'BR-PW-18' },
  { id: 'p4', name: 'لوح HDF ناعم', material: 'HDF', length: 244, width: 122, thickness: 6, price: 420, unit: 'لوح', supplierId: 's2', stock: 42, available: true, code: 'BR-HDF-06' },
  { id: 'p5', name: 'لوح زان طبيعي', material: 'خشب طبيعي', length: 220, width: 110, thickness: 25, price: 2150, unit: 'لوح', supplierId: 's1', stock: 9, available: true, code: 'BR-BEECH-25' },
  { id: 'p6', name: 'لوح كونتر تجريبي', material: 'كونتر', length: 244, width: 122, thickness: 12, price: 990, unit: 'لوح', supplierId: 's3', stock: 16, available: true, code: 'BR-PW-12' },
  { id: 'p7', name: 'لوح MDF مقاوم للرطوبة', material: 'MDF', length: 244, width: 122, thickness: 18, price: 1180, unit: 'لوح', supplierId: 's1', stock: 13, available: true, code: 'BR-MDF-MR18' },
  { id: 'p8', name: 'لوح HDF أبيض', material: 'HDF', length: 244, width: 122, thickness: 3, price: 290, unit: 'لوح', supplierId: 's2', stock: 27, available: true, code: 'BR-HDF-03W' },
]

const now = new Date().toISOString().slice(0, 10)

export const initialState: AppState = {
  products: demoProducts,
  suppliers: demoSuppliers,
  cart: [],
  compareIds: [],
  supplierOrders: [
    { id: 'REQ-1042', supplierId: 's1', customer: 'محمود سمير', phone: '01098765432', createdAt: now, status: 'pending', items: [{ productId: 'p1', quantity: 4 }, { productId: 'p7', quantity: 2 }], note: 'يرجى تأكيد المقاس والتوفر.' },
    { id: 'REQ-1039', supplierId: 's1', customer: 'سارة عادل', phone: '01187654321', createdAt: now, status: 'accepted', items: [{ productId: 'p5', quantity: 1 }], note: 'طلب تجريبي سابق.' },
    { id: 'REQ-1034', supplierId: 's1', customer: 'عمر خالد', phone: '01276543210', createdAt: now, status: 'rejected', items: [{ productId: 'p1', quantity: 10 }], note: 'بيانات مثال.' },
  ],
  buyerRequests: [],
  company: {
    name: demoSuppliers[0].name, contactName: 'أحمد محمود', phone: '01012345678',
    city: 'القاهرة', address: 'مدينة نصر، القاهرة',
    description: 'بيانات شركة تجريبية داخل نموذج BRANCH.',
  },
  supplierSignedIn: false,
  lastRequestId: null,
}

export const materials = ['MDF', 'HDF', 'كونتر', 'خشب طبيعي']

export function supplierFor(suppliers: Supplier[], id: string) {
  return suppliers.find((supplier) => supplier.id === id) ?? suppliers[0]
}

export function productFor(products: Product[], id: string) {
  return products.find((product) => product.id === id)
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 0 }).format(value)
}

export function dimensions(product: Product) {
  return `${product.length} × ${product.width} سم · ${product.thickness} مم`
}
