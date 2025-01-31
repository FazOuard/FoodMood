import React, { useState } from "react";
import './imageSelector.css'

const ImageSelector = ({ images, onSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image , index) => {
    setSelectedImage(image);
    onSelect(index + 1);
  };

  return (
    <div>
      <div style={{ display: "flex" , width: "100%", justifyContent: "space-between"}}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            onClick={() => handleImageClick(image, index)}
            style={{
              border: selectedImage === image ? "3px solid green" : "1px solid gray",
              cursor: "pointer",
              width: "180px",
              maxWidth: "33%",
              height: "125px",
              borderRadius: "3px",
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default ImageSelector;