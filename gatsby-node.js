exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  console.log(themeOptions);

  if (themeOptions.fullShadow) return;
  const filesToSkip = themeOptions.exclude || [];

  const { createPage } = actions
  const component = require.resolve(`./src/components/Ceteicean.tsx`)

  const result = await graphql(`
    query {
      allCetei {
        nodes {
          prefixed
          elements
          parent {
            ... on File {
              name
              ext
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  for (const node of result.data.allCetei.nodes) {
    const {name, ext} = node.parent

    if (filesToSkip.includes(name + ext)) continue;

    createPage({
      path: name,
      component,
      context: {
        name,
        prefixed: node.prefixed,
        elements: node.elements
      }
    })
  }
}
