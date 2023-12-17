import React, { useState } from 'react';
import './form.css';

function Form() {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    surface: "",
    exposition: "",
    vehicules:"",
    mail:"",
    consotype:"",
    consovalue:"",
  });

  const nextPage = () => {
    if(page < 4){
      setPage(page + 1);
    }
  };
  const backPage = () => {
    if(page > 1){
      setPage(page - 1);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleBack = (e) => {
    e.preventDefault();
    backPage();
  }
  const handleNext = (e) => {
    e.preventDefault();
    nextPage();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Calculs basés sur les données du formulaire
    const pc = 3; // Puissance crête (3 kWc pour un kit classique)
    const irr = 1450; // Irradiation de 1450 kWh/m2.an dans la région
    const fc = parseFloat(formData.exposition); // Conversion de la valeur en nombre
    
    const productionAnnuelle = pc * irr * fc;
    
    const consotype = formData.consotype;
    let consoValue;
  
    if (consotype === "2") {
      // Le montant de la facture mensuel en euro
      consoValue = parseFloat(formData.consovalue);
    } else if (consotype === "1") {
      // La consommation en kWh mensuel
      consoValue = parseFloat(formData.consovalue) * 12;
    } else {
      window.alert('Type de consommation non pris en charge.');
      return; // Quitte la fonction en cas de type de consommation non pris en charge
    }
  
    const tac = (productionAnnuelle / consoValue) * 100;
    const tacAvecPilotage = tac + 20;
    
    const potentielAutoconsommation = (productionAnnuelle * tacAvecPilotage) / 100;
    
    const gainReventeSurplus = productionAnnuelle - potentielAutoconsommation;
    const gainEurosReventeSurplus = gainReventeSurplus * 0.13;
    
    const pourcentageEconomies = (potentielAutoconsommation / consoValue) * 100;
    const pourcentageEconomiesAvecContratEDF = pourcentageEconomies + 8;
  
    const gainEnEurosSurFacture = pourcentageEconomiesAvecContratEDF * consoValue * 0.2276 / 100;
    const amortissementAnnuel = ((gainEnEurosSurFacture + gainEurosReventeSurplus) / (6490 - 1530)) * 100;
  
    // Affichage des résultats dans la fenêtre d'alerte
    window.alert(`
    Production annuelle en kWh: ${Math.floor(productionAnnuelle)}
    Taux d'autoconsommation en %: ${Math.floor(tacAvecPilotage)}
    Potentiel de production autoconsommée en kWh: ${Math.floor(potentielAutoconsommation)}
    Gain avec la revente de surplus à l'année en €: ${Math.abs(Math.floor(gainEurosReventeSurplus))}
    Economies sur la facture annuelle en %: ${Math.floor(pourcentageEconomiesAvecContratEDF)}
    Economies sur la facture à l'année en €: ${Math.floor(gainEnEurosSurFacture)}
    Amortissement de l'installation sur l'année en %: ${Math.floor(amortissementAnnuel)}
  `);
  
    try {
      const response = await fetch('http://localhost:3001/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Données envoyées avec succès.');
      } else {
        console.error('Erreur lors de l\'envoi des données.');
      }
    } catch (error) {
      console.error('Erreur inattendue :', error);
    }

  // Affichage des résultats dans la console
  console.log('Production annuelle en kWh:', productionAnnuelle);
  console.log('Taux d\'autoconsommation:', tacAvecPilotage);
  console.log('Potentiel de production autoconsommée en kWh:', potentielAutoconsommation);
  console.log('Gain en euros avec la revente de surplus à l\'année:', gainEurosReventeSurplus);
  console.log('Pourcentage d\'économies sur la facture annuelle:', pourcentageEconomiesAvecContratEDF);
  console.log('Gain en euros d\'économies sur la facture à l\'année:', gainEnEurosSurFacture);
  console.log('Amortissement de l\'installation sur l\'année:', amortissementAnnuel);
  };

  return (
    <span className="span">
    <div className='route'>
      <div className='dots'>
      <span className='line' style={{ width: `${(page - 1) * 30}%` }}></span>
        <div className={`dot ${page === 1 ? 'selected' : ''}`}>1</div>
        <div className={`dot ${page === 2 ? 'selected' : ''}`}>2</div>
        <div className={`dot ${page === 3 ? 'selected' : ''}`}>3</div>
        <div className={`dot ${page === 4 ? 'selected' : ''}`}>4</div>
      </div>
    </div>
    <div className='formContainer'>
      {page === 1 && (
        <div>
            <h2>Votre estimation</h2>
            <form onSubmit={handleNext} name='formulaire'>
                <label>
                    Entrez votre nom :
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder='Nom prénom'
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Entrez votre adresse :
                    <input
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder='Adresse complète'
                    onChange={handleChange}
                    />
                </label>
                <input type='submit' value="Suivant" className='next'/>
            </form>
        </div>
      )}

      {page === 2 && (
        <div>
            <h2>Votre situation</h2>
            <form onSubmit={handleNext} name='formulaire2'>
                <label>
                    Entrez votre surface :
                    <input
                    type="number"
                    name="surface"
                    value={formData.surface}
                    placeholder='Surface en mêtre carré'
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Selectionnez l'exposition de votre toiture :
                    <select
                      name="exposition"
                      value={formData.exposition}
                      onChange={handleChange}
                    >
                        <option value="0.75">Nord</option>
                        <option value="0.75">Nord-Est</option>
                        <option value="0.85">Est</option>
                        <option value="0.95">Sud-Est</option>
                        <option value="1">Sud</option>
                        <option value="0.95">Sud-Ouest</option>
                        <option value="0.85">Ouest</option>
                        <option value="0.75">Nord-Ouest</option>
                    </select>
                </label>
                <input type='submit' value="Suivant" className='next'/>
            </form>
        </div>
      )}
      {page === 3 && (
  <div>
    <h2>Votre consommation</h2>
    <form onSubmit={handleNext} name='formulaire3'>
      <label>
        Vous connaissez :
        <select
          name="consotype"
          value={formData.consotype}
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            Sélectionnez une option
          </option>
          <option value="1">Votre consommation en kWh mensuel</option>
        </select>
      </label>

      {/* Champ de saisie dynamique en fonction du choix de l'utilisateur */}
      {formData.consotype === "2" && (
  <label>
    <input
      type="number"
      name="consovalue"
      value={formData.consovalue}
      placeholder="Montant mensuel en euro"
      onChange={handleChange}
    />
  </label>
)}

{formData.consotype === "1" && (
  <label>
    <input
      type="number"
      name="consovalue"
      value={formData.consovalue}
      placeholder="Montant mensuel en kWh"
      onChange={handleChange}
    />
  </label>
)}


      <label className='carLabel'>
        Combien de véhicules électriques disposez-vous ? :
        <select
          name="vehicules"
          value={formData.vehicules}
          onChange={handleChange}
        >
          <option value="0 véhicules">0</option>
          <option value="1 véhicules">1</option>
          <option value="2 véhicules">2</option>
          <option value="3 et + véhicules">3 et +</option>
        </select>
      </label>
      <input type='submit' value="Suivant" className='next'/>
    </form>
  </div>
)}
      {page === 4 && (
        <div>
            <h2>Vous</h2>
            <form onSubmit={handleSubmit} name='formulaire4'>
                <label>
                    Votre adresse mail :
                    <input
                    type="email"
                    name="mail"
                    value={formData.mail}
                    placeholder='Adresse email valide'
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Votre numéro de télephone :
                    <input type ="tel" name="tel" maxLength="10" placeholder='Votre numéro de contact' /> 
                </label>
                <input type='submit' value="Envoyer" className='submit'/>
            </form>
        </div>
      )}
      {page > 1 && (
        <span onClick={handleBack} className='backButton'><p>Retour</p></span> 
      )}
    </div>
    </span>
  );
}

export default Form;
