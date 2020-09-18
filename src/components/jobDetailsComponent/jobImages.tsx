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
  const idxRef: React.MutableRefObject<number> = useRef(curImgIndex);
  const incImgIndex = (ci: number): void => {
    let index: number;
    if (ci === job.images.length - 1) {
      index = 0;
    } else {
      index = ci + 1;
    }
    idxRef.current = index;
    setCurImgIndex(index);
  };
  const decImgIndex = (ci: number): void => {
    let index: number;
    if (ci === 0) {
      index = job.images.length - 1;
    } else {
      index = ci - 1;
    }
    idxRef.current = index;
    setCurImgIndex(index);
  };
  const handleTouchStart = (e: TouchEvent): void => {
    curImg = e.target;
    startX = e.touches[0].clientX;
  };
  const handleTouchMove = (e: TouchEvent): void => {
    dif = e.touches[0].clientX - startX;
    curImg.style.left = `${dif}px`;
  };
  const handleTouchEnd = (): void => {
    startX = 0;
    if (dif < -150) {
      incImgIndex(idxRef.current);
    } else if (dif > 150) {
      decImgIndex(idxRef.current);
    } else if (dif >= -200 && dif <= 200) {
      curImg.style.left = 0;
    }
    setTimeout(() => {
      curImg.style.left = 0;
    }, 300);
  };

  useEffect(() => {
    const gallery = document.getElementById('galleryImgContainer');
    if (gallery) {
      gallery.addEventListener('touchstart', handleTouchStart);
      gallery.addEventListener('touchmove', handleTouchMove);
      gallery.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      if (gallery) {
        gallery.removeEventListener('touchstart', handleTouchStart);
        gallery.removeEventListener('touchmove', handleTouchMove);
        gallery.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [showGallery]);

  const generateClassName = (i: number): string => {
    if (job.images.length <= 2) {
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
    // Otherwise, Make it Invisible
    return 'dNone';
  };

  const createImgArray = (): JSX.Element[] => {
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

  const show = (): void => {
    setCurImgIndex(0);
    setShowGallery(true);
  };

  const hide = (): void => {
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
              style={{ fontSize: 60, color: '#fff' }}
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
