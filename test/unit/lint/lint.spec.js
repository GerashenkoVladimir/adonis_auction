/* eslint-disable no-unused-expressions */
'use strict'

const { test } = use('Test/Suite')('Lint')
const { exec } = require('child_process')
const {expect} = require('chai')

test('standard lint', async () => {
  const promise = new Promise((resolve, reject) => {
    exec('node ./node_modules/standard/bin/cmd.js', async (_, stdout, __) => {
      resolve(stdout)
    })
  })

  const result = await promise
  expect(result).to.be.empty
})
