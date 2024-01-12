import React from 'react';
import { useLocation } from 'react-router-dom';
import Plug from '../../images/plug.jpg';
import House from '../../images/house.jpg';
import Battery from '../../images/battery.jpg';

function ResultsDisplay({calculatedResults}) {
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
  
  return (
    <div className="resultContainer">
      <div className="resultData">
        <div className='resultDataContainer'>
          <h2>Basée sur vos données</h2>
          <div className='list'>
            <div className="details">
              <img src={House} alt="Panneau solaire" className='resultImage' />
              <div className="detailsText">
                <h3>{calculatedResults.surface} m²</h3>
                <h3>{Math.floor(calculatedResults.consoValue)} kWh/an</h3>
              </div>
            </div>
            <div className="details">
              <img src={Battery} alt="Panneau solaire" className='resultImage' />
              <div className="detailsText">
                <p>Potentiel production par an</p>
                  <h3 className='ici'>
                    {calculatedResults.consoValue < 11000
                      ? `${calculatedResults.productionAnnuelle} kWh/an estimé`
                      : calculatedResults.consoValue < 15000
                      ? `${calculatedResults.productionAnnuelle4} kWh/an estimé`
                      : `${calculatedResults.productionAnnuelle6} kWh/an estimé`}
                  </h3>              
              </div>
            </div>
            <div className="details">
              <img src={Plug} alt="Panneau solaire" className='resultImage' />
              <div className="detailsText">
                <p>Economies sur factures</p>
                <h3>Jusqu'à {calculatedResults.consoValue < 11000
                      ? `${Math.floor(calculatedResults.pourcentageEconomiesAvecContratEDF)}`
                      : calculatedResults.consoValue < 15000
                      ? `${Math.floor(calculatedResults.pourcentageEconomiesAvecContratEDF4)}`
                      : `${Math.floor(calculatedResults.pourcentageEconomiesAvecContratEDF6)}`}
                 %</h3>
              </div>
            </div>
          </div>
        </div>                    
      </div>
      <div className="cardsContainer">

          <div className={`cards ${calculatedResults.consoValue<11000 ? 'selected' : ''}`}>
            <h3>Kit 3 000 Watts</h3>
            <div className="cardsInfo">
              <div className="flexColumn info">
                <h4>Gain dès la 1ère année</h4>
                <p>
                  {Math.floor(calculatedResults.gainEnEurosSurFacture + calculatedResults.gainEurosReventeSurplus)} €
                </p>
              </div>
              <span></span>
              <div className=" info flexColumn">
                <h4>Autoconsommation</h4>
                <p>
                  {(calculatedResults.tac)} %
                </p>
              </div>
              <span></span>
              <div className="info flexColumn">
                <h4>Durée de l'amortissement</h4>
                <p>
                  {calculatedResults.amortissementAnnuel3} ans
                </p>
              </div>
            </div>
          </div>

          <div className={`cards ${calculatedResults.consoValue<15000 && calculatedResults.consoValue>=11000 ? 'selected' : ''}`}>
            <h3>Kit 4 500 Watts</h3>
            <div className="cardsInfo">
              <div className="flexColumn info">
              <h4>Gain dès la 1ère année</h4>
                <p>
                  {Math.floor(calculatedResults.gainEnEurosSurFacture4 + calculatedResults.gainEurosReventeSurplus4)} €
                </p>
              </div>
              <span></span>
              <div className=" info flexColumn">
                <h4>Autoconsommation</h4>
                  <p>
                    {(calculatedResults.tac4)} %
                  </p>
              </div>
              <span></span>
              <div className="info flexColumn">
                <h4>Durée de l'amortissement</h4>
                <p>
                  {calculatedResults.amortissementAnnuel4} ans
                </p>
              </div>
            </div>
          </div>

          <div className={`cards ${calculatedResults.consoValue>=15000 ? 'selected' : ''}`}>
            <h3>Kit 6 000 Watts</h3>
            <div className="cardsInfo">
              <div className="flexColumn info">
              <h4>Gain dès la 1ère année</h4>
                <p>
                  {Math.floor(calculatedResults.gainEnEurosSurFacture6 + calculatedResults.gainEurosReventeSurplus6)} €
                </p>
              </div>
              <span></span>
              <div className=" info flexColumn">
                <h4>Autoconsommation</h4>
                  <p>
                    {(calculatedResults.tac6)} %
                  </p>
              </div>
              <span></span>
              <div className="info flexColumn">
                <h4>Durée de l'amortissement</h4>
                <p>
                  {calculatedResults.amortissementAnnuel6} ans
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  )}

export default ResultsDisplay;
