const {DOMParser, XMLSerializer} = require("xmldom")
const React = require("react")

exports.wrapRootElement = ({ element }) => {
  global.DOMParser = DOMParser
  global.XMLSerializer = XMLSerializer
  return (
    <>
      {element}
    </>
  )
}