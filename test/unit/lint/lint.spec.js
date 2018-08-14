'use strict'

const { test } = use('Test/Suite')('Lint')
const { exec } = require('child_process')
const expect = require('chai').expect

test('standard lint', async ({assert}) => {
  const promise = new Promise((resolve, reject) => {
    exec('node ./node_modules/standard/bin/cmd.js', async (_, stdout, stderr) => {

      resolve(stdout)
      // if (err) {
      //   console.log(err)
      //   console.log(`stdout: ${stdout}`)
      //   console.log(`stderr: ${stderr}`)
      //   node couldn't execute the command
      // return
      // }
      // assert.equal(stderr, 123123)
      // the *entire* stdout and stderr (buffered)
      // console.log(`stdout: ${stdout}`)
      // console.log(`stderr: ${stderr}`)
    })
  })
  const result = await promise
  console.log(expect)

  // expect(result)
  expect(result).to.be.empty
})
