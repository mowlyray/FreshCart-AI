"use client";

import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building,
  Home,
  MapPin,
  Navigation,
  Phone,
  Search,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Root } from "react-dom/client";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { LatLngExpression, Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

const markerIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Checkout() {
  const router = useRouter();
  const { userData } = useSelector((state: RootState) => state.user);
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pinCode: "",
    fullAddress: "",
  });

  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.log("location error", err);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 },
      );
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setAddress((prev) => ({ ...prev, fullName: userData?.name || "" }));
      setAddress((prev) => ({ ...prev, mobile: userData?.mobile || "" }));
    }
  }, [userData]);

  const DraggableMarker: React.FC = () => {

    const map=useMap()
    useEffect(()=>{
      map.setView(position as LatLngExpression,15,{animate:true})
    },[position,map])


    return (
      <Marker
        position={position as LatLngExpression}
        icon={markerIcon}
        draggable={true}
        eventHandlers={{
          dragend: (e: L.LeafletEvent) => {
            const marker = e.target as L.Marker;
            const { lat, lng } = marker.getLatLng();
            setPosition([lat, lng]);
          },
        }}
      />
    );
  };

  return (
    <div className="w-[92%] md:w-[80%] py-10 mx-auto relative">
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="absolute top-2 left-0 gap-2 text-green-700 font-semibold flex items-center cursor-pointer hover:text-green-800"
        onClick={() => router.push("/user/cart")}
      >
        <ArrowLeft />
        <span>Back to cart</span>
      </motion.button>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-10"
      >
        Checkout
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="text-green-700" />
            Delivery Address
          </h2>

          <div className="space-y-4">
            <div className="relative">
              <User
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                type="text"
                value={address.fullName}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, fullName: e.target.value }))
                }
                className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
              />
            </div>

            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                type="text"
                value={address.mobile}
                onChange={(e) =>
                  setAddress((prev) => ({ ...prev, mobile: address.mobile }))
                }
                className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
              />
            </div>

            <div className="relative">
              <Home
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                type="text"
                value={address.fullAddress}
                placeholder="Enter your full address"
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    fullAddress: address.fullAddress,
                  }))
                }
                className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="relative">
                <Building
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  type="text"
                  value={address.city}
                  placeholder="city"
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, city: address.city }))
                  }
                  className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
                />
              </div>

              <div className="relative">
                <Navigation
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  type="text"
                  value={address.state}
                  placeholder="state"
                  onChange={(e) =>
                    setAddress((prev) => ({ ...prev, state: address.state }))
                  }
                  className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
                />
              </div>

              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  type="text"
                  value={address.pinCode}
                  placeholder="pin code"
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      pinCode: address.pinCode,
                    }))
                  }
                  className="bg-gray-50 border pl-10 w-full p-3 text-sm  rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="search city or area..."
                className="flex-1 border rounded-lg pp-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button className="bg-green-600 text-white px-5 rounded-lg hover:bg-green-600 transition-al font-medium">
                Search
              </button>
            </div>

            <div className="relative mt-6 h-[330px] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
              {position && (
                <MapContainer
                  center={position as LatLngExpression}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <DraggableMarker/>
                </MapContainer>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Checkout;
