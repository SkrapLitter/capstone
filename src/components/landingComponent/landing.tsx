import React from 'react';
import Hero from '../heroComponent/hero';
import SiteDetails from './siteDetails';

const Landing: React.FC = () => {
  const heroBg =
    'https://rubryka.com/wp-content/uploads/2020/07/c0c7935102ed52ca3d1224685cff98b3.png';

  return (
    <>
      <Hero bgImage={heroBg} />
      <SiteDetails />
    </>
  );
};

export default Landing;
