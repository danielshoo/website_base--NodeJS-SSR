### Node JS Webserver + SSR React + TypeScript

### Summary
This projects serves as a functional base for website development. As the project name suggests, it is ready out-of-the-box 
with server side rendering React support, TypeScript, and asset bundling.

### Getting Started
To get the server up & running, run the below commands in order, then navigate to http://localhost:3000 in your browser.
```
npm ci
npm run build:dev
npm run start
```

### Making Changes

You can make changes by adding/editing files within the src/ and frontend/ directories or by editing the server code in Main.ts. 

### Src
The src/ code can be thought of as a library directory oriented for backend/server-side operations with any added modules available to the frontend build (starting from the project root 'src/dir1/file.tsx'). 
This means that with proper separation of backend logic into container components, SSR React is supported by including any src/ component also in a corresponding frontend asset bundle. 

### Frontend
The fronted directory is the location to add any assets that would need to be compiled. That is files types such as scss, js, or ts files. From this directory, those 
files will be compiled, minimized, and output into the assets directory with a matching subdirectory structure. 

### Cache Busting
There is no cache busting in this iteration, but is on the roadmap.

### Bundling Src & Public Assets
Simply run `npm run build:dev` or `npm run build:prod` depending on the environment. Prod minimizes the output files whereas dev includes source maps.
Watch mode is also available with `npm run build:dev:watch` or `npm run build:prod:watch`.

### Running the Server
`npm run start` will initialize the server.

### Running the Server in Dev Mode
`npm run start:dev` will initialize the server with nodemon so that changes are watched for on the server side of the application
and trigger server restarts when changes are detected.
