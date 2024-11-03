# Description
The project includes the view logic. Initially, since it’s a single page with just one input box and a search-results view, I built it using plain JavaScript. Later, I realized that despite its simplicity, maintaining proper code standards would require reimplementing many features that are built into a view framework. So, I switched to React—mainly because I’m more familiar with it. While it may be a bit overkill, I think I learned a lot from the experience.

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

It runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner. Currently, the interactive mode is disabled.\
Also, if you want to run a specific test file, mention the path after `yarn test`.\
Example: `yarn test src/components/search-box/SearchBox.test.tsx`.

### `yarn ci`
This command will build and lint the project, and run the entire unit test suite.

### `yarn build`

Builds the app for production to the `build` folder.

For a list of all available commands, please refer to the [package.json](https://github.com/khshourov/dictionary-api/blob/main/views/interactivity/package.json) file.
