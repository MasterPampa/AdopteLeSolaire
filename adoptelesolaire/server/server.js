const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;
const SECONDARY_RANGE = 'Feuille2';

// Parse les données POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration Google Sheets
const SPREADSHEET_ID = '1Mn2WFqDUJaLEoBheN4AfTzqEuFWRArNJiM3QzJAyFPY';
const RANGE = 'Feuille';
const CLIENT_EMAIL = 'testserver@testserver-407609.iam.gserviceaccount.com';
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClSX8qtgjPB9c5\nQktqoxQSMl9fqjTzizJ9YVBCfdQljZuz++9+86Tm/Av7/rFVzt0y7ecyZj1iTa13\noJogPRxm8INRsn/2ZA2o91p9mYPdwUg4ejFEn0Nh9BUBuvIEiu01TE9e6Fimu8iP\nzJONPKzJXzTcVZe4/mXXbzPQiszTpd3Dg9rsfteLxg1DpPQPZTShuNyHTKLfatup\nHKIwAY48YlmrOaBsEro1w/8946CBE5zzo63xjdFW1KmY9XyU4gZAm60blnMPmG3z\nPk8lkozDRUg7JaPMFTp0601TGqE/NRzontq4H/YPVOPgswnW3vJPAesNvlLv7rcP\nqvgUt/UVAgMBAAECggEALijg7U4qFptjdVe41R6XB9/ud7qCkDNjFdXcAr2+RgCO\np8ynnWYwuttQA3+lCcg8STFcfFxGL1JvK/X7pR479Nmdau71Qpu9nt75dBMv2vnU\nEAW8BaSOvmfaiAGr/i3IQja+AczUmTffMp2Y5Xw46wH+Mrxqo1zUlz40k7x3qHF6\nlDGuHdfeYfGrTz5Uo8HLUZ8r/irYDBfSKMlxISifccFSS9rFe8j4YUMZcvXVtV/x\n0ZCJ1EW2f4wDZ5vFfAxZ+Uyzu8dsBVMD9mRh3RZyX402Jgh7cIp7wsdswhPFgwGE\nNXUihlrYBpr/Ep8ZG8vNpv65RxbEr6460N1UN9gt/wKBgQDTz58cyPMDw/kZXe/V\nW08k3roR/k1cJnUTR+bJw74qDlLb7MQArAcnmiESab0zKMyvwQLWLMBR2Di9cMzd\nzlB5znjoX0Fc++WWwWgpbK3YovhNYBn5O8WMCulBjNrrRnG7Q91gMjM5vXoPZTGX\nde5Q2IipxteWl2GUlAH2NHxqnwKBgQDHxSF92oFljN85MN9eql9+O8R9toG15LFa\noMJz1v7oo9mDlpEwH/Z6TVDL6oTC3AGIlobOptsKckWxO/gRyaCFhSRT3dYgqWqp\nsFFM/A/3aVOUPES7+Gz+ggV3IDbANNoGDIy4IwCc8LToiAknbEcdMi7eEZMaRwM4\nqlVT9tD3ywKBgAJaVBIlyU1JaAL4ICnmkcJ/FuIMSR+07agBLHchTYN6FUGMJ8E6\nJ/owpB1oP0nKMjvhkP6AEMLX/Aler2fnWs1/lag/JqK5yZsbGuUa5/N4G/oAD0nN\neCxOErk/r07dwXWrE1J2PEtv52M0ZJCiJruPLDV2l/58QAE+g6cQfjFRAoGAJNTY\nlu6ZWtK9OTskg7yfvJNiZ9clVRbkCBSJpXfnKZdD/DnfbOMHu4bTtbT4Y0DS2479\nLc6fpe5poQKwev8UpGlmyDunRgBWVRDX/HygqPn3WeY+ufVUixwHy+3Zilh0NhdM\nPordixHqGNEz9tvExMJC19ifqYGcO29UKhXgcz8CgYATluc4kZ4x0hu1PdVn9PbR\n14nFeTqqv7+Mx39HRJT1c4P4xJb/C9EF6Qa0ppJ+XyfeiYzwRfLtjreHhfRODocK\ncqFvXh8p2TBwoIZzLF828aJe5HyEfPRWcMeApLtnIU0ZB2E8B9UdYQaJLwqMkkrx\n3AaLvoOW/0bfK0HejCnd/g==\n-----END PRIVATE KEY-----";

// Configuration de l'authentification
const auth = new google.auth.JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre site React
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Endpoint pour gérer les données du formulaire
app.post('/submit-form', async (req, res) => {
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('Données reçues du client :', req.body);
    
    // Traitement des données pour la première feuille
    const values = [[
      req.body.name,
      req.body.address,
      req.body.surface,
      req.body.exposition,
      req.body.vehicules,
      req.body.consotype,
      req.body.consovalue,
      req.body.mail,
    ]];

    // Envoi des données à la première feuille de calcul
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'RAW',
      resource: { values },
    });

    // Traitement des données pour la deuxième feuille
    const secondaryValues = [[
      req.body.tel,
      req.body.postalCode,
    ]];

    // Envoi des données à la deuxième feuille de calcul
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: SECONDARY_RANGE,
      valueInputOption: 'RAW',
      resource: { values: secondaryValues },
    });

    res.status(200).send('Données enregistrées avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données :', error);
    res.status(500).send(`Erreur lors de l'enregistrement des données : ${error.message}`);
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
