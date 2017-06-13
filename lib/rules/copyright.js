'use strict'

function getLeadingComments(context, node) {
  if (node.body.length) {
    return context.getComments(node.body[0]).leading
  } else {
    return context.getComments(node).leading
  }
}

module.exports = function(context) {
  const { options } = context

  if (!options.length) {
    throw new Error('missing options')
  }

  return {
    Program: function(node) {
      let header = `\n${options[0].join('\n')}\n`

      const leadingComments = getLeadingComments(context, node)

      const foundIndex = leadingComments.findIndex((comment) => comment.value === header)

      if (foundIndex > 0) {
        context.report({
          node,
          message: 'copyright header not at top',
          fix: (fixer) => {
            return fixer.remove(leadingComments[foundIndex])
          }
        })
        return
      }

      if (foundIndex < 0) {
        context.report({
          node,
          message: 'missing copyright header',
          fix: (fixer) => {
            const pivot = leadingComments[0] || node
            const copyright = `/*${header}*/\n`
            return fixer.insertTextBefore(pivot, copyright)
          }
        })
        return
      }
    }
  }
}
