# fk-react-no-cra

Founders Kit react project without create react app

## Install

```zsh
npm install
```

## Start dev server

```zsh
npm start
```

## Build for production

```zsh
npm run build
```

### Action items

- [] Add proxy with http-proxy-middleware [guide](https://medium.com/bb-tutorials-and-thoughts/react-how-to-proxy-to-backend-server-5588a9e0347)
- [] Follow guide on business logic but instead of mongo use pg [link](https://faizanv.medium.com/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0)



## Took out

App.jsx


```js
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';

import './css/main.css'
import logo from "./images/logo.svg";

export default () => {
    return 
    <div>
      <h1> Hello World</h1>
      <NavBar />
    </div>
}

```

Navbar.jsx

```js
import React from 'react';

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li><a className="logo" href="#">Logo</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  );
}

export default Navbar;
```