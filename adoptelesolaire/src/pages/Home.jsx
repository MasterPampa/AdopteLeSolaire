import ReactModal from 'react-modal';
import { useState } from 'react';
import Header from "../components/header/Header";
import Pins from "../components/pins/Pins"; 
import Form from "../components/form/Form";
import Articles from "../components/articles/Articles";
import Footer from "../components/footer/Footer";
import './modal.css';  // Importez le fichier CSS

function Home() {
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
            <Header openModal={openModal} />
            <Pins openModal={openModal} />
            <main>
                <Form />
                <Articles />
            </main>
            <Footer />

            <ReactModal style={customStyles} isOpen={isModalOpen} onRequestClose={closeModal} className="ma-modal">
                <h2 className='modalTitle'>Contactez-nous :</h2>
                <div className='modalContent flexColumn'>
                    <article className='contacts'>
                        <i class="fa-solid fa-phone fa-2xl"></i>
                        <p>01.50.51.52.53</p>
                    </article> 
                    <article className='contacts'>
                        <i class="fa-solid fa-envelope fa-2xl"></i>
                        <p>testEmail@Testmail.com</p>
                    </article> 
                    <article className='contacts'>
                        <i class="fa-solid fa-clock fa-2xl"></i>
                        <span className='flexColumn'>
                            <h4>Horaires d'ouverture :</h4>
                            <p>Du lundi au vendredi de 8h00 à 19h00</p>
                        </span>
                    </article> 
                </div>
                <i className='fa-regular fa-circle-xmark fa-2xl close' onClick={closeModal}></i>
            </ReactModal>
        </div>
    );
}

export default Home;
