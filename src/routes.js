export default function (router) {
  router.map({
    '/': {
      name: 'home',
      component: require('./pages/Chart')
    },
    '/table': {
      name: 'table',
      component: require('./pages/Table')
    }
  })
}
