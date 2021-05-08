exports.createPages = async ({ actions, graphql, reporter }) => {
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
    const name = node.parent.name
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
