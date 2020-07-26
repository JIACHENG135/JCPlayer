/**
 * 路由钩子,页面切切换时触发
 * @param props
 * @param next 继续渲染
 * @this AppRouter
 */
export function beforeRouter(props: PageProps, next: Function): boolean | void | Promise<boolean | void> {
  window.dispatchEvent(new CustomEvent('router_update', { detail: props }))
  next()
}
