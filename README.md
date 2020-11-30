This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Available Scripts

In the project directory, you can run:

## `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `yarn run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

# Structure of the project

## assets

Images used for specific components or containers.<br />
Includes only images that are used in common for reusability reasons (containers, components).

## components

Set of different UI elements that used across the project (each component folder contain their asset folder and implementation in `index.js` file)

## config

Folder that holds setups and configurations for
* making http requests (with axios.js)
* base urls and server urls for both development and production mode

## data

Contains all used data divided into folders for specific country. For example to use the data dedicated to Nigeria (local government areas, states) it is more useful to import data from one source and not overload used state manager.

## hoc

Higher-Order Components acting as wrappers arount components with variety of different functionalities (e.g. ProtectedRoutes, ErrorBoundary).

## redux 

State manager that holds the whole data as one state-object. Once the state changes, the react has a reason to update the components where the data has been changed. Convenient to debug with Redux Dev Tools.

## router

Holds all routes to all components on the front-end.<br />
For the users that are not authorized, the app gives access to only some specific routes (to complete the registation or login flow). For the authenticated and authorized users the app serves another routes for usage. `openRoutes.js` contains routes which are allowed to use for both user statuses in the app.

## styles

Global styles containing the color pallete, user agent styles reset, font declaration, screen sizes and variables that are used across the app.

## utils

In most cases, folder that contains javascript functions that do one simple specific thing, such as data transfromation or validation that can be reused in components.

## views

App screens folder, that contain all screens (React functional components).

Demo2