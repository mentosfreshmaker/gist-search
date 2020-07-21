# GIT Gist search

This is a simple search page to get the list of git gists by username
You will need nodejs to run the code.
To install dependecies, use `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Assumptions and Future enhancement

* **File structure**
    If there is a potential of expansion to the application, the file structure has to be different. Such as, grouping the shared components within one folder, separate style files, and redux or hooks can be added.

* **Responsive design**
    Support mobile view by using the bootstrap grid system. Added + more indications to support responsive design.

* **API calls**
    There is a limitation of API calls per hour for public users. The search feature will be limited to the users. I added error handling so that users will be aware of the error.

* **Paginations**
    Lots of users have uploaded multiple gists, adding paginations will help users to reduce scrolling. Get Forks has to be called per gist and due to API calls limitation, had to set the default item per page count to be 5.

* **Duplication of types**
    To support the requirement, types have to be shown in badges, however, the type can be duplicated within one gist file. Added filter to show unique types

* **Intuitive design**
    Suggestion of the possible input, provided simple and clean UI

* **Possible future enhancement**
    * Error handling
    * Search within result
    * Sort feature
    * Server-side pagination
    * Provide options to select item per page
    * Infinite scroll
    * Comments and stars can be added in the gist details view
    * Save search history so that returning users can easily access the latest search
    * Show file preview within the system - Currently, open a new tab. Dark mode