const {DOMParser, XMLSerializer} = require("xmldom")
const React = require("react")

export const wrapRootElement = ({ element }) => {
  global.DOMParser = DOMParser
  global.XMLSerializer = XMLSerializer
  return (
    <>
      {element}
    </>
  )
}