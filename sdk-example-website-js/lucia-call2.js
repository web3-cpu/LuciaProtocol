import Lucia from './node_modules/luciasdk-test/lucia-sdk.js'

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
document.write(`<h2>Welcome, ${username}!</h2>`);

const lucia = new Lucia({
  clientId: 'test1',
  baseURL: 'http://localhost:3000',
  api_key: '601b8003-74fd9747-d1732031-8f25a7c6-353d8ea7-dbebb6e6-a06d2ec5-40b65968'
})

window.lucia =lucia;
lucia.userInfo(username)
lucia.pageView('welcome')
lucia.trackConversion('user logged in successfully')