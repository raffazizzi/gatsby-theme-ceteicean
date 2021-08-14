import React from "react"
import { TEINode, TEINodes } from "react-teirouter"

import { Behavior } from "./Behavior"

type TEIProps = {
  teiNode: Node,
  availableRoutes?: string[]
}

type ImgProps = {
  src: string,
  width?: string | number
  height?: string | number
}

export type TBehavior = (props: TEIProps) => JSX.Element | null

export const forwardAttributes = (atts: NamedNodeMap) => {
  return Array.from(atts).reduce<any>((acc, att) => {
    acc[att.name === 'ref' ? 'Ref' : att.name] = att.value
    return acc
  }, {})
}

export const SafeUnchangedNode = (props: TEIProps) => {
  // Re-build an element that does not need changing
  // to avoid routes from being infinitely re-applied
  if (props.teiNode.nodeType === 1) {
    const el = props.teiNode as Element
    return (
      React.createElement(
        el.localName,
        {...forwardAttributes(el.attributes)},
        <TEINodes teiNodes={el.childNodes} availableRoutes={props.availableRoutes} />)
    )
  }
  return (
    <TEINode {...props} />
  )
}

export const Eg: TBehavior = (props: TEIProps) => {
  return (<Behavior node={props.teiNode}>
    <pre>
      {<TEINodes 
          teiNodes={props.teiNode.childNodes}
          {...props}/>}
    </pre>
  </Behavior>)
}

export const Graphic: TBehavior = (props: TEIProps) => {
  const el = props.teiNode as Element
  const src = el.getAttribute("url")
  if (!src) return null

  const imgProps: ImgProps = { src }

  if (el.getAttribute('width')) {
    imgProps.width = el.getAttribute('width') || ""
  }

  if (el.getAttribute('height')) {
    imgProps.height = el.getAttribute('width') || ""
  }

  return (<Behavior node={props.teiNode}>
    <img {...imgProps} />
  </Behavior>)
}

export const List: TBehavior = (props: TEIProps) => {
  const el = props.teiNode as Element

  if (el.getAttribute("type") !== "gloss") {
    return <SafeUnchangedNode {...props}/>
  }

  const children = Array.from(el.childNodes)

  return (<Behavior node={props.teiNode}>
    <dl>{
      children.map((child, i) => {
        if (child.nodeType !== 1) {
          return (<TEINode key={`t-${i}`} teiNode={child} availableRoutes={props.availableRoutes} />)
        }
        const childEl = child as Element
        switch (childEl.localName) {
          case "tei-label":
            return <dt key={`tt-${i}`}><TEINodes teiNodes={childEl.childNodes} {...props} /></dt>
          case "tei-item":
            return <dd key={`td-${i}`}><TEINodes teiNodes={childEl.childNodes} {...props} /></dd>
        }
      })
    }</dl>
  </Behavior>)
}

export const Note: TBehavior = (props: TEIProps) => {
  const el = props.teiNode as Element

  if (el.getAttribute("place") !== "end") {
    return <SafeUnchangedNode {...props}/>
  }

  const id = `_note_${el.getAttribute("data-idx")}`

  return (
    <Behavior node={props.teiNode}>
      <sup>
        <a id={`src${id}`} href={`#${id}`}>
          {el.getAttribute("data-idx")}
        </a>    
      </sup>
    </Behavior>
  )

}

export const Ptr: TBehavior = (props: TEIProps) => {
  const el = props.teiNode as Element
  const target = el.getAttribute("target") || ""
  return (<Behavior node={props.teiNode}>
    <a href={target}>{target}</a>
  </Behavior>)
}

export const Ref: TBehavior = (props: TEIProps) => {
  const el = props.teiNode as Element
  const target = el.getAttribute("target") || ""
  return (<Behavior node={props.teiNode}>
    <a href={target}>
      {<TEINodes 
          teiNodes={el.childNodes}
          {...props}/>}
    </a>
  </Behavior>)
}

export const Tei: TBehavior = (props: TEIProps) => {
  const el = props.teiNode as Element

  const before: React.ReactElement[] = []
  const after: React.ReactElement[] = []

  // end notes
  const endNotes: React.ReactElement[] = Array.from(el.getElementsByTagName("tei-note")).reduce<any>((acc, note: Element, i) => {
    if (note.getAttribute("place") === "end") {
      // Add an index to the note
      note.setAttribute("data-idx", (i + 1).toString())
      acc.push(<li id={`_note_${i + 1}`}>
        {<TEINodes
          key={`en${i}`}
          teiNodes={note.childNodes}
          {...props}/>}
      </li>)
    }
    return acc
  }, [])

  if (endNotes.length > 0) {
    after.push(<ol key="endnotes" className="ceteicean-notes">{endNotes}</ol>)
  }

  const content = React.createElement(
    'tei-tei',
    {...forwardAttributes(el.attributes)},
    <TEINodes 
          teiNodes={props.teiNode.childNodes}
          {...props}/>
  )

  return (<>
    {before}
    {content}
    {after}
  </>)
}

export const TeiHeader: TBehavior = (props: TEIProps) => {
  const el = props.teiNode as Element
  return (
    React.createElement(
      el.localName.toLowerCase(),
      {...forwardAttributes(el.attributes)},
      <Behavior node={props.teiNode} />)
  )
}
