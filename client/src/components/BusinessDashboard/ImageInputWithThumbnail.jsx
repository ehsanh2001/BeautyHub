import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const ImageInputWithThumbnail = ({ formData, setFormData }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [prevImage, setPrevImage] = useState(null);

  useEffect(() => {
    console.log("prevImage", formData);
    if (formData.image) {
      console.log("prevImage", formData.image);
      setPrevImage(`/api/image/${formData.image}`);
    }
  }, [formData]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setFormData((prevData) => ({
          ...prevData,
          image: file,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Form.Group controlId="formFile">
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </Form.Group>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Image Preview"
          style={{
            display: "block",
            maxWidth: "200px",
            maxHeight: "200px",
            marginTop: "20px",
          }}
        />
      )}
      {!imageSrc && prevImage && (
        <img
          src={prevImage}
          alt="Image Preview"
          style={{
            display: "block",
            maxWidth: "200px",
            maxHeight: "200px",
            marginTop: "20px",
          }}
        />
      )}
    </div>
  );
};

export default ImageInputWithThumbnail;
