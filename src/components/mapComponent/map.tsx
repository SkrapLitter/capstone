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

  useEffect(() => {
    props.fetchJobs();
  }, [props.job.jobs.length]);

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
