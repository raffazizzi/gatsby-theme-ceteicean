# gatsby-theme-ceteicean

This Gatsby theme implements HTML5 Custom Elements for XML publishing, particularly with [TEI](https://tei-c.org).

It re-implements parts of CETEIcean excluding behaviors; instead, to customize the behavior of specific elements,
you can define React components with [React TEI Router](https://github.com/pfefferniels/react-teirouter).

## How to use

You can add this theme to a new or existing Gatsby project. First install it:

```shell
npm install gatsby-theme-ceteicean
```

Then add the theme to your `gatsby-config.js`.

```javascript
module.exports = {
  plugins: [
    "gatsby-theme-ceteicean"
  ],
}
```

Make sure to source your XML (TEI) files so that they are available in GraphQL:

```js
module.exports = {
  plugins: [
    "gatsby-theme-ceteicean",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "PATH_TO_DIR_WITH_XML",
      },
    },
  ],
}
```

To lean more about how the XML files are sourced, see [gatsby-transformer-ceteicean](https://github.com/raffazizzi/gatsby-transformer-ceteicean/).

## Defining behaviors

Once the XML documents are rendered as HTML Custom Elemnets, they can be styled via CSS, for example:

```css
tei-p {
  display: block;
}
```

More complex transformations can be performed via React components. The theme provides some default behaviors for TEI.

Behaviors rely on [react-teirouter](https://github.com/pfefferniels/react-teirouter) to traverse the XML document and
render a given element via a provided React component. To provide new behaviors, it is recommended to use the `Behavior` 
component for conformance to CETEIcean behaviors (for example, it preserves the original content in an hidden element).

```jsx
import { TEINodes } from "react-teirouter"
import { Behavior } from "gatsby-theme-ceteicean/src/components//Behavior"

const Code = (props) => {
  return (<Behavior node={props.teiNode}>
    <code>
      {<TEINodes 
          teiNodes={props.teiNode.childNodes}
          {...props}/>}
    </code>
  </Behavior>)
}
```

Finally, you will need to [shadow](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/) `Ceteicean.tsx`
and provide new behaviors via the `routes` parameter. Routes are provided as an object:

```js
{
  "matching-element": YourComponent,
  "another-element": AnotherComponent
}
```

Here is a more full example of how to shadow `Ceteicean.tsx`:

```jsx
import React from "react"
import Ceteicean from "gatsby-theme-ceteicean/src/components/Ceteicean"

import MyTeiHeader from "./MyTeiHeader"

export default function ShadowedCeteicean({pageContext}) {

  const routes = {
    "tei-teiheader": MyTeiHeader
  }

  return(
    <Ceteicean pageContext={pageContext} routes={routes} />
  )

}
```
