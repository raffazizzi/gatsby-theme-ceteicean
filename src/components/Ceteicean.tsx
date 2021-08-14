import React, { useEffect } from "react"
import { TEIRender, TEIRoute } from "react-teirouter"

import define from "../define"

import {
  TBehavior,
  Tei,
  Eg,
  Graphic,
  List,
  Note,
  Ptr,
  Ref,
  TeiHeader
} from "./DefaultBehaviors"

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

  const parser = global ? new global.DOMParser() : new DOMParser()

  useEffect(() => {
    define(pageContext.elements)
  })

  const {prefixed} = pageContext
  const doc: Document = parser.parseFromString(prefixed, 'text/xml')
  const defaultRoutes: Routes = {
    "tei-tei": Tei,
    "tei-eg": Eg,
    "tei-graphic": Graphic,
    "tei-list": List,
    "tei-note": Note,
    "tei-ptr": Ptr,
    "tei-ref": Ref,
    "tei-teiheader": TeiHeader
  }

  const _routes = routes ? routes : defaultRoutes

  const teiRoutes = Object.keys(_routes).map((el, i) => {
    return <TEIRoute el={el} component={_routes[el]} key={`tr-${i}`}/>
  })

  return (
    <TEIRender data={doc.documentElement}>
      {teiRoutes}
    </TEIRender>
  )
}
