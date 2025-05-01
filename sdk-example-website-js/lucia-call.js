//import {Lucia} from './bundle.js'
//const Lucia = require('./bundle-b2.js')

// import ("./bundle-b2.js").then((Lucia)=>{

//     const lucia = new Lucia({
//         clientId: 'ak',
//         baseURL: 'http://localhost:3000',
//         api_key: '2fae3576-7c822d0c-32a344ed-ad7f08b5-4ea1c046-3f8500ea-b30fa583-bd98e35f'
//     });
    
//     lucia.authenticate().then(status => {
//         console.log('status', status);
//         console.log(lucia);
//     }).catch(error => {
//         console.error('Error:', error);
//     });

// }
// )
const lucia = new Lucia({
    clientId: 'ak',
    baseURL: 'http://localhost:3000',
    api_key: '2fae3576-7c822d0c-32a344ed-ad7f08b5-4ea1c046-3f8500ea-b30fa583-bd98e35f'
});

lucia.authenticate().then(status => {
    console.log('status', status);
    console.log(lucia);
}).catch(error => {
    console.error('Error:', error);
});