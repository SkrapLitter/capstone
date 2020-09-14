/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { Dialog, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';
import Carousel from 'react-material-ui-carousel';
import { JobAttributes } from '../../store/job/jobInterface';

const trash1 = 'https://prc.org/app/uploads/2019/01/Single-Stream-1024x768.jpg';

const trash2 =
  'https://www.michiganradio.org/sites/michigan/files/styles/medium/public/201307/172690560_98ae354df2.jpg';

const trash3 = 'https://i.ytimg.com/vi/XG3fb8rVjpk/maxresdefault.jpg';

interface Props {
  key: string;
  lat: number;
  lng: number;
  text: string;
  job: JobAttributes;
}

// const modalStyles = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%) !important',
// };

const MapMarker: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const handleChange = () => {
    setOpen(!open);
  };
  const body = (
    <Paper>
      <div className="mapCard">
        <div className="mapImageContainer">
          <Carousel
            navButtonsAlwaysVisible={true}
            autoPlay={false}
            animation="slide"
          >
            {[trash1, trash2, trash3].map(url => (
              <img className="mapCardImage" src={url} alt="trash" key={url} />
            ))}
          </Carousel>
        </div>
        <div className="mapCardText">
          <div>
            <h4>{props.job.name}</h4>
            <h6>
              {props.job.address}, {props.job.city}, {props.job.state}
            </h6>
            <p>
              <i>"{props.job.description}"</i>
            </p>
          </div>
          <div className="mapCardButtons">
            {props.job.price > 0 ? (
              <h4>
                <strong>${props.job.price}</strong>
              </h4>
            ) : (
              <h6>
                <i>This job is unpaid</i>
              </h6>
            )}
            <button
              className="waves-effect waves-light btn green accent-4 cardButton"
              type="button"
              onClick={() => history.push(`/jobs/${props.job.id}`)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </Paper>
  );
  return (
    <div className="marker">
      <i onClick={handleChange} className="material-icons" role="button">
        delete
      </i>
      <Dialog open={open} onClose={handleChange}>
        {body}
      </Dialog>
    </div>
  );
};

export default MapMarker;

// const body = (
//   <div className="row mapModal">
//     <div className="col s12 m7">
//       <div className="card">
//         <div className="card-image">
//           <img src={DEFAULT_TRASH_URL} alt="trash" />
//           <span className="card-title">{props.job.name}</span>
//         </div>
//         <div className="card-content">
//           <p>
//             {props.job.address} {props.job.city}
//           </p>
//           <p>{props.job.price}</p>
//         </div>
//         <div className="card-action">
//           <a href="/">View Details</a>
//         </div>
//       </div>
//     </div>
//   </div>
// );
