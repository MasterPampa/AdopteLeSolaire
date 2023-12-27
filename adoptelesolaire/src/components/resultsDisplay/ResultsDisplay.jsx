import React from 'react';
import { useLocation } from 'react-router-dom';
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
    surface,
  } = location.state || {};

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
                <p>Potentiel production par an :</p>
                <h3>{Math.floor(productionAnnuelle)} kWh</h3>
              </div>
            </div>
            <div className="details">
              <img src={Plug} alt="Panneau solaire" className='resultImage' />
              <div className="detailsText">
                <p>Autoconsommation :</p>
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
