// pages/benefits/HechoAMano.js
import { Link } from 'react-router-dom';
import { FaHandSparkles, FaClock, FaHeart } from 'react-icons/fa';

const HechoAMano = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-emerald-600">Inicio</Link>
            <span>/</span>
            <Link to="/" className="hover:text-emerald-600">Beneficios</Link>
            <span>/</span>
            <span className="text-gray-400">Hecho a Mano</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-amber-900 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-600 p-4 rounded-full">
              <FaHandSparkles className="text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hecho a Mano</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Cada pieza es una obra de arte única, creada con dedicación y maestría artesanal.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">El Arte de la Artesanía</h2>
            <p className="text-lg text-gray-600 mb-6">
              Nuestras joyas no salen de una línea de producción. Son creadas por artesanos expertos que dedican horas de trabajo meticuloso a cada pieza.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <FaClock className="text-3xl text-amber-600 mx-auto mb-2" />
                <h3 className="font-semibold">40+ Horas</h3>
                <p className="text-sm text-gray-600">Por pieza compleja</p>
              </div>
              <div className="text-center">
                <FaHeart className="text-3xl text-amber-600 mx-auto mb-2" />
                <h3 className="font-semibold">100% Dedicación</h3>
                <p className="text-sm text-gray-600">En cada detalle</p>
              </div>
            </div>
          </div>
          
          <div>
            <img 
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="Proceso artesanal"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nuestro Proceso Artesanal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Diseño</h3>
              <p className="text-gray-600">Creación del boceto único para cada pieza</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Modelado</h3>
              <p className="text-gray-600">Dar forma a la idea con precisión milimétrica</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Acabado</h3>
              <p className="text-gray-600">Pulido y detalles finales a mano</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Control</h3>
              <p className="text-gray-600">Inspección final de calidad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HechoAMano;