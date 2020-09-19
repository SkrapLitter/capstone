import React from 'react';

interface Props {
  images: string[];
}
const FeedImageRender: React.FC<Props> = (props: Props) => {
  if (props.images.length === 1) {
    return (
      <div className="feedJobImageContainer">
        <div
          className="feedSingleImage"
          style={{ backgroundImage: `url(${props.images[0]})` }}
        />
      </div>
    );
  }
  if (props.images.length === 2) {
    return (
      <div className="feedJobImageContainer">
        <div
          className="feedDoubleImageLeft"
          style={{ backgroundImage: `url(${props.images[0]})` }}
        />
        <div
          className="feedDoubleImageRight"
          style={{ backgroundImage: `url(${props.images[1]})` }}
        />
      </div>
    );
  }
  if (props.images.length >= 3) {
    return (
      <div className="feedJobImageContainer">
        <div
          className="feedDoubleImageLeft"
          style={{ backgroundImage: `url(${props.images[0]})` }}
        />
        <div className="feedDoubleImageRight">
          <div
            className="feedTopRightImage"
            style={{ backgroundImage: `url(${props.images[1]})` }}
          />
          <div
            className="feedBottomRightImage"
            style={{ backgroundImage: `url(${props.images[2]})` }}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default FeedImageRender;
