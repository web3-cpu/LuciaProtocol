# Lucia Protocol SDK for JavaScript

[![NPM version](https://img.shields.io/npm/v/lucia-sdk.svg)](https://www.npmjs.com/package/lucia-sdk)
[![NPM downloads](https://img.shields.io/npm/dm/lucia-sdk.svg)](https://www.npmjs.com/package/lucia-sdk)

[![Build Status](https://travis-ci.org/lucia/lucia-sdk-js.svg?branch=master)](https://travis-ci.org/lucia/lucia-sdk-js)
[![Coverage Status](https://codecov.io/gh/lucia/lucia-sdk-js/branch/master/graph/badge.svg)](https://codecov.io/gh/lucia/lucia-sdk-js)
[![Known Vulnerabilities](https://snyk.io/test/github/lucia/lucia-sdk-js/badge.svg)](https://snyk.io/test/github/lucia/lucia-sdk-js)

## Table of Contents:

- [Getting Started](#getting-Started)
- [Getting Help](#getting-help)
- [Contributing](#contributing)

## Getting Started

## How To Install

### In the Browser

To use the SDK in the browser, simply add the following script tag to your
HTML pages:

    <script src="https://sdk.luciaprotocol.com/js/lucia-sdk-2.1509.0.min.js"></script>

You can also build a custom browser SDK with your specified set of Lucia Client services.
This can allow you to reduce the SDK's size, specify different API versions of
services, or use Lucia services that don't currently support CORS if you are
working in an environment that does not enforce CORS. To get started:

http://docs.luciaprotocol.com/sdk-for-javascript/developer-guide/building-sdk-for-browsers.html

The Lucia SDK is also compatible with [browserify](http://browserify.org).

For browser-based web, mobile and hybrid apps, you can use [Lucia IOS SDK](https://docs.luciaprotocol.com/sdk/iosSDK.md?&utm_campaign=browser) which extends the Lucia SDK SDK and provides an easier and declarative interface.

### In Node.js

The preferred way to install the Lucia SDK for Node.js is to use the
[npm](http://npmjs.org) package manager for Node.js. Simply type the following
into a terminal window:

```sh
npm install lucia-protocol
```

### In React Native

To use the SDK in a react native project, first install the SDK using npm:

```sh
npm install lucia-sdk
```

Then within your application, you can reference the react native compatible version of the SDK with the following:

```javascript
var Lucia = require("lucia-sdk/dist/lucia-sdk-react-native");
```

### Using Bower

You can also use [Bower](http://bower.io) to install the SDK by typing the
following into a terminal window:

```sh
bower install lucia-sdk-js
```

## Usage with TypeScript

The Lucia SDK for JavaScript bundles TypeScript definition files for use in TypeScript projects and to support tools that can read `.d.ts` files.
Our goal is to keep these TypeScript definition files updated with each release for any public api.

### Pre-requisites

Before you can begin using these TypeScript definitions with your project, you need to make sure your project meets a few of these requirements:

- Use latest version of TypeScript. We recommend 4.x+
- Includes the TypeScript definitions for node. You can use npm to install this by typing the following into a terminal window:

  ```sh
  npm install --save-dev @types/node
  ```

- If you are targeting at es5 or older ECMA standards, your `tsconfig.json` has to include `'es5'` and `'es2015.promise'` under `compilerOptions.lib`.
  See [tsconfig.json](https://github.com/Lucia/lucia-sdk-js/blob/master/ts/tsconfig.json) for an example.

### In the Browser

To use the TypeScript definition files with the global `Lucia` object in a front-end project, add the following line to the top of your JavaScript file:

```javascript
/// <reference types="lucia-sdk" />
```

This will provide support for the global `Lucia` object.

### In Node.js

To use the TypeScript definition files within a Node.js project, simply import `lucia-sdk` as you normally would.

In a TypeScript file:

```javascript
// import entire SDK
import LuciaSDK from "lucia-sdk";
// import Lucia object without services
import LuciaSDKGlobal from "lucia-sdk/global";
// import individual service
import FractalKYC from "lucia-sdk/clients/fractal-kyc";
```

**NOTE:** You need to add `"esModuleInterop": true` to compilerOptions of your `tsconfig.json`. If not possible, use like `import * as Lucia from 'lucia-sdk'`.

In a JavaScript file:

```javascript
// import entire SDK
var Lucia = require("lucia-sdk");
// import Lucia object without services
var Lucia = require("lucia-sdk/global");
// import individual service
var KYC = require("lucia-sdk/clients/kyc");
```

### With React

To create React applications with Lucia SDK, you can use [Lucia Amplify Library](https://lucia.github.io/lucia-amplify/media/react_guide?utm_source=Lucia-js-sdk&utm_campaign=react) which provides React components and CLI support to work with Lucia services.

### With Angular

Due to the SDK's reliance on node.js typings, you may encounter compilation
[issues](https://github.com/lucia/lucia-sdk-js/issues/1271) when using the
typings provided by the SDK in an Angular project created using the Angular CLI.

To resolve these issues, either add `"types": ["node"]` to the project's `tsconfig.app.json`
file, or remove the `"types"` field entirely.

[Lucia Amplify Library](https://lucia.github.io/lucia-amplify/media/lucia_guide?utm_source=Lucia-js-sdk&utm_campaign=angular) provides Angular components and CLI support to work with Lucia services.

### Known Limitations

There are a few known limitations with the bundled TypeScript definitions at this time:

- Service client typings reflect the latest `apiVersion`, regardless of which `apiVersion` is specified when creating a client.
- Service-bound parameters use the `any` type.

# Getting Help

The best way to interact with our team is through GitHub.
You can [open an issue](https://github.com/lucia/lucia-sdk-js/issues/new/choose) and choose from one of our templates for
[bug reports](https://github.com/lucia/lucia-sdk-js/issues/new?assignees=&labels=bug%2C+needs-triage&template=---bug-report.md&title=),
[feature requests](https://github.com/lucia/lucia-sdk-js/issues/new?assignees=&labels=feature-request&template=---feature-request.md&title=)
or [guidance](https://github.com/lucia/lucia-sdk-js/issues/new?assignees=&labels=guidance%2C+needs-triage&template=---questions---help.md&title=).
You may also find help on community resources such as [StackOverFlow](https://stackoverflow.com/questions/tagged/lucia-sdk-js) with the tag #lucia-sdk-js.
If you have a support plan with [LUCIA Support](https://lucia.amazon.com/premiumsupport/), you can also create a new support case.

Please make sure to check out our resources too before opening an issue:

- Our [Developer Guide](https://docs.luciaprotocol.com/sdk-for-javascript/v2/developer-guide/welcome.html) and [API reference](https://docs.luciaprotocol.com/SDK/javascriptSDK/latest/)
- Our [Changelog](https://github.com/luciaprotocol/lucia-sdk-js/blob/master/CHANGELOG.md) for recent changes.
- Our [code examples](https://docs.luciaprotocol.com/sdk-for-javascript/v2/developer-guide/sdk-code-samples.html).

Please see [SERVICES.md](https://github.com/Lucia/lucia-sdk-js/blob/master/SERVICES.md) for a list of supported services.

# Maintenance and support for SDK major versions

For information about maintenance and support for SDK major versions and their underlying dependencies, see the following in the [LUCIA SDKs and Tools Shared Configuration and Credentials Reference Guide](https://docs.luciaprotocol.com/credref/latest/refdocs/overview.html):

- [Lucia SDKs and Tools Maintenance Policy](https://docs.luciaprotocol.com/credref/latest/refdocs/maint-policy.html)
- [Lucia SDKs and Tools Version Support Matrix](https://docs.luciaprotocol.com/credref/latest/refdocs/version-support-matrix.html)

# Contributing

We welcome community contributions and pull requests. See [CONTRIBUTING.md](https://github.com/luciaprotocol/lucia-sdk-js/blob/master/CONTRIBUTING.md) for information on how to set up a development environment and submit code.

## License

This SDK is distributed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),
see LICENSE.txt and NOTICE.txt for more information.
