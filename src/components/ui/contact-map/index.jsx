"use client";

// Import React and hooks
import { useEffect, useState, useRef } from "react";

// Import styles but keep Leaflet imports for client-side only
import styles from "./styles.module.css";

export default function ContactMap({
  location = [13.009730416701956, 80.21024319642622],
  popupText = "Office Location",
}) {
  const mapRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Only import and initialize Leaflet on the client
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        import("leaflet-defaulticon-compatibility");
        import(
          "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"
        );
        import("leaflet/dist/leaflet.css");

        if (mapRef.current && !mapRef.current._leaflet_id) {
          const map = L.map(mapRef.current).setView(location, 13);

          mapRef.current._map = map;

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          const lat = Array.isArray(location) ? location[0] : 13.0;
          const lng = Array.isArray(location) ? location[1] : 80.21;

          setTimeout(() => {
            if (map) {
              const marker = L.marker([lat, lng]).addTo(map);

              if (popupText) {
                marker.bindPopup(popupText);
              }
            }
          }, 300);
        }
      });
    }

    return () => {
      if (mapRef.current && mapRef.current._map) {
        mapRef.current._map.remove();
        mapRef.current._map = null;
        mapRef.current._leaflet_id = null;
      }
    };
  }, [location, popupText]);

  if (!isMounted) {
    return <div className={styles.mapPlaceholder}>Loading map...</div>;
  }

  return <div ref={mapRef} className={styles.map}></div>;
}
