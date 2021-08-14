import React, { FunctionComponent } from "react"

export const Behavior: FunctionComponent<{node: Node}> = ({children, node}) => {

  const serializer = global ? new global.XMLSerializer() : new XMLSerializer()

  // Keep the original content in the DOM, but hide it from view.
  // Use this component when the original TEI needs to be replaced by HTML structures.
  let content = ""
  if (node.nodeType === 1) {
    const el = node as Element
    for (const c of Array.from(el.childNodes)) {
      content += serializer.serializeToString(c)
    }
  } else {
    content = node.textContent || ""
  }
  return (<>
    <span hidden aria-hidden data-original
      dangerouslySetInnerHTML={{__html: content}} />
    {children}
  </>)
}