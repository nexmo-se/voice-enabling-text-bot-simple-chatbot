# Vonage API - Voice enabling a text-only chatbot - Simple chatbot simulator

You can use this very simple text-only chatbot to simulate a real chatbot for demo purposes.


## About this very simple chatbot

See https://github.com/nexmo-se/voice-enabling-text-bot-application for a **Voice API application** using this very simple chatbot server to connect voice calls and get voice interactions with this text-only chatbot.

You may edit the source code file *very-simple-bot.js* to add additional sample requests/responses in the dictionaries and create new ones for additional languages.

This simple chatbot does not do Natural Language Processing, nor provide other AI capabilities. Its only usage here is to illustrate the ability to voice enable a text chatbot. The caller will need to say exactly a request sentence as listed in the source code.

### Local deployment using ngrok

If you plan to test using `Local deployment with ngrok` (Internet tunneling service) on your own computer for both this simple chatbot sample server and the Voice API application, follow the instructions [here](https://github.com/nexmo-se/voice-enabling-text-bot-application#local-deployment-using-ngrok) (under **Local deployment using ngrok**) first.

Then to run an instance of this simple chatbot locally, you'll need an up-to-date version of Node.js (we tested with version 16.5.1).

Download this repository code to a local folder, then go to that folder.

Install dependencies once:
```bash
npm install
```

Launch the applicatiom:
```bash
node very-simple-bot
```

### Hosted deployment on Heroku

If you would like to deploy this simple chatbot on Heroku hosted environment, then you must first have deployed your application locally, as explained in previous section, and verified it is working.

Install [git](https://git-scm.com/downloads).

Install [Heroku command line](https://devcenter.heroku.com/categories/command-line) and login to your Heroku account.

If you do not yet have a local git repository, create one:</br>

go to this simple bot application folder

```bash
git init
git add .
git commit -am "initial"
```

Create this application on Heroku from the command line using the Heroku CLI:

*Note: In following command, replace "mysimplebotname" with a unique name on the whole Heroku platform.*

```bash
heroku create mysimplebotname
```

Deploy the application:

```bash
git push heroku master
```

In this case, when setting up the Voice API application, the parameter **`BOT_SERVER`** argument will be
*mysimplebotname.herokuapp.com* (replace mysimplebotname with its actual value, there is no leading https://, no trailing /)


### Testing voice integration with a sample text-only simple chatbot 

To simulate the voice interaction with this very simple sample text-only chatbot, you may run the program downloaded from this repository 
```bash
node very-simple-bot.js
```
with the client application (from https://github.com/nexmo-se/voice-enabling-text-bot-application)
```bash 
node voice-on-text-bot-app-with-simple-bot.js
```

### Voice enable your text-only chatbot 

For voice enabling and integrating with your own text chatbot,

you do not need any code from this repository, you will use and update the source code (from https://github.com/nexmo-se/voice-enabling-text-bot-application):</br>

*voice-on-text-bot-app-generic.js*


