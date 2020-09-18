import React from 'react';

interface Props {
  images: string[];
  generateClassName: (i: number) => string;
}

const CreateImgArray: React.FC<Props> = (props: Props) => {
  return (
    <div id="galleryImgContainer">
      {props.images.map((img, i) => (
        <div
          className={props.generateClassName(i)}
          key={img.slice(i)}
          style={{
            backgroundImage: `url('${img}')`,
          }}
        />
      ))}
    </div>
  );
};

export default CreateImgArray;
