import React, { useState } from 'react';
import './form.css';
import { useNavigate } from 'react-router-dom';

function Form() {

  const navigate = useNavigate();

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
  
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [consentChecked, setConsentChecked] = useState(true);

  const backPage = () => {
    if (page > 1) {
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
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextPage();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      if (consentChecked || window.confirm("Êtes-vous sûr de ne pas vouloir conserver les résultats de votre simulation ?")) {
        // Calculs basés sur les données du formulaire
        const pc = 3; // Puissance crête (3 kWc pour un kit classique)
        const irr = 1450; // Irradiation de 1450 kWh/m2.an dans la région
        const fc = parseFloat(formData.exposition); // Conversion de la valeur en nombre
      
        const productionAnnuelle = pc * irr * fc;
      
        const consotype = formData.consotype;
        let consoValue;
    
        if (consotype === "2") {
          // Le montant de la facture mensuel en euro
          consoValue = parseFloat(formData.consovalue)/0.2276*12;
        } else if (consotype === "1") {
          // La consommation en kWh mensuel
          consoValue = parseFloat(formData.consovalue) * 12;
        } else if (consotype === "3") {
          // La consommation en kWh annuelle
          consoValue = parseFloat(formData.consovalue);
        } else if (consotype === "4") {
          // La consommation en euro annuelle
          consoValue = parseFloat(formData.consovalue)/0.2276;
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
  
        const surface = formData.surface;
    
        // Affichage des résultats dans la console
        console.log('Production annuelle en kWh:', productionAnnuelle);
        console.log('Taux d\'autoconsommation:', tacAvecPilotage);
        console.log('Potentiel de production autoconsommée en kWh:', potentielAutoconsommation);
        console.log('Gain en euros avec la revente de surplus à l\'année:', gainEurosReventeSurplus);
        console.log('Pourcentage d\'économies sur la facture annuelle:', pourcentageEconomiesAvecContratEDF);
        console.log('Gain en euros d\'économies sur la facture à l\'année:', gainEnEurosSurFacture);
        console.log('Amortissement de l\'installation sur l\'année:', amortissementAnnuel);
    
        try {
          // Vérifier si le consentement est donné avant d'envoyer les données
          if (consentChecked) {
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
          }
  
          navigate('/results', {
            state: {
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
            },
          });
        } catch (error) {
          console.error('Erreur inattendue :', error);
        }
      } else {
        window.alert('Veuillez remplir tous les champs obligatoires.');
      }
    } else {
      window.alert('Veuillez remplir tous les champs obligatoires.');
    }
  };
  


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
      // Vérifier le consentement
      if (!consentChecked) {
        return true; // Le consentement n'est pas nécessaire, donc retourne true
      }

      // Vérifier l'email et le numéro de téléphone uniquement si le consentement est donné
      const isEmailValidFlag = isEmailValid(formData.mail);
      const isPhoneNumberValidFlag = isPhoneNumberValid(formData.tel);

      setEmailError(isEmailValidFlag ? '' : 'Veuillez entrer une adresse e-mail valide.');
      setPhoneError(isPhoneNumberValidFlag ? '' : 'Veuillez entrer un numéro de téléphone valide.');

      return isEmailValidFlag && isPhoneNumberValidFlag;
    default:
      return true;
  }
};
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
            <form onSubmit={handleNext} name='formulaire'>
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
