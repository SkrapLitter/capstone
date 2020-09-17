/* eslint no-lonely-if: 0 */
/* eslint no-else-return: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const JobImages: React.FC = () => {
  const {
    job: { job },
  } = useSelector((state: StoreState) => state);
  const [showGallery, setShowGallery] = useState(false);
  const [curImgIndex, setCurImgIndex] = useState(0);
  let curImg = null;
  let startX = 0;
  let dif = 0;
  const idxRef = useRef(curImgIndex);
  const incImgIndex = (ci: number) => {
    let index;
    if (ci === job.images.length - 1) {
      index = 0;
    } else {
      index = ci + 1;
    }
    idxRef.current = index;
    setCurImgIndex(index);
  };
  const decImgIndex = (ci: number) => {
    let index;
    if (ci === 0) {
      index = job.images.length - 1;
    } else {
      index = ci - 1;
    }
    idxRef.current = index;
    setCurImgIndex(index);
  };
  const handleTouch = () => {
    startX = 0;
    if (dif < -200) {
      incImgIndex(idxRef.current);
    } else if (dif > 200) {
      decImgIndex(idxRef.current);
    } else if (dif >= -200 && dif <= 200) {
      curImg.style.left = 0;
    }
    setTimeout(() => {
      curImg.style.left = 0;
      curImg = null;
    }, 300);
  };

  useEffect(() => {
    const gallery = document.getElementById('galleryImgContainer');
    if (gallery) {
      gallery.addEventListener('touchstart', e => {
        curImg = document.querySelector('.curImg');
        startX = e.touches[0].clientX;
      });
      gallery.addEventListener('touchend', handleTouch);
      gallery.addEventListener('touchmove', e => {
        dif = e.touches[0].clientX - startX;
        curImg.style.left = `${dif}px`;
      });
    }
  }, [showGallery]);

  const generateClassName = (i: number): string => {
    if (job.images.length <= 2) {
      if (i === curImgIndex) {
        return 'jobGalleryImg curImg';
      }
    } else {
      if (i === curImgIndex) {
        return 'jobGalleryImg curImg';
      } else if (
        i === curImgIndex - 1 ||
        (i === job.images.length - 1 && curImgIndex === 0)
      ) {
        return 'jobGalleryImg moveLeft';
      } else if (
        i === curImgIndex + 1 ||
        (curImgIndex === job.images.length - 1 && i === 0)
      ) {
        return 'jobGalleryImg moveRight';
      }
    }
    return 'dNone';
  };

  const createImgArray = () => {
    return job.images.map((img, i) => {
      return (
        <div
          className={generateClassName(i)}
          key={img.id}
          style={{
            backgroundImage: `url('${img.url}')`,
          }}
        />
      );
    });
  };

  const show = () => {
    setCurImgIndex(0);
    setShowGallery(true);
  };

  const hide = () => {
    setShowGallery(false);
  };

  return (
    <div>
      <div
        className="jobImage"
        style={{
          backgroundImage: `url('${
            job.images && job.images.length && job.images[0].url
          }')`,
        }}
        onClick={show}
        role="navigation"
      />
      {showGallery && (
        <div className="overlay">
          <div className="closeIcon">
            <CancelPresentationIcon
              style={{ fontSize: 40, color: '#fff' }}
              onClick={hide}
            />
          </div>
          <div id="gallery">
            {job.images.length > 1 && (
              <ArrowBackIosIcon
                style={{ fontSize: 40, color: '#fff' }}
                onClick={() => decImgIndex(curImgIndex)}
              />
            )}

            <div id="galleryImgContainer">{createImgArray()}</div>
            {job.images.length > 1 && (
              <ArrowForwardIosIcon
                style={{ fontSize: 40, color: '#fff' }}
                onClick={() => incImgIndex(curImgIndex)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobImages;
