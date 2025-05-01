import Lucia from './node_modules/luciasdk-test/lucia-sdk.js'


window.lucia = new Lucia({
  clientId: 'test1',
  baseURL: 'http://localhost:3000',
  api_key: '601b8003-74fd9747-d1732031-8f25a7c6-353d8ea7-dbebb6e6-a06d2ec5-40b65968'
})

window.lucia.authenticate();
window.lucia.userInfo('')
window.lucia.pageView('home')
