import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Nesty Luxe Jewelry</h3>
            <p className="text-gray-300 mb-4">
              Creando piezas únicas con pasión y dedicación.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaFacebook className="text-xl" />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaInstagram className="text-xl" />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Twitter"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>

              <a
                href="https://www.pinterest.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Pinterest"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaPinterest className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  to="/order-tracking"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Seguimiento de Pedidos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Categorías</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/Anillos compromiso"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Anillos compromiso
                </Link>
              </li>
              <li>
                <Link
                  to="/category/Anillos matrimonio"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Anillos matrimonio
                </Link>
              </li>
              <li>
                <Link
                  to="/category/Collares y cadenas"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Collares y cadenas
                </Link>
              </li>
              <li>
                <Link
                  to="/category/Pulseras y brazaletes"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Pulseras y brazaletes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <address className="not-italic text-gray-300">
              <p className="mb-2">Email: info@nestyluxe.com</p>
              <p>Teléfono: +34 123 456 789</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Nesty Luxe Jewelry. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
