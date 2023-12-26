import React from 'react';
import { useLocation } from 'react-router-dom';
import './resultsDisplay.css';
import Plug from '../../images/plug.jpg'
import House from '../../images/house.jpg'
import Solar from '../../images/solar.jpg'
import Battery from '../../images/battery.jpg'



function ResultsDisplay() {
  const location = useLocation();
  const {
    productionAnnuelle,
    consoValue,
    tacAvecPilotage,
    potentielAutoconsommation,
    gainReventeSurplus,
    gainEurosReventeSurplus,
    pourcentageEconomiesAvecContratEDF,
    gainEnEurosSurFacture,
    amortissementAnnuel,
  } = location.state || {};

  return (
    <div className="resultContainer">
      <div className="resultBox">
        <div className='flexColumn resultsContainer'>
          <h2>Simulation basée sur vos données</h2>
          <div className="details">
            <img src={Solar} alt="Panneau solaire" className='resultImage' />
          </div>
        </div>                    
      </div>
      <div className="cardsContainer">

          <div className="cards selected">
            <h3>Kit 3 000 Watts</h3>
            <div className="cardsInfo">
              <div className="flexColumn info">
                <h4>Dès la 1ère année</h4>
                <p>
                  {Math.floor(gainEnEurosSurFacture)} €
                </p>
              </div>
              <span></span>
              <div className=" info flexColumn">
                <h4>Facture</h4>
                <p>
                  {Math.floor(pourcentageEconomiesAvecContratEDF)} %
                </p>
              </div>
              <span></span>
              <div className="info flexColumn">
                <h4>Amortissement</h4>
                <p>
                  {Math.floor(amortissementAnnuel)}
                </p>
              </div>
            </div>
          </div>

          <div className="cards">
            <h3>Kit 6 000 Watts</h3>
            <div className="cardsInfo">
              <div className="flexColumn info">
                <h4>Dès la 1ère année</h4>
                <p>
                  {Math.floor(gainEnEurosSurFacture)} €
                </p>
              </div>
              <span></span>
              <div className=" info flexColumn">
                <h4>Facture</h4>
                <p>
                  {Math.floor(pourcentageEconomiesAvecContratEDF)} %
                </p>
              </div>
              <span></span>
              <div className="info flexColumn">
                <h4>Amortissement</h4>
                <p>
                  {Math.floor(amortissementAnnuel)}
                </p>
              </div>
            </div>
          </div>

          <div className="cards">
            <h3>Kit 9 000 Watts</h3>
            <div className="cardsInfo">
              <div className="flexColumn info">
                <h4>Dès la 1ère année</h4>
                <p>
                  {Math.floor(gainEnEurosSurFacture)} €
                </p>
              </div>
              <span></span>
              <div className=" info flexColumn">
                <h4>Facture</h4>
                <p>
                  {Math.floor(pourcentageEconomiesAvecContratEDF)} %
                </p>
              </div>
              <span></span>
              <div className="info flexColumn">
                <h4>Amortissement</h4>
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
