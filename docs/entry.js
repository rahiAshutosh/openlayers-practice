
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/App.js';
reactComponents['App'] = Component0;

import Component1 from '../src/Toolbar/Draw.jsx';
reactComponents['DrawActions'] = Component1;

import Component2 from '../src/Layers/DrawLayer.jsx';
reactComponents['DrawLayer'] = Component2;

import Component3 from '../src/Map/Explore.jsx';
reactComponents['Explore'] = Component3;

import Component4 from '../src/Toolbar/Export.jsx';
reactComponents['Export'] = Component4;

import Component5 from '../src/Toolbar/Features.jsx';
reactComponents['Features'] = Component5;

import Component6 from '../src/Toolbar/Import.jsx';
reactComponents['Import'] = Component6;

import Component7 from '../src/Layers/Layers.jsx';
reactComponents['Layers'] = Component7;

import Component8 from '../src/Toolbar/Layers.jsx';
reactComponents['Layers'] = Component8;

import Component9 from '../src/LayerSwitch/index.jsx';
reactComponents['LayerSwitch'] = Component9;

import Component10 from '../src/Map/Map.jsx';
reactComponents['Map'] = Component10;

import Component11 from '../src/Layers/TileLayer.jsx';
reactComponents['TileLayer'] = Component11;

import Component12 from '../src/Toolbar/index.jsx';
reactComponents['Toolbar'] = Component12;

import Component13 from '../src/Toolbar/Zoom.jsx';
reactComponents['Zoom'] = Component13;