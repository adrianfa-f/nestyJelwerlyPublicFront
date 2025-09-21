import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/layout/Navbar";
import Footer from "./componentes/layout/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import CategoryProducts from "./pages/CategoryProducts";
import MaterialesPremium from "./pages/benefits/MaterialesPremium";
import HechoAMano from "./pages/benefits/HechoAMano";
import EnvioGratis from "./pages/benefits/EnvioGratis";
import GarantiaCalidad from "./pages/benefits/GarantiaCalidad";
import Ubicaciones from "./pages/Ubiaciones";
import ScrollToTop from "./componentes/ScrollToTop";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderTracking from "./page/OrderTracking";

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <WishlistProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <ScrollToTop />
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route
                    path="/category/:categoryName"
                    element={<CategoryProducts />}
                  />
                  <Route
                    path="/beneficios/materiales-premium"
                    element={<MaterialesPremium />}
                  />
                  <Route
                    path="/beneficios/hecho-a-mano"
                    element={<HechoAMano />}
                  />
                  <Route
                    path="/beneficios/envio-gratis"
                    element={<EnvioGratis />}
                  />
                  <Route
                    path="/beneficios/garantia-calidad"
                    element={<GarantiaCalidad />}
                  />
                  <Route path="/ubicaciones" element={<Ubicaciones />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-tracking" element={<OrderTracking />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
