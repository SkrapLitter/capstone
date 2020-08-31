import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMap } from '../../store/map/mapActions';
import { StoreState } from '../../store/store';
import GoogleMapReact from 'google-map-react';
import MapInterface, { Coordinates } from '../../store/map/mapInterface';

interface MapProps {
  getMap: (localCoord?: Coordinates) => MapInterface;
  defaultMap: MapInterface;
}

const Map: React.FC<MapProps> = (props: MapProps) => {
  useEffect(() => {
    const success = pos => {
      const localCoord = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      props.getMap(localCoord);
    };

    const error = () => {
      props.getMap();
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div className="container">
      <div className="mapContainer">
        {props.defaultMap.key && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: props.defaultMap.key }}
            defaultCenter={props.defaultMap.center}
            defaultZoom={props.defaultMap.zoom}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    defaultMap: state.map,
  };
};

const mapDispatchToProps = { getMap };

export default connect(mapStateToProps, mapDispatchToProps)(Map);
