export default function (context) {
  console.log('[Middleware] check Auth')
  if (process.client) {
    context.store.dispatch('initAuth')
  }
}
