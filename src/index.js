import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: orange,
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});


const MyApp = DragDropContext(HTML5Backend)(App);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <MyApp />
  </MuiThemeProvider>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
