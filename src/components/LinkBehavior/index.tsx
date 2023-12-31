import * as React from 'react'
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from 'react-router-dom'

// eslint-disable-next-line react/display-name
export const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />
})
