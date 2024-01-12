import React, { useState, useRef } from 'react';
import './form.css';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '../autocomplete/Autocomplete'
function Form() {

  const navigate = useNavigate();
  const locationSearchInputRef = useRef(); 

  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    address: "",
    surface: "",
    exposition: "",
    vehicules:"",
    mail:"",
    consotype:"",
    consovalue:"",
    tel:"",
    productionAnnuelle:"",
    tac:"",
    potentielAutoconsomme:"",
    surplusAnnuel:"",
    gainEurosReventeSurplus:"",
    pourcentageEconomiesAvecContratEDF:"",
    gainEnEurosSurFacture:"",
    nomprenom:"",
    productionAnnuelle4:"",
    tac4:"",
    potentielAutoconsomme4:"",
    surplusAnnuel4:"",
    gainEurosReventeSurplus4:"",
    pourcentageEconomiesAvecContratEDF4:"",
    gainEnEurosSurFacture4:"",
    productionAnnuelle6:"",
    tac6:"",
    potentielAutoconsomme6:"",
    surplusAnnuel6:"",
    gainEurosReventeSurplus6:"",
    pourcentageEconomiesAvecContratEDF6:"",
    gainEnEurosSurFacture6:"",
    amortissementAnnuel3:"",
    amortissementAnnuel4:"",
    amortissementAnnuel6:"",
    meilleurChoix:"",
  });

  const nextPage = () => {
    if (validateForm()) {
      setPage(page + 1);
    } else {
      window.alert('Veuillez remplir tous les champs obligatoires.');
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isPhoneNumberValid = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const isNameValid = (nomprenom) => {
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    return nameRegex.test(nomprenom);
  }
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [consentChecked, setConsentChecked] = useState(true);

  const backPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target || e; 
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBack = (e) => {
    e.preventDefault();
    backPage();
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextPage();
  };

  const handleFirstNext = (e) => {
    if (locationSearchInputRef.current && locationSearchInputRef.current.state.addressSelected) {
      nextPage();
    } else {
      alert("Veuillez choisir une adresse avant de passer à l'étape suivante.");
      e.preventDefault();
    }
  };

  const onAddressSelect = (address) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      address,
    }));
  };

  const effectuerCalculs = () => {
    //  logique de calcul ici
      // Calculs basés sur les données du formulaire
      const pc = 3;
      const irr = 1450; 
      const fc = parseFloat(formData.exposition); // Conversion de la valeur en nombre

      const productionAnnuelle = pc * irr * fc;

      const consotype = formData.consotype;
      let consoValue;

      if (consotype === "2") {
        // Le montant de la facture mensuel en euro
        consoValue = parseFloat(formData.consovalue) / 0.2276 * 12;
      } else if (consotype === "1") {
        // La consommation en kWh mensuel
        consoValue = parseFloat(formData.consovalue) * 12;
      } else if (consotype === "3") {
        // La consommation en kWh annuelle
        consoValue = parseFloat(formData.consovalue);
      } else if (consotype === "4") {
        // La consommation en euro annuelle
        consoValue = parseFloat(formData.consovalue) / 0.2276;
      } else {
        window.alert('Type de consommation non pris en charge.');
        return;
      }

      const tac = 78.6;
      const tacAvecPilotage = (tac + 20);
      const potentielAutoconsommation = ((productionAnnuelle * tac) / 100);
      const potentielAutoconsomme = (productionAnnuelle * (tac / 100));
      const surplusAnnuel = (productionAnnuelle - potentielAutoconsomme);
      const gainReventeSurplus = (productionAnnuelle - potentielAutoconsommation);
      const gainEurosReventeSurplus = (gainReventeSurplus * 0.13);
      const pourcentageEconomies = ((potentielAutoconsommation / consoValue) * 100);
      const pourcentageEconomiesAvecContratEDF = (pourcentageEconomies + 8);
      const gainEnEurosSurFacture = ((pourcentageEconomiesAvecContratEDF * consoValue * 0.2276) / 100);
      const amortissementAnnuel = (((gainEnEurosSurFacture + gainEurosReventeSurplus) / (6490 - 1530)) * 100);
      const surface = formData.surface;
      // calcul pour le kit 4.5 pour le pdf
      const pc4 = 4.5;
      const productionAnnuelle4 = pc4 * irr * fc;
      const tac4 = 60.3;
      const tacAvecPilotage4 = (tac4 + 20);
      const potentielAutoconsommation4 = ((productionAnnuelle4 * tac4) / 100);
      const potentielAutoconsomme4 = (productionAnnuelle4 * (tac4 / 100)); 
      const surplusAnnuel4 = (productionAnnuelle4 - potentielAutoconsomme4); 
      const gainReventeSurplus4 = (productionAnnuelle4 - potentielAutoconsommation4);
      const gainEurosReventeSurplus4 = (gainReventeSurplus4 * 0.13);
      const pourcentageEconomies4 = ((potentielAutoconsommation4 / consoValue) * 100);
      const pourcentageEconomiesAvecContratEDF4 = (pourcentageEconomies4 + 8);
      const gainEnEurosSurFacture4 = ((pourcentageEconomiesAvecContratEDF4 * consoValue * 0.2276) / 100);

      // Calculs pour le kit 6 kW pour le pdf
      const pc6 = 6;
      const productionAnnuelle6 = pc6 * irr * fc;
      const tac6 = 48.9; 
      const tacAvecPilotage6 = (tac6 + 20); 
      const potentielAutoconsommation6 = ((productionAnnuelle6 * tac6) / 100); 
      const potentielAutoconsomme6 = (productionAnnuelle6 * (tac6 / 100)); 
      const surplusAnnuel6 = (productionAnnuelle6 - potentielAutoconsomme6); 
      const gainReventeSurplus6 = (productionAnnuelle6 - potentielAutoconsommation6); 
      const gainEurosReventeSurplus6 = (gainReventeSurplus6 * 0.13);
      const pourcentageEconomies6 = ((potentielAutoconsommation6 / consoValue) * 100); 
      const pourcentageEconomiesAvecContratEDF6 = (pourcentageEconomies6 + 8);
      const gainEnEurosSurFacture6 = ((pourcentageEconomiesAvecContratEDF6 * consoValue * 0.2276) / 100); 
      // calcul amortissement

      const prix3 = 6490;
      const prix4 = 9990;
      const prix6 = 12490;

      const amortissement3 = (((gainEnEurosSurFacture + gainEurosReventeSurplus) / (prix3 - 1530)) * 100); // Temps d'amortissement en années
      const amortissement4 = (((gainEnEurosSurFacture4 + gainEurosReventeSurplus4) / (prix4 - 1530)) * 100); // Temps d'amortissement en années
      const amortissement6 = (((gainEnEurosSurFacture6 + gainEurosReventeSurplus6) / (prix6 - 1530)) * 100); // Temps d'amortissement en années

      const amortissementAnnuel3 = ((100/amortissement3).toFixed(1));
      const amortissementAnnuel4 = ((100/amortissement4).toFixed(1));
      const amortissementAnnuel6 = ((100/amortissement6).toFixed(1));
      let meilleurChoix;

      if (formData.consovalue < 11000) {
        meilleurChoix = "Kit 3 000W";
      } else if (formData.consovalue >= 11000 && formData.consovalue < 15000) {
        meilleurChoix = "Kit 4 500W";
      } else {
        meilleurChoix = "Kit 6 000W";
      }

    // Mettre à jour l'état avec les valeurs calculées
    const calculatedResults = {
      productionAnnuelle,
      tac,
      potentielAutoconsomme,
      surplusAnnuel,
      gainEurosReventeSurplus,
      pourcentageEconomiesAvecContratEDF,
      gainEnEurosSurFacture,
      amortissementAnnuel,
      productionAnnuelle4,
      tac4,
      potentielAutoconsomme4,
      surplusAnnuel4,
      gainEurosReventeSurplus4,
      pourcentageEconomiesAvecContratEDF4,
      gainEnEurosSurFacture4,
      productionAnnuelle6,
      tac6,
      potentielAutoconsomme6,
      surplusAnnuel6,
      gainEurosReventeSurplus6,
      pourcentageEconomiesAvecContratEDF6,
      gainEnEurosSurFacture6,
      amortissementAnnuel3,
      amortissementAnnuel4,
      amortissementAnnuel6,
      surface,
      consoValue,
      meilleurChoix,
    };
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...calculatedResults,
    }));
  
    return calculatedResults; // Renvoi les résultats des calculs actualisé pour la page des résultats
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      window.alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    const calculatedResults = effectuerCalculs();
    
    if (consentChecked) {
      
      try {
        // Envoi des données si le consentement est donné
        const response = await fetch('https://adoptelesolaire.fr/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            ...calculatedResults,
          }),
        });
    
        if (response.ok) {
          navigate('/results', { state: { calculatedResults } });
        } else {
          console.error('Erreur lors de l\'envoi des données :');
        }
      } catch (error) {
        console.error('Erreur inattendue :', error);
      }
    }
    if (!consentChecked) {
      navigate('/results', { state: { calculatedResults } });
    }
  }

  const validateForm = () => {
    switch (page) {
      case 1:
        return formData.address.trim() !== '';
      case 2:
        return formData.surface.trim() !== '' && formData.exposition.trim() !== '';
      case 3:
        return (
          formData.consotype.trim() !== '' &&
          formData.consovalue.trim() !== '' &&
          formData.vehicules.trim() !== ''
        );
      case 4:
        // Vérifie le consentement
        if (!consentChecked) {
          return true; // Le consentement n'est pas obligatoire
        }

        // Vérifie l'email et le numéro de téléphone uniquement si le consentement est donné
        const isEmailValidFlag = isEmailValid(formData.mail);
        const isPhoneNumberValidFlag = isPhoneNumberValid(formData.tel);
        const isNameValidFlag = isNameValid(formData.nomprenom);

        setEmailError(isEmailValidFlag ? '' : 'Veuillez entrer une adresse e-mail valide.');
        setPhoneError(isPhoneNumberValidFlag ? '' : 'Veuillez entrer un numéro de téléphone valide.');
        setNameError(isNameValidFlag ? '' : 'Veuillez entrer un nom et prenom valide.');
        return isEmailValidFlag && isPhoneNumberValidFlag && isNameValidFlag;
      default:
        return true;
    }
  }

  return (
    <span className="span">
    <div className='route'>
      <div className='dots'>
      <span className='line' style={{ width: `${(page - 1) * 30}%` }}></span>
        <div className={`dot ${page === 1 ? 'selected' : ''}`}>1</div>
        <div className={`dot ${page === 2 ? 'selected' : ''} ${page < 2 ? 'opacity' : ''}`}>2</div>
        <div className={`dot ${page === 3 ? 'selected' : ''} ${page < 3 ? 'opacity' : ''}`}>3</div>
        <div className={`dot ${page === 4 ? 'selected' : ''} ${page < 4 ? 'opacity' : ''}`}>4</div>
      </div>
    </div>
    <div className='formContainer'>
      {page === 1 && (
        <div>
            <h2>Votre estimation</h2>
            <form onSubmit={handleFirstNext} name='formulaire'>
            <label>
          Entrez votre adresse :
          <Autocomplete onAddressSelect={onAddressSelect} ref={locationSearchInputRef}/>
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
                        <option value="" disabled hidden>
                          Sélectionnez une option
                        </option>
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
              Vous connaissez votre consommation :
              <select
                name="consotype"
                value={formData.consotype}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Sélectionnez une option
                </option>
                <option value="1">En kWh mensuel</option>
                <option value="2">En Euro mensuel</option>
                <option value="3">Annuelle en kWh</option>
                <option value="4">Annuelle en Euro</option>
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
            {formData.consotype === "3" && (
              <label>
                <input
                  type="number"
                  name="consovalue"
                  value={formData.consovalue}
                  placeholder="Montant annuelle en kWh"
                  onChange={handleChange}
                />
              </label>
            )}
            {formData.consotype === "4" && (
              <label>
                <input
                  type="number"
                  name="consovalue"
                  value={formData.consovalue}
                  placeholder="Montant annuelle en euro"
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
                <option value="" disabled hidden>
                  Sélectionnez une option
                </option>
                <option value="0 vehicules">0</option>
                <option value="1 vehicules">1</option>
                <option value="2 vehicules">2</option>
                <option value="3 et + vehicules">3 et +</option>
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
            <label className='consent'>
              Recevoir votre étude personalisée :
              <input
                type="checkbox"
                name="consent"
                value="true"
                checked={consentChecked}
                onChange={() => setConsentChecked(!consentChecked)}
              />
            </label>
            {/* Afficher les champs email et numéro uniquement si le consentement est donné */}
            {consentChecked && (
              <>
                <label>
                  Votre adresse mail :
                  <input className='check'
                    type="email"
                    name="mail"
                    value={formData.mail}
                    placeholder='Adresse email valide'
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Votre numéro de télephone :
                  <input
                    type="tel"
                    name="tel"
                    maxLength="10"
                    placeholder='Votre numéro de contact'
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Votre nom et prénom :
                  <input
                    type="text"
                    name="nomprenom"
                    maxLength="30"
                    placeholder='Nom et prénom'
                    onChange={handleChange}
                  />
                </label>
              </>
            )}
            <input type='submit' value="Envoyer" className='submit'/>
            {consentChecked && ( 
              <>
              <p className='mention'>En soumettant ce formulaire, j'accepte que les données saisie soient utilisées à des fins de relation commerciale.</p>
              </>
            )}
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
