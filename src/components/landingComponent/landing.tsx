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
      {/* <div className="stripe light-green lighten-5 d-flex justify-center">
        <h6>Skyskräpers:</h6>
        <ul className="d-flex">
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1920px-McDonald%27s_Golden_Arches.svg.png"
              height="50"
              alt="img1"
            />
          </li>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/Five_Guys_logo.svg"
              alt="img2"
              height="50"
            />
          </li>
          <li>
            <img
              src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515400_10885.png"
              height="50"
              alt="img3"
            />
          </li>
        </ul>
      </div>
      <div className="stripe green darken-1 justify-center">
        <ul className="d-flex justify-center">
          <li className="f-centered">
            <div className="achieve border-circle green lighten-3 green-text text-darken-4">
              12000+
            </div>
            <div className="achieve-meta">volunteers</div>
          </li>
          <li className="f-centered">
            <div className="achieve border-circle green lighten-3 green-text text-darken-4">
              60000+
            </div>
            <div className="achieve-meta">tones cleaned trash</div>
          </li>
          <li className="f-centered">
            <div className="achieve border-circle green lighten-3 green-text text-darken-4">
              8b+
            </div>
            <div className="achieve-meta">gaining cleaning with us</div>
          </li>
        </ul>
      </div> */}
    </>
  );
};

export default Landing;
