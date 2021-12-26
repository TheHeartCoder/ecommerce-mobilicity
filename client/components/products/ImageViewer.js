import { Image } from 'antd';
import React from 'react';

const ImageViewer = ({ setVisible, visible, images }) => {
  return (
    <div style={{ display: 'none' }}>
      <Image.PreviewGroup
        preview={{
          visible,
          onVisibleChange: (vis) => setVisible(vis),
        }}
      >
        {images &&
          images.map((image) => <Image src={image.Location} key={image.key} />)}
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageViewer;
