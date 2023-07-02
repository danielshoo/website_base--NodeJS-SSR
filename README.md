### Node JS Webserver + SSR React + Typescript

### Summary
This projects serves as a functional base for website development. As the project name suggests, it is ready out-of-the-box 
with server side rendering React support, typescript, and asset bundling.

## Getting Started
There are two domains to the codebase: public and src (frontend and backend respectively). Both have unique attributes to how they 
are bundled. Please read the following sections to understand how to develop for and use each domain. 

### SRC (Backend)
The src code has one entry point as far as the bunlder is concerned: main.js.
This includes the basic express server running on port 3000. Static/asset files are set up to serve from the public directory.

### PUBLIC (Frontend)
The public domain of the server is the location to add any needed font, scss, js, etc files. This directory 
also supports typescript files as entrypoints. For any given entrypoint, the esbuild will generate a corresponding js file
in the same directory as well as a css file comprised of any compiled scss dependencies. For example, public/react-page/Main.ts would result in a
public/react-page/Main.js and public/react-page/Main.css, accessible at the relative path /react-page/Main.js and /react-page/Main.css respectively.

### Cache Busting
There is no cachhe busting in this iteration, but is on the roadmap.

### Bundling sry & asset files
Simply run `npm run build:dev` or `npm run build:prod` depending on the environment. Prod minimizes the output files whereas dev includes source maps.
Watch mode is also available with `npm run build:dev:watch` or `npm run build:prod:watch`.

### Running the server
`npm run start` will initialize the server.

### Running the server in dev mode
`npm run start:dev` will initialize the server with nodemon so that changes are watched for on the server side of the application
and trigger server restarts when changes are detected.