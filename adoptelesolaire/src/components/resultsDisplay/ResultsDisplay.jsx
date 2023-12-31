import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Plug from '../../images/plug.jpg';
import House from '../../images/house.jpg';
import Battery from '../../images/battery.jpg';
import jsPDF from 'jspdf';

function ResultsDisplay() {
  const location = useLocation();
  const {
    productionAnnuelle,
    consoValue,
    tacAvecPilotage,
    pourcentageEconomiesAvecContratEDF,
    gainEnEurosSurFacture,
    amortissementAnnuel,
    surface,
  } = location.state || {};

  const generatePDFAndSendEmail = async () => {
    const pdf = new jsPDF();
    pdf.text(`Surface: ${surface} m²`, 10, 10);
    pdf.text(`Production annuelle: ${Math.floor(productionAnnuelle)} kWh`, 10, 20);

    // Convertissez le PDF en une chaîne de caractères base64
    const pdfBase64 = pdf.output('datauristring');

    // Effectuez une demande POST au serveur avec le PDF en tant que données
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdfBase64, otherData: '...'}),
      });

      if (response.ok) {
        alert('E-mail envoyé avec succès !');
      } else {
        alert('Erreur lors de l\'envoi de l\'e-mail.');
      }
    } catch (error) {
      console.error('Erreur lors de la demande POST :', error);
      alert('Erreur lors de l\'envoi de l\'e-mail.');
    }
  };

  useEffect(() => {
    // Appeler la fonction automatiquement au chargement de la page
    generatePDFAndSendEmail();
  }, []); // Le tableau vide en tant que deuxième argument signifie que cela s'exécutera une seule fois après le montage initial.

  return (
    <div className="resultContainer">
      <div className="resultData">
        <div className='resultDataContainer'>
          <h2>Basée sur vos données</h2>
          <div className='list'>
            <div className="details">
              <img src={House} alt="Panneau solaire" className='resultImage' />
              <div className="detailsText">
                <h3>{surface} m²</h3>
                <h3>{consoValue} kWh/an</h3>
              </div>
            </div>
            <div className="details">
              <img src={Battery} alt="Panneau solaire" className='resultImage' />
              <div className="detailsText">
                <p>Potentiel production par an</p>
                <h3>{Math.floor(productionAnnuelle)} kWh</h3>
              </div>
            </div>
            <div className="details">
              <img src={Plug} alt="Panneau solaire" className='resultImage' />
              <div className="detailsText">
                <p>Autoconsommation</p>
                <h3>{Math.floor(tacAvecPilotage)} %</h3>
              </div>
            </div>
          </div>
        </div>                    
      </div>
      <div className="cardsContainer">

          <div className="cards selected">
            <h3>Kit 3 000 Watts</h3>
            <div className="cardsInfo">
              <div className="flexColumn info">
                <h4>Gain dès la 1ère année</h4>
                <p>
                  {Math.floor(gainEnEurosSurFacture)} €
                </p>
              </div>
              <span></span>
              <div className=" info flexColumn">
                <h4>Econonomies sur factures</h4>
                <p>
                  {Math.floor(pourcentageEconomiesAvecContratEDF)} %
                </p>
              </div>
              <span></span>
              <div className="info flexColumn">
                <h4>Durée de l'amortissement</h4>
                <p>
                  {Math.floor(amortissementAnnuel)}
                </p>
              </div>
            </div>
          </div>

          <div className="cards">
            <h3>Kit 3 000 Watts</h3>
            <div className="cardsInfo">
              <div className="flexColumn info">
                <h4>Gain dès la 1ère année</h4>
                <p>
                  {Math.floor(gainEnEurosSurFacture)} €
                </p>
              </div>
              <span></span>
              <div className=" info flexColumn">
                <h4>Econonomies sur factures</h4>
                <p>
                  {Math.floor(pourcentageEconomiesAvecContratEDF)} %
                </p>
              </div>
              <span></span>
              <div className="info flexColumn">
                <h4>Durée de l'amortissement</h4>
                <p>
                  {Math.floor(amortissementAnnuel)}
                </p>
              </div>
            </div>
          </div>

          <div className="cards">
            <h3>Kit 3 000 Watts</h3>
            <div className="cardsInfo">
              <div className="flexColumn info">
                <h4>Gain dès la 1ère année</h4>
                <p>
                  {Math.floor(gainEnEurosSurFacture)} €
                </p>
              </div>
              <span></span>
              <div className=" info flexColumn">
                <h4>Econonomies sur factures</h4>
                <p>
                  {Math.floor(pourcentageEconomiesAvecContratEDF)} %
                </p>
              </div>
              <span></span>
              <div className="info flexColumn">
                <h4>Durée de l'amortissement</h4>
                <p>
                  {Math.floor(amortissementAnnuel)}
                </p>
              </div>
            </div>
          </div>

      </div>
    </div>
  )}

export default ResultsDisplay;
