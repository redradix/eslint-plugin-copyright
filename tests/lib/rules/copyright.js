'use strict'

var rule = require('../../../lib/rules/copyright')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()
ruleTester.run('copyright', rule, {
  valid: [
    {
      code: '/*\nCopyright 2015, My Company\n*/\nconsole.log(1)',
      options: [[
        'Copyright 2015, My Company'
      ]]
    },
    {
      code: '/*\n************************\n* Copyright 2015\n* My Company\n************************\n*/\nconsole.log(1)',
      options: [[
        '************************',
        '* Copyright 2015',
        '* My Company',
        '************************'
      ]]
    }
  ],
  invalid: [
    {
      code: '/*Copyright 2015, My Company*/\nconsole.log(1);',
      options: [['Copyright 2015, My Company']],
      errors: [
        { message: 'missing copyright header' }
      ]
    },
    {
      code: 'console.log(1);',
      options: [['Copyright 2015, My Company']],
      errors: [
        { message: 'missing copyright header' }
      ]
    },
    {
      code: '//Another kind of comment\nconsole.log(1);',
      options: [['Copyright 2015, My Company']],
      errors: [
        { message: 'missing copyright header' }
      ]
    },
    {
      code: '//Another comment\n/*\nCopyright 2015, My Company\n*/\nconsole.log(1);',
      options: [['Copyright 2015, My Company']],
      errors: [
        { message: 'copyright header not at top' }
      ]
    }
  ]
})
