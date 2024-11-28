import * as React from 'react'

import type { NavLinksQuery, NavLinksQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '../ui/NavigationMenu'
import { Separator } from '../ui/Separator'
import Large from '../ui/typography/Large'

export const QUERY: TypedDocumentNode<NavLinksQuery, NavLinksQueryVariables> =
  gql`
    query NavLinksQuery {
      categories {
        idString
        name
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  categories,
  mobile,
}: CellSuccessProps<NavLinksQuery> & {
  mobile?: boolean
}) => {
  if (mobile)
    return categories.map((c) => {
      const to = routes.category({ idString: c.idString })
      return (
        <React.Fragment key={to}>
          <Large>
            <Link to={to}>{c.name}</Link>
          </Large>
          <Separator className="last:hidden" />
        </React.Fragment>
      )
    })

  return categories.map((c) => {
    const to = routes.category({ idString: c.idString })
    return (
      <NavigationMenuItem key={`ds-${to}`}>
        <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
          <Link to={to}>{c.name}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  })
}
