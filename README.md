# Reports assistant
Cross platform application that helps to track your working hours. 

## Quickstart
 1. git clone 
 2. npm install
 3. npm run postinstall:electron
 1. npm start

|Command|Type|Description|
|--|--|--|
|`npm run build`| Helper | Build the Angular app. |
|`npm run build:dev`| Helper | Build the Angular app. Your built files are in the /dist folder. |
|`npm run build:prod`| Helper | Build the Angular app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:tsc`| Helper | Compile the Electron .ts to js. Your files are in the /dist folder. |
|`npm run electron:serve`| Helper | Get Angular app from localhost:4200, compile Electron and start it with hot-reload. |
|`npm run electron:local`| Stage build | Builds Angular application, compile Electron and start it. |
|`npm run electron:linux`| Prod build | Builds Angular application, compile Electron and creates an app consumable on linux system. |
|`npm run electron:windows`| Prod build | On a Windows OS, builds Angular application, compile Electron and creates an app consumable in windows 32/64 bit systems. |
|`npm run electron:mac`| Prod build |  On a MAC OS, builds Angular application, compile Electron and generates a `.app` file of your application that can be run on Mac. |
|`npm start`| Dev build | Build Angular application, compile Electron and start it with hot-reload. |
|`npm run ng:serve`| Helper | Build Angular application and host it at localhost:4200. |
|`npm run ng:serve:web`| Web build | Build Angular application and host it at localhost:4200 (render-target: electron). |
|`npm run postinstall`| Helper | Postinstall script. |
|`npm run postinstall:web`| Helper | Remove electron dependencies and set 'render-target' to 'web'. |
|`npm run postinstall:electron`| Helper | Add electron dependencies and set 'render-target' to 'electron'. |
|`npm run test`| Test runner | Run tests |
