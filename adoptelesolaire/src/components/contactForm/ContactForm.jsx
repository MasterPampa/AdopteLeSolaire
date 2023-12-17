import React, { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    tel: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez effectuer des validations supplémentaires ici si nécessaire
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Votre numéro de téléphone :
        <input
          type="tel"
          name="tel"
          value={formData.tel}
          placeholder="Votre numéro de contact"
          onChange={handleChange}
        />
      </label>
      <label>
        Votre code postal :
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          placeholder="Votre code postal"
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default ContactForm;
