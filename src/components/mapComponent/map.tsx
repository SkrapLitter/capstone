import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const Map: React.FC = () => {
  const [center, setCenter] = useState({ lat: 40.64, lng: -74.08 });
  const [zoom, setZoom] = useState(11);
  const [locationLoaded, setLocationLoaded] = useState(false);

  useEffect(() => {
    const success = ({ coords }) => {
      const localCoord = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
      setCenter(localCoord);
      setZoom(14);
    };
    navigator.geolocation.getCurrentPosition(success);
    setLocationLoaded(true);
  }, []);

  return (
    <div className="container">
      <div className="mapContainer">
        {locationLoaded === true && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyB3PsGI6ryopGrbeXMY1oO17jTp0ksQFoI',
            }}
            center={center}
            zoom={zoom}
          />
        )}
      </div>
    </div>
  );
};

export default Map;
