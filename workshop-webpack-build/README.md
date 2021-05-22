# 03-enter-plugins

## Usage

- npm install

## Available tasks

- `npm run build-local`: will create the build inside `/dist` folder, featuring local runtime constants

- `npm run build-production`: will create the build inside `/dist` folder, featuring production runtime constants

- `npm start`: serves files from the `/dist` folder (http://localhost:3100).

# Observations

- index.html copied from /public to /disableHostCheck
- added <script defer src="./bundle.js"></script> inside head
- favicon link added to head
- file copied from /constants/runtime to configuration.js
- file is named according to ENV.NPC_ENV parameter
- parameter window.ENV available in console


## Experiments in webpack.config.js

- shift mode to 'production' (different file picked from /constants/runtime)

- enable DefinePlugin in webpack.config.js and access new variable in index.js without polluting the global object
