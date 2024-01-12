import './footer.css'
import ReactModal from 'react-modal';
import { useState } from 'react';

function Footer() {

    ReactModal.setAppElement('#root');

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
        } else {
            console.error('Erreur lors de l\'envoi des données au serveur.');
          }
        } catch (error) {
          console.error('Erreur lors de la communication avec le serveur :', error);
        }
      };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openLegalModal = () => {
        setIsLegalModalOpen(true);
    };
    const closeLegalModal = () => {
        setIsLegalModalOpen(false);
    };
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }
    }

    return ( 
        <footer>
            <div className="leftSide flexColumn">
                <h3>AdopteLeSolaire.fr</h3>
                <div className="links flexColumn">
                    <a onClick={openLegalModal} style={{'textDecoration' : 'underline', 'cursor':'pointer'}}>Mentions légales</a>
                    <a onClick={openModal} style={{'textDecoration' : 'underline', 'cursor':'pointer'}}>Credits</a>
                </div>
            </div>
            <div className="rightSide">
                <div className="socials">
                    <p>Rejoignez-nous sur les réseaux : </p>
                    <span>
                        <a href="#"><i className="fa-brands fa-facebook fa-2xl"></i></a>
                        <a href="#"><i className="fa-brands fa-x-twitter fa-2xl"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram fa-2xl"></i></a>
                        <a href="#"><i className="fa-brands fa-youtube fa-2xl"></i></a>
                    </span>
                </div>
            </div>

            <ReactModal style={customStyles} isOpen={isModalOpen} onRequestClose={closeModal} className="ma-modal footermodal">
                <a href="https://fr.freepik.com/vecteurs-libre/eco-energy-flat-icons_3948202.htm#query=panneau%20solaire&position=3&from_view=search&track=ais&uuid=4981c8b2-6960-4543-aad0-79c9d4fc9559">Image de macrovector</a> sur Freepik
                <a href="https://fr.freepik.com/vecteurs-libre/personnes-actives-velos-moulins-vent-maison-panneau-solaire-illustration-plat-toit_11235236.htm#query=photovoltaique&position=0&from_view=search&track=sph&uuid=738534a1-e319-4f34-ab18-a5199e7d55b3">Image de pch.vector</a> sur Freepik
                <a href="https://fr.freepik.com/vecteurs-libre/concept-realisation-objectif-commercial-jeune-homme-affaires-est-heureux-que-entreprise-reussisse-comme-fleche-qui-tire-precision-au-centre-cible-illustration-vectorielle_25273833.htm#query=target%20success&position=6&from_view=search&track=ais&uuid=6512412a-3aef-4cf2-a914-bb5d32eb10dd">Image de jcomp</a> sur Freepik
                <a href="https://fr.freepik.com/vecteurs-libre/femme-reflechie-ordinateur-portable-regardant-grand-point-interrogation_13330330.htm#query=question&position=0&from_view=search&track=sph&uuid=86cdb2b7-4b8c-444b-9b4f-0aff24bae667">Image de jcomp</a> sur Freepik
            </ReactModal>
            <ReactModal style={customStyles} isOpen={isLegalModalOpen} onRequestClose={closeLegalModal} className="ma-modal footermodal">
                <h2>Mentions légales et politique de confidentialités</h2>
            </ReactModal>
        </footer>
    );
}

export default Footer;