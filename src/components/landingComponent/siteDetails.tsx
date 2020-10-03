import React from 'react';

const SiteDetails: React.FC = () => {
  return (
    <div className="container">
      <div className="site-details">
        <div className="details-left">
          <img
            src="https://2004-skrap.s3.amazonaws.com/svg/undraw_a_day_at_the_park_owg1.svg"
            alt="A beautiful day at the park"
          />
        </div>
        <div className="details-right text">
          <h2>Green is everyone's favorite color</h2>
        </div>
      </div>
      <div className="site-details">
        <div className="details-left text">
          <h2>In more ways than one</h2>
        </div>
        <div className="details-right">
          <img
            src="https://2004-skrap.s3.amazonaws.com/svg/undraw_make_it_rain_iwk4.svg"
            alt="Man throwing money in the air"
          />
        </div>
      </div>
      <div className="site-details">
        <div className="details-left">
          <img
            src="https://2004-skrap.s3.amazonaws.com/svg/undraw_a_moment_to_relax_bbpa.svg"
            alt="A man relaxing at the park"
          />
        </div>
        <div className="details-right text">
          <h2>Introducing Skräp</h2>
          <p>
            Bringing together people who want to go green with those who want to
            make green.
          </p>
          <p>
            There's too much litter in the world. Skräp gives you the power to
            do something about it - without getting your hands dirty.
          </p>
        </div>
      </div>
      <div className="site-details">
        <div className="details-left text">
          <h2>Get green by going green.</h2>
        </div>
        <div className="details-right">
          <img
            src="https://2004-skrap.s3.amazonaws.com/svg/undraw_at_the_park_2e47.svg"
            alt="People working at the park"
          />
        </div>
      </div>
    </div>
  );
};

export default SiteDetails;
