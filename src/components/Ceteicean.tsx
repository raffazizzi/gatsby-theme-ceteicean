import React, { useEffect } from "react"
import { DOMParser } from "xmldom"
import { TEIRender, TEIRoute } from "react-teirouter"

import define from "../define"

import {
  Behavior,
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
  [key: string]: Behavior
}

export default function Ceteicean({ pageContext, routes }: Props) {

  useEffect(() => {
    define(pageContext.elements)
  })

  const {prefixed} = pageContext
  const doc: Document = new DOMParser().parseFromString(prefixed)
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
