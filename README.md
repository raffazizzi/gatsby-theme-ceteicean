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
