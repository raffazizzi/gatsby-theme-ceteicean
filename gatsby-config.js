module.exports = themeOptions => {
  return {
    plugins: [
      {
        resolve: `gatsby-transformer-ceteicean`,
        options: {
          applyBefore: themeOptions.applyBefore || [],
          applyAfter: themeOptions.applyAfter || [],
          namespaces: themeOptions.namespaces
        }
      },
    ]
  }
}
