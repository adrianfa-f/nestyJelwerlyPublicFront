import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "../services/productService";
import {
  FaGem,
  FaHandSparkles,
  FaShippingFast,
  FaAward,
  FaMapMarkerAlt,
  FaPinterest,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import AC1 from "../assets/AC1.jfif";
import AC2 from "../assets/AC2.jfif";
import AM1 from "../assets/AM1.jfif";
import AM2 from "../assets/AM2.jfif";
import CC1 from "../assets/CC1.jfif";
import CC2 from "../assets/CC2.jfif";
import PB1 from "../assets/PB1.jfif";
import PB2 from "../assets/PB2.jfif";
import AP1 from "../assets/AP1.jfif";
import AP2 from "../assets/AP2.jfif";
import DC1 from "../assets/DC1.jfif";
import DC2 from "../assets/DC2.jfif";
import BA1 from "../assets/BA1.jfif";
import BA2 from "../assets/BA2.jfif";
import SEOWrapper from "../componentes/SEOWrapper";

const Home = () => {
  const {
    data: featuredProducts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: getFeaturedProducts,
  });

  // Imagen de fondo para el hero
  const heroBackgroundImage =
    "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

  // Categorías detalladas
  const detailedCategories = [
    {
      name: "Anillos compromiso",
      productImage: AC1,
      modelImage: AC2,
      link: "/category/Anillos compromiso",
    },
    {
      name: "Anillos matrimonio",
      productImage: AM1,
      modelImage: AM2,
      link: "/category/Anillos matrimonio",
    },
    {
      name: "Collares y cadenas",
      productImage: CC1,
      modelImage: CC2,
      link: "/category/Collares y cadenas",
    },
    {
      name: "Pulseras y brazaletes",
      productImage: PB1,
      modelImage: PB2,
      link: "/category/Pulseras y brazaletes",
    },
    {
      name: "Aretes y pendientes",
      productImage: AP1,
      modelImage: AP2,
      link: "/category/Aretes y pendientes",
    },
    {
      name: "Dijes y charms",
      productImage: DC1,
      modelImage: DC2,
      link: "/category/Dijes y charms",
    },
    {
      name: "Broches y alfileres",
      productImage: BA1,
      modelImage: BA2,
      link: "/category/Broches y alfileres",
    },
  ];

  // Beneficios de la marca
  const benefits = [
    {
      icon: <FaGem className="text-3xl text-emerald-600" />,
      title: "Materiales Premium",
      description:
        "Trabajamos con los mejores materiales para garantizar durabilidad y belleza.",
      link: "/beneficios/materiales-premium",
    },
    {
      icon: <FaHandSparkles className="text-3xl text-emerald-600" />,
      title: "Hecho a Mano",
      description:
        "Cada pieza es creada manualmente con atención a los detalles.",
      link: "/beneficios/hecho-a-mano",
    },
    {
      icon: <FaShippingFast className="text-3xl text-emerald-600" />,
      title: "Envío Gratis",
      description: "Envío gratuito en todos los pedidos superiores a 50€.",
      link: "/beneficios/envio-gratis",
    },
    {
      icon: <FaAward className="text-3xl text-emerald-600" />,
      title: "Garantía de Calidad",
      description: "Todas nuestras piezas cuentan con garantía de por vida.",
      link: "/beneficios/garantia-calidad",
    },
  ];

  return (
    <SEOWrapper
      title="Nesty Luxe Jewelry - Joyería Artesanal de Calidad | Inicio"
      description="Bienvenido a Nesty Luxe Jewelry. Descubre nuestra exclusiva colección de joyas artesanales. Anillos, collares, pulseras y más. Envío gratis."
      keywords="joyería artesanal, anillos de compromiso, collares elegantes, pulseras únicas, joyas de calidad"
      image="/images/home-og.jpg"
    >
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* Hero Section */}
          <section
            className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat py-20"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackgroundImage})`,
            }}
          >
            <div className="container mx-auto px-4 text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Joyería Artesanal de Alta Calidad
              </h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Descubre piezas únicas elaboradas con pasión y dedicación por
                artesanos expertos
              </p>
              <Link
                to="/catalog"
                className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 inline-block"
              >
                Descubrir Colección
              </Link>
            </div>
          </section>

          {/* Sección de Categorías Detalladas - Versión Mejorada para Móviles */}
          <section className="py-10 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Explora por Categoría
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                  Descubre nuestras colecciones exclusivas organizadas por
                  categorías
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 md:gap-4">
                {detailedCategories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.link}
                    className="group bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg         md:hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2"
                  >
                    <div className="relative h-40 md:h-56 overflow-hidden">
                      {/* Imagen del producto (visible por defecto) */}
                      <img
                        src={category.productImage}
                        alt={category.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0"
                      />

                      {/* Imagen del modelo usando el producto (aparece en hover) */}
                      <img
                        src={category.modelImage}
                        alt={`Modelo usando ${category.name}`}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
                      />

                      {/* Overlay con nombre de categoría (solo visible en hover en desktop) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity        duration-300 flex items-end justify-center p-3">
                        <h3 className="text-white text-xs md:text-sm font-semibold text-center">
                          {category.name}
                        </h3>
                      </div>
                    </div>

                    {/* Nombre de categoría siempre visible en móviles, oculto en desktop (aparece en hover) */}
                    <div className="p-2 md:hidden">
                      <h3 className="text-gray-800 text-xs font-semibold text-center truncate">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Productos Destacados */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Piezas Destacadas
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Nuestras creaciones más exclusivas, seleccionadas
                  especialmente para ti
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
                </div>
              ) : isError ? (
                <div className="text-center py-10">
                  <p className="text-red-500">
                    Error al cargar productos: {error.message}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {featuredProducts?.slice(0, 4).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="relative h-80 overflow-hidden">
                        {/* Imagen principal */}
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-0"
                        />

                        {/* Imagen de hover (si existe) */}
                        {product.hoverImage ? (
                          <img
                            src={product.hoverImage}
                            alt={product.name}
                            className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
                          />
                        ) : (
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
                          />
                        )}

                        {/* Badge destacado */}
                        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Destacado
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                            {product.name}
                          </h3>
                          <span className="text-emerald-600 font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm">
                          {product.category}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <Link
                  to="/catalog"
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Ver Catálogo Completo
                </Link>
              </div>
            </div>
          </section>

          {/* Beneficios de la Marca */}
          <section className="py-16 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Link
                  key={index}
                  to={benefit.link}
                  className="text-center p-6 group hover:bg-gray-50 rounded-lg transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                  <div className="mt-4">
                    <span className="text-emerald-600 text-sm font-medium group-hover:underline">
                      Conocer más →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="py-16 bg-gray-800 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2">Contacto</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Estamos aquí para ayudarte. Contáctanos a través de cualquiera
                  de nuestros canales.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Información de contacto */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">
                    Información de Contacto
                  </h3>
                  <div className="space-y-3">
                    <p>
                      <strong>Email:</strong>
                      <br />
                      <a
                        href="mailto:info@ernestoluxe.com"
                        className="text-emerald-400 hover:text-emerald-300"
                      >
                        info@ernestoluxe.com
                      </a>
                    </p>
                    <p>
                      <strong>WhatsApp:</strong>
                      <br />
                      <a
                        href="https://wa.me/34123456789"
                        className="text-emerald-400 hover:text-emerald-300"
                      >
                        +34 123 456 789
                      </a>
                    </p>
                  </div>
                </div>

                {/* Redes Sociales */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Síguenos en Facebook"
                      className="bg-gray-700 p-3 rounded-full hover:bg-emerald-600 transition-colors"
                    >
                      <FaFacebook className="text-xl" />
                    </a>

                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Síguenos en Instagram"
                      className="bg-gray-700 p-3 rounded-full hover:bg-emerald-600 transition-colors"
                    >
                      <FaInstagram className="text-xl" />
                    </a>

                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Síguenos en Twitter"
                      className="bg-gray-700 p-3 rounded-full hover:bg-emerald-600 transition-colors"
                    >
                      <FaTwitter className="text-xl" />
                    </a>

                    <a
                      href="https://www.pinterest.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Síguenos en Pinterest"
                      className="bg-gray-700 p-3 rounded-full hover:bg-emerald-600 transition-colors"
                    >
                      <FaPinterest className="text-xl" />
                    </a>
                  </div>
                </div>

                {/* Nuestras Tiendas */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Visítanos</h3>
                  <div className="space-y-3 mb-4">
                    <p>Sevilla: Calle Sierpes, 25</p>
                    <p>Málaga: Calle Marqués de Larios, 8</p>
                    <p>Granada: Calle Reyes Católicos, 15</p>
                  </div>
                  <Link
                    to="/ubicaciones"
                    className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <FaMapMarkerAlt className="mr-2" />
                    Ver en Mapa
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="py-16 bg-gray-800 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Únete a nuestra comunidad
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Suscríbete para recibir novedades, promociones exclusivas y tips
                de cuidado de joyería
              </p>
              <form className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Suscribirse
                  </button>
                </div>
                <p className="text-sm mt-4 text-gray-300">
                  Respetamos tu privacidad y no compartiremos tu información.
                </p>
              </form>
            </div>
          </section>

          {/* Call to Action Final */}
          <section className="py-20 bg-emerald-700 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Encuentra tu pieza perfecta
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Cada joya cuenta una historia única. Descubre la tuya en nuestra
                colección.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/catalog"
                  className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                >
                  Ver Catálogo
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                >
                  Conócenos
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </SEOWrapper>
  );
};

export default Home;
