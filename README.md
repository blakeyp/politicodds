## Politicodds

A simple web app which presents the latest betting odds data and percent likelihood for a selection of political events as fetched from the Betfair Exchange.

`server` directory houses the backend code to serve a JSON REST API for the frontend app to consume.
Calls the [Betfair Exchange API](https://developer.betfair.com/en/exchange-api/) to retrieve and process odds data.

`client` directory houses the frontend code to serve a single-page web app which calls the backend API on the fly.

#### Tech stack
- Backend: Node.js/Express with TypeScript
- Frontend: React

#### Run locally
To run the app locally, first in the `server` directory create a `.env` file based off the `.env.template` - you'll need a Betfair account registered with an application key for the Betfair Exchange API.

After an npm install, run `npm run build && npm start` to compile and run the server. Then move over to the `client` directory, install again and fire up the frontend via `npm start`.

The server runs on localhost port 4000 while the frontend is hosted on port 3000 (with API calls proxied via 4000).
