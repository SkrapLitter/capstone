import React from 'react';

interface Props {
  lat: number;
  lng: number;
  text: string;
}

const SingleMarker: React.FC<Props> = () => {
  return (
    <div className="marker">
      <i className="material-icons" role="button">
        delete
      </i>
    </div>
  );
};

export default SingleMarker;
