import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/store';
import { fetchJobs } from '../../store/job/jobActions';
import Job from '../../store/job/jobInterface';
import GoogleMapReact from 'google-map-react';
import MapMarker from './mapMarker';

interface Props {
  job: Job;
  fetchJobs: () => Job;
}

const Map: React.FC<Props> = (props: Props) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.64, lng: -74.08 });
  const [mapZoom, setMapZoom] = useState(11);
  const [locationLoaded, setLocationLoaded] = useState(false);

  useEffect(() => {
    const success = ({ coords }) => {
      const localCoord = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
      setMapCenter(localCoord);
      setMapZoom(14);
    };
    navigator.geolocation.getCurrentPosition(success);
    setLocationLoaded(true);
  }, []);

  useEffect(() => {
    props.fetchJobs();
  }, [props.job.jobs.length]);

  const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();
    console.log(map);
    places.forEach(place => {
      bounds.extend(new maps.LatLng(place.lat, place.lng));
    });
    return bounds;
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };

  // Fit map to its bounds after the api is loaded
  const apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
  };

  const handleMapChange = (center, zoom, bounds, marginBounds) => {
    console.log('CENTER', center);
    console.log('ZOOM', zoom);
    console.log('BOUNDS', bounds);
    console.log('MARGIN BOUNDS', marginBounds);
  };

  return (
    <div className="container">
      <div className="mapContainer">
        {locationLoaded === true && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyB3PsGI6ryopGrbeXMY1oO17jTp0ksQFoI',
            }}
            center={mapCenter}
            zoom={mapZoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) =>
              apiIsLoaded(map, maps, props.job.jobs)
            }
            onChange={({ center, zoom, bounds, marginBounds }) =>
              handleMapChange(center, zoom, bounds, marginBounds)
            }
          >
            {props.job.jobs.map(job => {
              return (
                <MapMarker
                  key={job.id}
                  lat={job.lat}
                  lng={job.lng}
                  job={job}
                  text={job.name}
                />
              );
            })}
          </GoogleMapReact>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  job: state.job,
});

const mapDispatchToProps = { fetchJobs };

export default connect(mapStateToProps, mapDispatchToProps)(Map);
