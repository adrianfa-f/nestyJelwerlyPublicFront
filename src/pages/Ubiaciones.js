import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const redIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
});

const blueIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  iconSize: [32, 32],
});

const MapUpdater = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 13, { animate: true });
  }, [coords, map]);
  return null;
};

const Ubicaciones = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const locations = useMemo(() => [
    {
      id: 1,
      name: "Tienda Sevilla",
      address: "Calle Sierpes, 25, 41004 Sevilla",
      phone: "+34 955 123 456",
      hours: "Lunes a Sábado: 10:00 - 20:00",
      coords: [37.3891, -5.9945],
      mapUrl: "https://www.google.com/maps?q=Calle+Sierpes+25+Sevilla"
    },
    {
      id: 2,
      name: "Tienda Málaga",
      address: "Calle Marqués de Larios, 8, 29005 Málaga",
      phone: "+34 952 654 321",
      hours: "Lunes a Sábado: 10:00 - 21:00",
      coords: [36.7202, -4.4203],
      mapUrl: "https://www.google.com/maps?q=Calle+Marqués+de+Larios+8+Málaga"
    },
    {
      id: 3,
      name: "Tienda Granada",
      address: "Calle Reyes Católicos, 15, 18009 Granada",
      phone: "+34 958 789 012",
      hours: "Lunes a Sábado: 10:00 - 19:30",
      coords: [37.1765, -3.5979],
      mapUrl: "https://www.google.com/maps?q=Calle+Reyes+Católicos+15+Granada"
    }
  ], []);

  const location = locations[selectedLocation];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-emerald-600">Inicio</Link>
            <span>/</span>
            <span className="text-gray-400">Ubicaciones</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-emerald-700 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full">
              <FaMapMarkerAlt className="text-4xl text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestras Tiendas</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Visítanos en cualquiera de nuestras exclusivas ubicaciones en Andalucía
          </p>
        </div>
      </div>

      {/* Mapa + Opciones */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Opciones de tiendas */}
          <div className="flex flex-col justify-between h-[350px] space-y-4 py-8">
            {locations.map((loc, index) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(index)}
                className={`p-4 rounded-lg border-2 text-left font-semibold transition-all ${
                  selectedLocation === index
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-gray-200 bg-white hover:border-emerald-400'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>

          {/* Mapa */}
          <div className="md:col-span-2 h-[350px] rounded-lg overflow-hidden shadow-xl">
            <MapContainer
              center={location.coords}
              zoom={13}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <MapUpdater coords={location.coords} />
              {locations.map((loc, index) => (
                <Marker
                  key={loc.id}
                  position={loc.coords}
                  icon={index === selectedLocation ? redIcon : blueIcon}
                >
                  <Popup>
                    <strong>{loc.name}</strong><br />
                    {loc.address}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Información detallada */}
        <div className="mt-10 p-6 bg-white rounded-lg shadow-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{location.name}</h2>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-medium">Dirección:</span> {location.address}</p>
            <p className="flex items-center">
              <FaPhone className="text-sm mr-2" />
              <span className="font-medium">Teléfono:</span> {location.phone}
            </p>
            <p className="flex items-center">
              <FaClock className="text-sm mr-2" />
              <span className="font-medium">Horario:</span> {location.hours}
            </p>
            <a
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Abrir en Google Maps
              <FaExternalLinkAlt className="ml-2 text-sm" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ubicaciones;
