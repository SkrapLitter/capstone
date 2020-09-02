import React, { useState, useEffect } from 'react';
import { JobAttributes } from '../../store/job/jobInterface';
import DesktopCard from './desktopCard';
import MobileCard from './mobileCard';

interface Props {
  job: JobAttributes;
}

const JobCard: React.FC<Props> = (props: Props) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);
  return (
    <div>
      {width > 600 ? (
        <DesktopCard job={props.job} />
      ) : (
        <MobileCard job={props.job} />
      )}
    </div>
  );
};

export default JobCard;
