import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { PortalLayout, StoreLayout } from './components'
import {
  CartPage, CheckoutPage, ComparePage, HomePage, NotFoundPage, OrderSuccessPage,
  ProductDetailPage, ProductsPage, SupplierDashboardPage, SupplierLoginPage,
  SupplierOrderDetailPage, SupplierOrdersPage, SupplierProductFormPage,
  SupplierProductsPage, SupplierProfilePage, SupplierRegisterPage,
  SupplierSettingsPage, SuppliersPage,
} from './pages'
import { StoreProvider, useApp } from './store'

function Public({ children }: { children: ReactNode }) {
  return <StoreLayout>{children}</StoreLayout>
}

function Portal({ children }: { children: ReactNode }) {
  const { state } = useApp()
  return state.supplierSignedIn ? <PortalLayout>{children}</PortalLayout> : <Navigate to="/supplier/login" replace />
}

export default function App() {
  return <StoreProvider><HashRouter><Routes>
    <Route path="/" element={<Public><HomePage /></Public>} />
    <Route path="/products" element={<Public><ProductsPage /></Public>} />
    <Route path="/products/:id" element={<Public><ProductDetailPage /></Public>} />
    <Route path="/suppliers" element={<Public><SuppliersPage /></Public>} />
    <Route path="/suppliers/:id" element={<Public><SupplierProfilePage /></Public>} />
    <Route path="/compare" element={<Public><ComparePage /></Public>} />
    <Route path="/cart" element={<Public><CartPage /></Public>} />
    <Route path="/checkout" element={<Public><CheckoutPage /></Public>} />
    <Route path="/order-success" element={<Public><OrderSuccessPage /></Public>} />
    <Route path="/supplier/register" element={<SupplierRegisterPage />} />
    <Route path="/supplier/login" element={<SupplierLoginPage />} />
    <Route path="/supplier/dashboard" element={<Portal><SupplierDashboardPage /></Portal>} />
    <Route path="/supplier/products" element={<Portal><SupplierProductsPage /></Portal>} />
    <Route path="/supplier/products/new" element={<Portal><SupplierProductFormPage mode="new" /></Portal>} />
    <Route path="/supplier/products/:id/edit" element={<Portal><SupplierProductFormPage mode="edit" /></Portal>} />
    <Route path="/supplier/orders" element={<Portal><SupplierOrdersPage /></Portal>} />
    <Route path="/supplier/orders/:id" element={<Portal><SupplierOrderDetailPage /></Portal>} />
    <Route path="/supplier/settings" element={<Portal><SupplierSettingsPage /></Portal>} />
    <Route path="*" element={<Public><NotFoundPage /></Public>} />
  </Routes></HashRouter></StoreProvider>
}
