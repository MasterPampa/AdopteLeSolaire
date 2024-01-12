import React from 'react';
import Header from '../../components/header/Header';
import Pins from '../../components/pins/Pins';
import Footer from '../../components/footer/Footer';
import ReactModal from 'react-modal';
import ResultsDisplay from '../../components/resultsDisplay/ResultsDisplay';
import { useState } from 'react';
import ContactForm from "../../components/contactForm/ContactForm"
import './results.css'
import Sun from '../../images/sun.jpg'
import { useLocation } from 'react-router-dom';

function Results() {
   
    const location = useLocation();
    const calculatedResults = location.state && location.state.calculatedResults;

    const handleContactFormSubmit = async (formData) => {
        try {
          const response = await fetch('https://adoptelesolaire.fr/api/submit-form', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            console.log('Données envoyées avec succès !');
          } else {
            console.error('Erreur lors de l\'envoi des données au serveur.');
          }
        } catch (error) {
          console.error('Erreur lors de la communication avec le serveur :', error);
        }
      };

    ReactModal.setAppElement('#root');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }
    }


    return ( 
        <div>
            <span className='loading'>
                <h2>Chargement de vos résultats...</h2>
                <div className="gear">
                    <img src={Sun} alt="loading Sun" />
                </div>
            </span>
            <ReactModal style={customStyles} isOpen={isModalOpen} onRequestClose={closeModal} className="ma-modal">
                <h2 className='modalTitle'>Nous contacter :</h2>
                <div className="menu">
                    <h3>Une question ? </h3><h3>On vous rappel : </h3>
                </div>
                <div className='modalContent'>
                    <span className='contactContainer'>
                        <article className='contacts'>
                            <i className="fa-solid fa-phone fa-2xl"></i>
                            <p>01.50.51.52.53</p>
                        </article> 
                        <article className='contacts'>
                            <i className="fa-solid fa-envelope fa-2xl"></i>
                            <p>testEmail@Testmail.com</p>
                        </article> 
                        <article className='contacts'>
                            <i className="fa-solid fa-clock fa-2xl"></i>
                            <span className='flexColumn'>
                                <h4>Horaires d'ouverture :</h4>
                                <p>Du lundi au vendredi de 8h00 à 19h00</p>
                            </span>
                        </article> 
                    </span>
                    <ContactForm onSubmit={handleContactFormSubmit}/>
                </div>
                <i className='fa-regular fa-circle-xmark fa-2xl close' onClick={closeModal}></i>
            </ReactModal>
            <Header openModal={openModal} />
            <Pins openModal={openModal} />
            <main>
                <ResultsDisplay calculatedResults={calculatedResults}/>
            </main>
            <Footer /> 
        </div>
    );
}

export default Results;