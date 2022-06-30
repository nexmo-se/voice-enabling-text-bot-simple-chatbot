'use strict'

//-------------

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const expressWs = require('express-ws')(app);
const { Readable } = require('stream');
const moment = require('moment');

// -- HTTP client --

const webHookRequest = require('request');

const reqHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

//--------------------
app.use(bodyParser.json());

//-------

let router = express.Router();
router.get('/', express.static('app'));
app.use('/app',router);

//--------- VERY SIMPLE Bot Knowledge Base - Just to simulate the operation of a real text bot -----

// French language - Very simple Bot KB

const defaultResponseFr = "Je n'ai pas compris votre requête, veuillez reformuler."

let botKbFr = {};

function addToBotKbFr (info) {
  botKbFr[info[0]] = {};
  botKbFr[info[0]]["request"] = info[1];
  botKbFr[info[0]]["response"] = info[2];
}

const fr01 = [
"1",
"Bonjour",
"Comment puis-je vous aider ?"
];
addToBotKbFr (fr01);

const fr02 = [
"2",
"Quel temps fait-il aujourd'hui",
"Il fait beau aujourd'hui !"
];
addToBotKbFr (fr02);

const fr03 = [
"3",
"Quel temps fera-t-il demain",
"Il va pleuvoir demain."
];
addToBotKbFr (fr03);

const fr04 = [
"4",
"Quand est-ce que je vais recevoir",
"Votre commande partira demain matin."
];
addToBotKbFr (fr04);

const fr05 = [
"5",
"Au revoir",
"Nous vous remerçions de nous avoir contacté. A bientôt !"
];
addToBotKbFr (fr05);

console.log ("botKbFr dictionary:", botKbFr); 

//----

// English language - Very simple Bot KB

const defaultResponseEn = "I did not understand what you've said. Please ask differently."

let botKbEn = {};

function addToBotKbEn (info) {
  botKbEn[info[0]] = {};
  botKbEn[info[0]]["request"] = info[1];
  botKbEn[info[0]]["response"] = info[2];
}

const en01 = [
"1",
"Hello",
"How may I help you?"
];
addToBotKbEn (en01);

const en02 = [
"2",
"How is the weather today",
"It is a sunny day today!"
];
addToBotKbEn (en02);

const en03 = [
"3",
"What will the weather be like tomorrow",
"It will be raining tomorrow."
];
addToBotKbEn (en03);

const en04 = [
"4",
"When will I receive my package",
"Your package will arrive the day after tomorrow."
];
addToBotKbEn (en04);

const en05 = [
"5",
"Goodbye",
"We thank you for contacting us. See you soon!"
];
addToBotKbEn (en05);

console.log ("botKbEn dictionary:", botKbEn); 

//==========================================================

function reqCallback(error, response, body) {
    if (body != "Ok") {  
      console.log("Webhook call status to VAPI application:", body);
    };  
}

//-----------------------------------

//-- Very simple Bot 
app.post('/bot', async (req, res) => {

  res.status(200).send('Ok');

  const textRequest = req.body.textRequest;
  const language = req.body.language;  // simple bot language
  const webhookUrl = req.body.webhookUrl;
  const id = req.body.id;

  console.log('>>> textRequest:', textRequest);

  let kbDictionary;
  let response;

  switch(language) {
    
    case 'fr':
      kbDictionary = botKbFr;
      response = defaultResponseFr;
      break;
    
    case 'en':
      kbDictionary = botKbEn;
      response = defaultResponseEn;
      break;

    default:
      console.log("Language not supported by simple text bot");  

  };

  for (const [key, value] of Object.entries(kbDictionary)) {

    // console.log("request:", value["request"]);
    // console.log("response:", value["response"]);

    const kbRequestLength = value["request"].length;

    if (textRequest.substr(0, kbRequestLength).toLowerCase() == value["request"].toLowerCase()) {
      response = value["response"];  
    }  

  } 

  console.log("response:", response);

  const botResponse = {
    'id': id,  // must return received metadata in reply
    'botTextReponse': response,
    'language': language
  };

  const reqOptions = {
    url: webhookUrl,
    method: 'POST',
    headers: reqHeaders,
    body: JSON.stringify(botResponse)
  };

  webHookRequest(reqOptions, reqCallback);

});  


//==================================================

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Very simple chatbot server code running on port ${port}.`));

//------------
