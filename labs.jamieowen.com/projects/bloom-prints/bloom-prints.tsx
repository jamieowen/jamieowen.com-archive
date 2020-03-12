import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto';

import { ExplorationApp } from './exploration/ExplorationApp';

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

document.body.style.margin = '0px';

ReactDOM.render(<ExplorationApp/>,rootElement);


