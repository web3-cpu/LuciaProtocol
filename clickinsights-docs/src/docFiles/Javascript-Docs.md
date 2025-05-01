# Installation and initialization for a browser environment using a Javascript SDK  

## Install SDK

```bash
npm i luciasdk-t1
yarn add luciasdk-t1
```

## Initialization via script


```bash
<script type = "module">
import Lucia from '../../node_modules/luciasdk-t1/lucia-sdk.js';


    window.lucia = new Lucia({
      clientId: '<username-registered-with-lucia>',
      baseURL: '<url-provided-by-Lucia>',
      api_key: '<api-key-provided>'
    })


    lucia.userInfo('')
    lucia.pageView('home')
</script>
```

## Initialization via library

#### The SDK instance needs to be added to a Javascript file. 


```bash

import Lucia from '../../node_modules/luciasdk-t1/lucia-sdk.js';

const lucia = new Lucia({
		  clientId: '<username-registered-with-lucia>',
      baseURL: '<url-provided-by-Lucia>',
      api_key: '<api-key-provided>'
});

export default lucia;

```
*lucia.js*


<p>&nbsp;</p>

#### The functions associated with lucia can be used freely on any script for a browser web page:



```bash

import lucia from '../utils/lucia.js';

onClick={() => {lucia.buttonClick('submit');}}>

lucia.pageView('webpage');

lucia.trackConversion(event_tag, amount, event_details);

lucia.userInfo(user, userInfo);


```
*webpage.js*

<p>&nbsp;</p>


**Page view** - track users who access webpages on your website. Includes one parameter:

*webpage*: string

<p>&nbsp;</p>

**Track conversion** - track conversions like form submissions, purchases, inquiries, etc. Includes three parameters:

*event_tag*: string

*amount*: Double

*event_details*: JSON (example - {info: , details:, })

<p>&nbsp;</p>

**User information** - provide user information that allows Lucia to track the behavior of that particular user on your website. Includes two parameters:

*user*: string (username, email, any other unique value)

*userInfo*: JSON (example - {name: , address: , })

<p>&nbsp;</p>

**Button Click -** track user interactions on your website. Includes one parameter:

'*submit*': string