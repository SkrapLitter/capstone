import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Parallax } from 'react-parallax';

interface Props {
  bgImage: string;
}

const Hero: React.FC<Props> = (props: Props) => {
  return (
    <div className="hero">
      <Parallax strength={300} bgImage={props.bgImage}>
        <div className="hero-text">
          <h1>People are SUXeeded</h1>
          <h2>Doing SKRÄP</h2>
        </div>
        <div style={{ height: 'calc(100vh - 65px)', width: '200px' }} />
      </Parallax>
    </div>
  );
};

export default Hero;
