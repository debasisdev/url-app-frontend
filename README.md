# URL Shortener Application (ReactJS + ES6)
## Getting Started

**Prerequisites:**
* **[Node.js](https://nodejs.org/en/)** (v10.5 or later recommended)
* **[Docker](https://docs.docker.com/release-notes/docker-ce/)** (v17.09.0-ce or later recommended)
* **[Internet connectivity](https://dictionary.cambridge.org/dictionary/english/internet)**

In most cases bumping the `react-scripts` version in `package.json` and running `npm install` in this folder should be enough.

<hr/>

### Docker Deploy
Build the image with docker-compose and start the container with the following one-line command. It's advisable not to use the cached images in some scenarios.

```
docker-compose down && docker-compose build --no-cache && docker-compose up --force-recreate --remove-orphans
```

When the server is ready, try it out: [URL Shortener App](http://localhost:3000/) 🚀

##### (OPTIONAL) To stop and kill all containers along with removing all images
```
docker kill $(docker ps -q) && docker rm $(docker ps -a -q) && docker rmi $(docker images -q)
```
<hr/>

## Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## Maintainer
[Debasis Kar](mailto:debasis.babun@gmail.com)
