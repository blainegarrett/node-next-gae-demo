# node-next-gae-demo
A simple working example of running [Next.js](https://nextjs.org/) on Google App Engine's [Node Standard Environment](https://cloud.google.com/appengine/docs/standard/nodejs/)

**Update**:
* v1.0.0 - 2021-11-19
  * Removed server.js dependency
  * Added support for passing PORT to npm command for dev server.
  * Updating app.yaml for node16 runtime
  * Upgrading axios to latest, next.js to 12, react to 17
  * Updating ci build scripts and adding documentation
  * Converting eslint directives to leverage next.js's builtins

* v0.3.4 - 2020-07-18
  * Security upgrades for various packages
* v0.3.3 - 2019-11-02
  * Adding Google App Engine Build and Deploy Support ala [this blog post](https://www.blainegarrett.com/2019/10/29/using-google-cloud-build-to-create-a-production-build-and-deploy-to-appengine-standard)
* v0.3.2 - 2019-10-27
  * Adding Google Cloud Build and Google Container Registry Support ala [this blog post](https://www.blainegarrett.com/2019/10/27/building-and-pushing-your-dockerized-node-app-in-google-cloud-store)
* v0.3.1 - 2019-10-27
  * Adding docker support ala [this blog post](https://www.blainegarrett.com/2019/10/26/dockerizing-a-node-app-for-deployment)
  * Adding scripts to package.yaml to support building docker images
* v0.2.2 - 2019-10-25
  * Upgrading various packages
* v0.2.1 - 2019-10-12
  * Upgraded several packages
* v0.2.0 - 2019-07-21
  * Upgraded to [Next.js 9](https://nextjs.org/blog/next-9)
  * Switched routing to Next.js 9's [filebased routing](https://github.com/zeit/next.js#dynamic-routing) and removed routes from server.js
  * Retooled `start` script for better deployed ngnix performance
  * Introduced `start-local` for separating local run from deployed runs
  * Upgraded various packages

* v0.1.1 - 2019-07-16:
  * Upgraded axios, js-yaml, and lodash packages for security

* v0.1.1 - 2019-03-30:
  * Upgraded eslint to avoid js-yaml security vulnerability
  * Removed isopmorphic-unfetch in lieu of axios
  * Added gzip compression
  * Minor prep for PWA

* v0.1.0 - 2019-03-09:
  * Upgraded to Next.js 8.0.3
  * Upgraded react and react dom to 16.8.3 (aka "the one with hooks")
  * Various other package updates

* v0.0.4 - 2018-12-29:
  * Updated to use nodejs10 runtime on App Engine
  * Upgraded to Next.js 7.0.2

# Live Demo
**View live demo at [http://node-next-gae-demo.blaine-garrett.appspot.com/](http://node-next-gae-demo.blaine-garrett.appspot.com/)**

* Be sure to also check out this demo [with material-ui support](https://github.com/blainegarrett/material-node-next-gae-demo).


# Development
Note: You need [node](https://nodejs.org) installed. I am using v16.3.0

### Installation:
To install all required dependencies, simply run:
`npm install`

### Local Development:
`npm run dev`

If you would like to run on a specific port (3001 for example), run:
`PORT=3001 npm run dev`

### Production Build:
`npm run build` (Note: It is a good idea to remove your ./build dir before build/deploy to remove unused build files)

**Running Production Build Locally:** `npm run start-local` Point browser to localhost:8080


# Deploying to Google App Engine
This will deploy your build to a version of the `node-next-gae-demo` service (as defined in app.yaml) in your *<your_project_id>* project. Learn more about [services](https://cloud.google.com/appengine/docs/standard/python/microservices-on-app-engine) and [versions](https://cloud.google.com/appengine/docs/admin-api/deploying-apps) in GAE).

`gcloud --project your_project_id app deploy app.yaml --version version_name --verbosity=debug`

eg: `gcloud --project blaine-garrett app deploy app.yaml --version main --verbosity=debug`

<br />

# Local Docker Setup
 You can build and run a docker image locally to test Docker setup locally. This helps debug CI issues and illustrates running the app in a container. 

Configurations are included to build docker containers using Node 16 base image.

## Development Container 
 - NOTE: You should not deploy this image as next is running in development mode.
 - NOTE: Internal docker networking is set to run on port 8000 as defined in the `./ci/build.dev.Dockerfile`
<br /><br />

To build the local docker image in dev mode, run:
```
npm run docker:build:dev
``` 

To run the newly created image on port 3001, run:
```
docker run -p 3001:8000 gae-node-next-demo:dev
```
Open `localhost:3001` in your browser to see the image running.

Tip: To list all running contianers
```
docker ps
```

Tip: To kill a running container
```
docker kill <CONTAINER_ID>
```
<br /><br />

## Production Container
This will crete and run a production docker image

 - NOTE: Internal docker networking is set to run on port 8000 as defined in the `./ci/build.dev.Dockerfile`
<br /><br />

To build the local docker image in production mode, run:
```
npm run docker:build:production
``` 
To run the newly created image on port 8080, run:
```
docker run -p 8080:8000 gae-node-next-demo:prod
```
Open `localhost:8080` in your browser to see the image running.

- Note: This command is aliased for convenience as `npm run docker:run:production`. To run on a different local port, update the command or run the one above.

<br /><br />

# Using Google Cloud Build
Less tested build configurations are in place to build and deploy tar files (GAE Standard) and Docker Images (GAE Flexible and Cloud Run) via Google Cloud Build. Experiment at your own risk and modify as per your needs.

Build a docker container and store in Google Container Registry
```
npm run cloudbuild:production
```

For tar file support see the `build.gaestandard.cloudbuild.yaml` and `deploy.gaestandard.cloudbuild.yaml`




## Prerequisites:
* You must have a Google Cloud Account created. [Sign up here](https://cloud.google.com/).
* You must have a project created. Replace *your_project_id* with the id of your project.
* You must have the Google Cloud SDK command line tools installed. [Installation Instructions](https://cloud.google.com/sdk/)

# Important Notes for GAE
* Unlike other runtimes supported by App Engine (Python 2.7, etc), you cannot run your application locally via dev_appserver.py or equivalent. You must use the node runtime installed to your machine.
* As of Dec 29th, 2018 not all Google Cloud and App Engine standard features are available yet in the Beta.

# Important Notes for Next.js
* As of March 13th, 2018, files and folders are automatically skipped during deploy if they start with a `.`. This means the default .build directory must be renamed using the `distDir` setting in ./next.config


# About the Demo
This demo is a compilation of the [nextgram](https://github.com/now-examples/nextgram), [custom-server-express](https://github.com/zeit/next.js/tree/master/examples/custom-server-express) and [head-elements](https://github.com/zeit/next.js/tree/master/examples/head-elements) examples from Next.js

It pulls data from the Minneapolis Institute of Art's [Elastic Search api](https://github.com/artsmia/collection-elasticsearch).

It demonstrates resolving data dependencies server side (and client side), setting meta content, as well as returning 404 status codes server side based on the results of the REST data.

The demo was presented as part of a lightning talk about Node/Next/GAE at the [React Minneapolis Meetup](https://www.meetup.com/React-Minneapolis-Meetup/) March 15th, 2018 with permission from the GAE Node.js team while Node support was still in EAP. [View slides for the presentation](https://docs.google.com/presentation/d/1pUc8VbT4J5ca4qe2zIbqezO6EhLER6E_e5WgsGitDr0/edit?usp=sharing).
