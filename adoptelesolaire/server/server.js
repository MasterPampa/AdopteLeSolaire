const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3001;
const { sendTestEmail } = require('./email');

// Chargement du fichier PDF
const pdfPath = path.join(__dirname, '../final.pdf');
app.use('/pdf', express.static(path.join(__dirname, '../final.pdf')));

app.get('/pdf', (req, res) => {
  res.sendFile(pdfPath);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));

// Configuration Google Sheets
const SPREADSHEET_ID = '1Td86hAsLNZHGlO_lXVWr2JhHeaOWu46E0TJXQw_cP7k';
const RANGE = 'Feuille';
const SECONDARY_RANGE = 'Feuille2';
const CLIENT_EMAIL = 'adoptelesolaire@simulateur-leads.iam.gserviceaccount.com';
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCysPOR9fnWZ+iM
poqZusMnDipge/ug/STFWq/vnG5Po/eYkbkIHM0iuEC3LZtmST2PEBSvNPhYUiRP
ztetsOE2p4uLWEKO/9B6Nri156pNfpwC+MT3W8VsAWpEBamBb+ZwCRCo6lZLHRE+
2wye/UCsfuIqxNVYktVTR26lzk2FxCyFmk4a4BCi8oNzm4rdQIvY6xMR50hsWJfA
agghnmdyBLjozAkzqoNtCL4BEIIHQI59k3eOuWQ435fa0PQJBlSIXz9CF3LWq6qb
+DHvX9m99ItbD9GxobKX1d/eR+Usi8HwLoqdDa6UTCv1qb7UKQEvG2TZOVjo57dz
e2plhQ/vAgMBAAECggEAI+bwsTliLqVm8Gd/vn5rOlwawJL4jjJ+YlajtblQ4ph3
pURWEF61Co5JlmRH7ke14hohhchXQ2uRlyVgaSn6PgBwxZkAmnmkegGnoAjBS1uu
Xdx8upRKOLaaEruugG6qtoTjv4SBvQrEjcP2J7WLenzt1RkCIo8x5E8cWJz4L3FS
NtaCVc6M30NkbZ8AxXWypsS17czw2HaHlkDdvfd+MyfJVlaWMpGrlBRHRAEZt8rt
65Grxv5YHFWEMiRCSWKucH/+h5Tnf9X9nDcmIphQIZnNd8pPuRZu/948jIQuH7zw
xnmcALCeAAjkHrWTL6vD6wYfu5RScGfEJWSz7f2ONQKBgQDlWyaxi6ZE5whsUwk/
HCFJeT0KjFw7olWVbctUud3x/hmb1FIXUm5BUXajC5lkz06KZZ0XB6dFt4cehn+c
vCsLMG9XD9qIFrIZrusGUigHT870XrWFEXTm2z9d3eoVr8AQXU3sHxa2rmk2S30j
dQUajA6i2Tqw3O3WFurd7ULSWwKBgQDHcxJ3mqtkDfQl0zHE+Yr2+Celzj+S8vzf
zF2NKCI1fwAhXU6Mzv3nziz417tNTNooIQe92FhK1r3D4rha1fh2W4QGGyH1mACx
TWPps6Aw4VdApxDZEMdlOU/viBrNNGSkX9hMZyW93HqVUaRmT2ctdTINS00w9hch
KCIN/MFE/QKBgQC12vxnMo93eqiXG4/tVmSeWV8pCfnn3uN1REVAvM9anVu4zzT4
AQgjCnDC/uN1p1pjKgbQx+S9xrOAZKyynhCTIqhlo9Bmr3gwHR2FOYc7pPA3mxDa
nejPU3B/AQImh+AGGbU7T7s2xjvuLRTgFF0jm4HPZea/ba23XxyDMykUmQKBgDGm
CYDQdb2wY4hO7GK2I8uatnPlxZmU9zHWs6sBxJJAjQ3BJl6S4E2l2zgOq8dwTBYV
MtIlWsU2c4Khm3axMOp1mYXTlz6FmhaIx0hTuJqyXX/wlpcSQDCIdceQv+s5EZyB
Z1yNiK2chr9I1X3KYkrEk7MPfaWkfNl6HhARTSMZAoGAdEbTIxixkYVY2s4pBSzc
O26XUBLI7SSBHgg9lNyFljZqblYpVaxbwd3NPfEvmXPYqFZROLSPWq9p9zm5I8q+
Ll2zqC3UE2N9Y0+FIOyof8WOrUR740LEH5GrL987rYi/GWHZQN7MtzfTgn3aRa/b
+XXSBeAXhuftlswQ55V+zjY=
-----END PRIVATE KEY-----`;


// Configuration de l'authentification
const auth = new google.auth.JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Configuration CORS
const corsOptions = {
  origin: 'https://adoptelesolaire.fr',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.post('/submit-form', async (req, res) => {
  console.log('demande recu')
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('Données reçues du client :', req.body);
    
    // Traitement des données pour la première feuille
    const values = [[
      req.body.nomprenom,
      req.body.address,
      req.body.mail,
      req.body.tel,
      req.body.consovalue,
      req.body.surface,
      req.body.vehicules,
    ]];
    const valuesPdf = [[
      req.body.address.toString(),
      req.body.surface.toString(),
      req.body.exposition.toString(),
      req.body.vehicules.toString(),
      req.body.consotype.toString(),
      req.body.consovalue.toString(),
      req.body.mail.toString(),
      req.body.tel.toString(),
      Math.floor(req.body.productionAnnuelle).toString(),
      Math.floor(req.body.tac).toString(),
      Math.floor(req.body.potentielAutoconsomme).toString(),
      Math.floor(req.body.surplusAnnuel).toString(),
      Math.floor(req.body.gainEurosReventeSurplus).toString(),
      Math.floor(req.body.pourcentageEconomiesAvecContratEDF).toString(),
      Math.floor(req.body.gainEnEurosSurFacture).toString(),
      req.body.nomprenom.toString(),
      Math.floor(req.body.productionAnnuelle4).toString(),
      Math.floor(req.body.tac4).toString(),
      Math.floor(req.body.potentielAutoconsomme4).toString(),
      Math.floor(req.body.surplusAnnuel4).toString(),
      Math.floor(req.body.gainEurosReventeSurplus4).toString(),
      Math.floor(req.body.pourcentageEconomiesAvecContratEDF4).toString(),
      Math.floor(req.body.gainEnEurosSurFacture4).toString(),
      Math.floor(req.body.productionAnnuelle6).toString(),
      Math.floor(req.body.tac6).toString(),
      Math.floor(req.body.potentielAutoconsomme6).toString(),
      Math.floor(req.body.surplusAnnuel6).toString(),
      Math.floor(req.body.gainEurosReventeSurplus6).toString(),
      Math.floor(req.body.pourcentageEconomiesAvecContratEDF6).toString(),
      Math.floor(req.body.gainEnEurosSurFacture6).toString(),
      req.body.amortissementAnnuel3.toString(),
      req.body.amortissementAnnuel4.toString(),
      req.body.amortissementAnnuel6.toString(),
      req.body.meilleurChoix.toString(),
    ]]
    

    // Envoi des données à la première feuille de calcul
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'RAW',
      resource: { values },
    });

    // Traitement des données pour la deuxième feuille
    const secondaryValues = [[
      req.body.phone,
      req.body.postalAdress,
    ]];

    // Envoi des données à la deuxième feuille de calcul
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: SECONDARY_RANGE,
      valueInputOption: 'RAW',
      resource: { values: secondaryValues },
    });

    await sendTestEmail(valuesPdf);
    
    res.status(200).send('Données enregistrées avec succès et e-mail envoyé !');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données :', error);
    res.status(500).send(`Erreur lors de l'enregistrement des données : ${error.message}`);
  }
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
// Utilisez un seul appel à app.listen
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
