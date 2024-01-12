const nodemailer = require('nodemailer');
const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');
const currentDate = new Date();

const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear();

const formattedDate = `${day}/${month}/${year}`;

async function fillPDFFields(pdfPath, outputPath, formFields) {
  const pdfBytes = await fs.promises.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  for (const fieldName in formFields) {
    const field = form.getField(fieldName);
    if (field) {
      field.setText(formFields[fieldName]);
      field.enableReadOnly();
    }
  }
  
  const modifiedPdfBytes = await pdfDoc.save();
  await fs.promises.writeFile(outputPath, modifiedPdfBytes);

  return outputPath;
}

async function sendTestEmail(valuesPdf) {
  // Remplacez le chemin avec le chemin complet vers votre fichier PDF
  const originalPdfPath = '../final.pdf';
  const modifiedPdfPath = '../votre-simulation.pdf'; 
  const formFields = {
    'nom_prenom': valuesPdf[0][15],
    'date': formattedDate,
    'adresse':valuesPdf[0][0],
    'mail':valuesPdf[0][6],
    'numero_telephone':valuesPdf[0][7],
    'pe3':valuesPdf[0][8],
    'tac3':valuesPdf[0][9],
    'pa3':valuesPdf[0][10],
    'sur3k':valuesPdf[0][11],
    'revente3':valuesPdf[0][12],
    'economie3':valuesPdf[0][13],
    'gain3':valuesPdf[0][14],
    'amort3':valuesPdf[0][30],
    'pe4':valuesPdf[0][16],
    'tac4':valuesPdf[0][17],
    'pa4':valuesPdf[0][18],
    'sur4k':valuesPdf[0][19],
    'revente4':valuesPdf[0][20],
    'economie4':valuesPdf[0][21],
    'gain4':valuesPdf[0][22],
    'amort4':valuesPdf[0][31],
    'pe6':valuesPdf[0][23],
    'tac6':valuesPdf[0][24],
    'pa6':valuesPdf[0][25],
    'sur6k':valuesPdf[0][26],
    'revente6':valuesPdf[0][27],
    'economie6':valuesPdf[0][28],
    'gain6':valuesPdf[0][29],
    'amort6':valuesPdf[0][32],
    'puissance_recommande':valuesPdf[0][33],
  };

  await fillPDFFields(originalPdfPath, modifiedPdfPath, formFields);

  // mail hostinger
  const hostingerSmtp = {
    host: 'smtp.hostinger.com',
    port: 465,
    auth: {
      user: 'contact@adoptelesolaire.fr',
      pass: 'Domedia415Mx*'
    }
  };

  const transporter = nodemailer.createTransport(hostingerSmtp);

  // le contenu du fichier PDF modifié
  const pdfAttachment = {
    filename: 'Votre-simulation.pdf',
    content: fs.createReadStream(modifiedPdfPath),
    encoding: 'base64',
  };

  // Envoi un e-mail de test avec pièce jointe
  let info = await transporter.sendMail({
    from: 'contact@adoptelesolaire.fr',
    to: valuesPdf[0][6],
    subject: 'Votre simulation Adoptelesolaire.fr',
    text: 'Voici le résultat de votre simulation.',
    attachments: [pdfAttachment],
  });

  // Supprime le fichier PDF modifié après l'envoi de l'e-mail si nécessaire
  await fs.promises.unlink(modifiedPdfPath);
}

module.exports = { sendTestEmail };
