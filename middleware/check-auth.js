export default function (context) {
  console.log('[Middleware] check Auth')
  context.store.dispatch('initAuth', context.req)
}
