import React from "react"
import Renderer from "./Renderer"
import type { TBehavior } from "./DefaultBehaviors"

type Props = {
  pageContext: {
    name: string
    prefixed: string
    elements: string[]
  }
  routes?: Routes
}

export type Routes = {
  [key: string]: TBehavior | JSX.Element
}

export default function Ceteicean({ pageContext, routes }: Props) {
  const {name, prefixed, elements} = pageContext;
  return <Renderer name={name} prefixed={prefixed} elements={elements} routes={routes}/>
}
