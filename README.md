# node-next-gae-demo
A working example of running next.js on Google AppEngine's Node Standard Environment Early Access Program.

**Important** Node.js on App Engine Standard is in early access (not even Alpha or Beta). It is provided without guarantee. Read below for more information.

# Development
Note: You need [node](https://nodejs.org) installed. I am using v6.10.2

**Installation:** `npm install`

**Local Development:**: `npm run dev` Point browser to localhost:3000

**Production Build:** `npm run build`

**Running Build Locally:** `npm run start` # runs `NODE_ENV=production node server.js` Point browser to localhost:8000

# Deploying to Google App Engine
This will deploy your build to the demo version of the `web_standard` service (as defined in app.yaml) in your *<your_project_id>* project. Learn more about [services](https://cloud.google.com/appengine/docs/standard/python/microservices-on-app-engine) and [versions](https://cloud.google.com/appengine/docs/admin-api/deploying-apps) in GAE).

`gcloud --project your_project_id app deploy app.yaml --version demo`


**Prerequisites**:
* You must have a Google Cloud Account created. [Sign up here](https://cloud.google.com/).
* You must have a project created. Replace *your_project_id* with the id of your project.
* You must have the Google Cloud SDK command line tools installed. [Installation Instructions](https://cloud.google.com/sdk/)
* !!You must have applied and been accepted to the Early Access Program. [Apply here](https://goo.gl/forms/wAYBySsK9sc074hk2).

# Important Notes for GAE
* Unlike other runtimes supported by App Engine, you cannot run your application locally via dev_appserver.py or equivalent. You must use the node runtime installed to your machine.
* As of March 13th, 2018 not all Google Cloud and App Engine features are available yet in the EAP.
* Remember that Node.js on App Engine Standard is in early access (not even Alpha or Beta). It is provided without guarantee. You should not rely on it and only use it for testing purposes. Please do not do scale or load testing.
* Finally, If you need stable Node.js support immediatly, consider using the Flexible Environment which uses dockerized containers on VMs. [More info here](https://cloud.google.com/appengine/docs/flexible/nodejs/)

# Important Notes for Next.js
* As of March 13th, 2018, files and folders are automatically skipped during deploy if they start with a `.`. This means the default .build directory must be renamed using the `distDir` setting in ./next.config
* Builds are run locally and not on GAE machines. As of the current stable release (5.0.0), Next.js has an issue where absolute paths are embedded into your build files. This means once you deploy, GAE cannot resolve the paths and will error. This issue is fixed in the canary branch of next.js

# About the Demo
This demo is a compilation of the [nextgram](https://github.com/now-examples/nextgram), [custom-server-express](https://github.com/zeit/next.js/tree/master/examples/custom-server-express) and [head-elements](https://github.com/zeit/next.js/tree/master/examples/head-elements) examples from Next.js

It pulls data from the Minneapolis Institute of Art's [Elastic Search api](https://github.com/artsmia/collection-elasticsearch).

It demonstrates resoving data dependencies server side (and client side), setting meta content, as well as returing 404 status codes serverside based on the results of the REST data.

The demo was presented as part of a lightning talk about Node/Next/GAE at the [React Minneapolis Meetup](https://www.meetup.com/React-Minneapolis-Meetup/) March 15th, 2018 with permission from the GAE Node.js team. [View slides for the presentation](https://docs.google.com/presentation/d/1pUc8VbT4J5ca4qe2zIbqezO6EhLER6E_e5WgsGitDr0/edit?usp=sharing).


