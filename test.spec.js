import {parse} from './parse'
import {readFileSync} from 'fs'

it('readme example', async () => {
  const expectedOutput = require('./fixtures/readme-example/expected.json')
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2)

  const body = readFileSync(
    './fixtures/readme-example/issue-body.md'
  ).toString()

  const jsonDict = await parse(body)

  expect(jsonDict).toEqual(expectedOutputJson)
})

it('multi paragraph', async () => {
  const expectedOutput = require('./fixtures/multiple-paragraphs/expected.json')
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2)

  const body = readFileSync(
    './fixtures/multiple-paragraphs/issue-body.md'
  ).toString()

  const jsonDict = await parse(body)

  expect(jsonDict).toEqual(expectedOutputJson)
})

it('model example raw string', async () => {
  const expectedOutput = require('./fixtures/model-example/expected.json')
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2)

  const body = require('./fixtures/model-example/issue').issue.body

  const jsonDict = await parse(body)

  expect(jsonDict).toEqual(expectedOutputJson)
})

it('test issue body from newly created issue', async () => {
  const expectedOutput = {
    model_name: 'grant test submission',
    model_description: 'this is a test',
    ersilia_id: 'eos123test',
    slug: 'grant-test',
    tags: 'a,b,c',
    publication: null,
    code: null,
    license: 'MIT'
  }
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2)

  const body =
    '### Model Name\n\ngrant test submission\n\n### Model Description\n\nthis is a test\n\n### Ersilia ID\n\neos123test\n\n### Slug\n\ngrant-test\n\n### Tags\n\na,b,c\n\n### Publication\n\n_No response_\n\n### Code\n\n_No response_\n\n### License\n\nMIT'

  const jsonDict = await parse(body)

  expect(jsonDict).toEqual(expectedOutputJson)
})
