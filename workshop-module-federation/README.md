# 05-basic-module-federation - SHELL

## Usage

- npm install

## Available tasks

- `npm run build-local`: will create the build inside `/dist` folder, featuring local runtime constants

- `npm run build-production`: will create the build inside `/dist` folder, featuring production runtime constants

- `npm start`: serves files from the `/dist` folder (http://localhost:3200).

# Observations

- observe network tab in developer tools:
- http://localhost:3200/bundle.js <-- jQuery is inside here
- http://localhost:3100/remoteEntry.js
- http://localhost:3100/src_imported_js.bundle.js
