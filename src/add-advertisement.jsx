import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './add-advertisement.css';

const AddAdvertisement = () => {
  const [formData, setFormData] = useState({
    add_name: '',
    starting_date_time: '',
    ending_date_time: '',
    repeat_frequency: '',
    delivery: '',
    primary_button_text: '',
    primary_button_click: '',
    secondary_button_text: '',
    secondary_button_click: '',
  });

  const [images, setImages] = useState([{ primaryText: '', description: '', file: null, preview: '' }]);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (index, event) => {
    const { name, value, files } = event.target;
    let newImages = [...images];
    if (name === 'file' && files[0]) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      newImages[index] = { ...newImages[index], file, preview };
    } else {
      newImages[index] = { ...newImages[index], [name]: value };
    }
    setImages(newImages);
  };

  const addImageField = () => {
    if (images.length < 5) {
      setImages([...images, { primaryText: '', description: '', file: null, preview: '' }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/add-advertisement', formData)
      .then(response => {
        setMessage('Advertisement added successfully!');
      })
      .catch(error => {
        setMessage('Error adding advertisement.');
        console.error('Error adding advertisement:', error);
      });
  };

  return (
    <div>
      <div>
        <b>Add New Campaign</b>
      </div>
    <div className="add-advertisement-container">
      {message && <p>{message}</p>}
      <div className="form-preview-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>
              Campaign Name
              <br />
              <input
                type="text"
                name="add_name"
                value={formData.add_name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Heading Text:
              <br />
              <input
                type="text"
                name="add_name"
                value={formData.add_name}
                onChange={handleChange}
                required
              />
            </label>
            {/* Image Upload Section */}
            <div className="image-upload-section">
              <p>Section 1</p>
              {images.map((image, index) => (
                <div key={index} className="image-upload-container">
                  <label>
                    Image {index + 1} Primary Text:
                    <br />
                    <input
                      type="text"
                      name="primaryText"
                      value={image.primaryText}
                      onChange={(event) => handleImageChange(index, event)}
                    />
                  </label>
                  <label>
                  <br />
                    Image {index + 1} Description:
                    <br />
                    <input
                      type="text"
                      name="description"
                      value={image.description}
                      onChange={(event) => handleImageChange(index, event)}
                    />
                  </label>
                  <label>
                  <br />
                    Image {index + 1}:
                    <br />
                    <input
                      type="file"
                      name="file"
                      onChange={(event) => handleImageChange(index, event)}
                    />
                  </label>
                </div>
              ))}
              {images.length < 5 && (
                <button type="button" onClick={addImageField}>Add Slide</button>
              )}
            </div>

            {/* Other Form Fields */}
            <label>
              Repeat Frequency:
              <br />
              <input
                type="number"
                name="repeat_frequency"
                value={formData.repeat_frequency}
                onChange={handleChange}
              />
            </label>
            <label>
              Delivery:
              <br />
              <input
                type="text"
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
              />
            </label>
            <label>
              Primary Button Text:
              <br />
              <input
                type="text"
                name="primary_button_text"
                value={formData.primary_button_text}
                onChange={handleChange}
              />
            </label>
            <label>
              Primary Button Function:
              <br />
              <input
                type="text"
                name="primary_button_click"
                value={formData.primary_button_click}
                onChange={handleChange}
              />
            </label>
            <label>
              Secondary Button Text:
              <br />
              <input
                type="text"
                name="secondary_button_text"
                value={formData.secondary_button_text}
                onChange={handleChange}
              />
            </label>
            <label>
              Secondary Button Function:
              <br />
              <input
                type="text"
                name="secondary_button_function"
                onChange={handleChange}
              />
            </label>
            <label>
              Starting Date Time:
              <br />
              <input
                type="datetime-local"
                name="starting_date_time"
                placeholder="add start date"
                value={formData.starting_date_time}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Ending Date Time:
              <br />
              <input
                type="datetime-local"
                name="ending_date_time"
                value={formData.ending_date_time}
                onChange={handleChange}
                required
              />
            </label>
          </form>
        </div>
        <h4>Preview</h4>
        <div className="preview-container">
          <div className="preview-content">
            <b className="underline">{formData.add_name}</b>
            <div className="image-preview">
              {images.map((image, index) => (
                <div key={index} className="image-preview-item">
                  {image.preview && <img src={image.preview} alt={`Preview ${index + 1}`} />}
                  <div className="primary-content">
                    <h4>{image.primaryText}</h4>
                    <p>{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <Link to="/">
            <button className="back-button">Cancel</button>
        </Link>
        <button className="publish-button" onClick={handleSubmit}>Publish</button>
      </div>
    </div>
  </div>
  );
};

export default AddAdvertisement;
