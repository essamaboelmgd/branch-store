export type Supplier = {
  id: string
  name: string
  city: string
  description: string
  phone: string
  address: string
  years: number
  materials: string[]
}

export type Product = {
  id: string
  name: string
  material: string
  length: number
  width: number
  thickness: number
  price: number
  unit: string
  supplierId: string
  stock: number
  available: boolean
  code: string
}

export type CartLine = { productId: string; quantity: number }
export type DemoOrderStatus = 'pending' | 'accepted' | 'rejected'
export type DemoOrder = {
  id: string
  supplierId: string
  customer: string
  phone: string
  createdAt: string
  status: DemoOrderStatus
  items: CartLine[]
  note: string
}

export type BuyerRequest = {
  id: string
  name: string
  phone: string
  city: string
  note: string
  createdAt: string
  items: CartLine[]
  total: number
}

export type CompanyProfile = {
  name: string
  contactName: string
  phone: string
  city: string
  address: string
  description: string
}

export type AppState = {
  products: Product[]
  suppliers: Supplier[]
  cart: CartLine[]
  compareIds: string[]
  supplierOrders: DemoOrder[]
  buyerRequests: BuyerRequest[]
  company: CompanyProfile
  supplierSignedIn: boolean
  lastRequestId: string | null
}
