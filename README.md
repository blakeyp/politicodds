## Politicodds

A simple web app which presents the latest betting odds data and percent likelihood for a selection of political events as fetched from the Betfair Exchange.

`server` directory houses the backend code to serve a JSON REST API for the frontend app to consume.
Calls the Betfair Exchange API to retrieve and process odds data. Interfaces with a backend DB for data storage (TBC).

`client` directory houses the frontend code to serve a single-page web app which calls the backend API on the fly.

#### Tech stack
- Backend: Node.js/Express with TypeScript
- Frontend: Angular (TBC)
