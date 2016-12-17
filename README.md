# Mydemo

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.17.

## Install demo application
Checkout this project or download as ZIP file. Go to the project folder in your local machine where you checked out this project. 
Run `npm install` to install all necessary NPM packages which required by this project. Then 'node_modules' folder will be created in your project.

## Development server
Run `npm start` for a develepoment server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development REST service
Run `ts-node mydemo-server.ts` for REST API service running as NodeJS HTTP server on your localhost. 
Proxy configuration written in `proxy.conf.json` file, and is used in the `package.json` at the scripts 'start' section.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
