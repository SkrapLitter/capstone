import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import {
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';
import { fetchMapJobs, fetchJobs } from '../../store/job/jobActions';
import GoogleMapReact from 'google-map-react';
import MapMarker from './mapMarker';

const useStyles = makeStyles({
  createButton: {
    color: '#ffffff',
    backgroundColor: '#04e762',
  },
  formControl: {
    margin: '0 1em 1em 1em',
    minWidth: 120,
  },
});

const Map: React.FC = () => {
  const { jobs } = useSelector((state: StoreState) => state.job);
  const [mapCenter, setMapCenter] = useState({ lat: 40.64, lng: -74.08 });
  const [mapZoom, setMapZoom] = useState(11);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [type, setType] = useState('all');
  const [filterBounds, setFilterBounds] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

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

  const getMapBounds = (maps, places) => {
    const bounds = new maps.LatLngBounds();
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
    const bounds = getMapBounds(maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
  };

  const handleMapChange = bounds => {
    const north = bounds.ne.lat;
    const south = bounds.se.lat;
    const east = bounds.ne.lng;
    const west = bounds.nw.lng;
    dispatch(fetchMapJobs(north, south, east, west, type));
    setFilterBounds(bounds);
  };

  const handleType = (e: React.ChangeEvent<{ value: string }>) => {
    const filter: string = e.target.value;
    setType(filter);
    const north = filterBounds.ne.lat;
    const south = filterBounds.se.lat;
    const east = filterBounds.ne.lng;
    const west = filterBounds.nw.lng;
    dispatch(fetchMapJobs(north, south, east, west, filter));
  };

  const classes = useStyles();
  return (
    <div className="container">
      <div className="mapContainer">
        {locationLoaded === true && (
          <div className="jCenter">
            <div className="mapFilter">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  onChange={handleType}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="funded">Paid</MenuItem>
                  <MenuItem value="volunteer">Volunteer</MenuItem>
                </Select>
              </FormControl>
            </div>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyB3PsGI6ryopGrbeXMY1oO17jTp0ksQFoI',
              }}
              center={mapCenter}
              zoom={mapZoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                apiIsLoaded(map, maps, jobs)
              }
              onChange={({ bounds }) => handleMapChange(bounds)}
            >
              {jobs.map(job => {
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
          </div>
        )}
      </div>
      <div className="createButtonContainer">
        <Link to="/create">
          <Fab className={classes.createButton}>
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </div>
  );
};

export default Map;
