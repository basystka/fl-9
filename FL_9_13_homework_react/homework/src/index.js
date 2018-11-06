import React from 'react';
import { render } from 'react-dom';
import { Play } from './play';
import './scss/index.scss';

const rootNode = document.querySelector('#root');
function App() {
  return (
    <React.Fragment>
      <Play />
    </React.Fragment>
  );
}

render(<App />, rootNode);
