import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Parallax } from 'react-parallax';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

interface Props {
  bgImage: string;
}

const Hero: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  return (
    <div className="hero">
      <Parallax strength={300} bgImage={props.bgImage}>
        <div className="hero-text">
          <h1>CLEAN YOUR WORLD</h1>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => history.push('/jobs')}
          >
            Get Paid
          </Button>
        </div>
        <div style={{ height: 'calc(100vh - 4em)', width: '200px' }} />
      </Parallax>
    </div>
  );
};

export default Hero;
