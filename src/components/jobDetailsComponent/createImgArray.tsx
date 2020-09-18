/* eslint no-lonely-if: 0 */
/* eslint no-else-return: 0 */

import React from 'react';

interface Props {
  images: string[];
  curImgIndex: number;
}

const CreateImgArray: React.FC<Props> = (props: Props) => {
  const { images, curImgIndex } = props;
  const generateClassName = (i: number): string => {
    if (images.length <= 2) {
      // Don't animate out, just swap images
      if (i === curImgIndex) {
        return 'jobGalleryImg curImg';
      }
    } else {
      // Animation logic
      if (i === curImgIndex) {
        return 'jobGalleryImg curImg';
      } else if (
        i === curImgIndex - 1 ||
        (i === images.length - 1 && curImgIndex === 0)
      ) {
        return 'jobGalleryImg moveLeft';
      } else if (
        i === curImgIndex + 1 ||
        (curImgIndex === images.length - 1 && i === 0)
      ) {
        return 'jobGalleryImg moveRight';
      }
    }
    // Otherwise, Make it Invisible
    return 'dNone';
  };
  return (
    <div id="galleryImgContainer">
      {props.images.map((img, i) => (
        <div
          className={generateClassName(i)}
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
