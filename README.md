# Issue Template Parser 📜

[![test](https://github.com/GrantBirki/issue-template-parser/actions/workflows/test.yml/badge.svg)](https://github.com/GrantBirki/issue-template-parser/actions/workflows/test.yml) [![lint](https://github.com/GrantBirki/issue-template-parser/actions/workflows/lint.yml/badge.svg)](https://github.com/GrantBirki/issue-template-parser/actions/workflows/lint.yml) [![package-check](https://github.com/GrantBirki/issue-template-parser/actions/workflows/package-check.yml/badge.svg)](https://github.com/GrantBirki/issue-template-parser/actions/workflows/package-check.yml) [![codeql](https://github.com/GrantBirki/issue-template-parser/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/GrantBirki/issue-template-parser/actions/workflows/codeql-analysis.yml) [![coverage](./badges/coverage.svg)](./badges/coverage.svg)

A GitHub Action to convert issues created from issue templates into machine readable JSON for further processing

## About 💡

This action is designed to be used in conjunction with [issue templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository) to allow you to parse the issue body into machine readable JSON for further processing. Issues submitted with "issue templates" have a somewhat structured format, but the format is really just a markdown file with some headings. The headings are always `###` so we can somewhat reliably parse the issue body into a JSON object given these assumptions.

You may want to use this Action to conditional run subsequent steps in your workflow based on the contents of the issue body. For example, you may want to run a step only if the issue body contains a specific keyword or if the issue body contains a specific version number, etc.

## Setup ⚙️

Here is a simple example of how to use this action in your workflow:

```yaml
- uses: GrantBirki/issue-template-parser@vX.X.X # <-- Replace with the latest version
  id: issue-parser
  with:
    body: ${{ github.event.issue.body }}

- run: echo ${{ steps.issue-parser.outputs.json }}
```

> Look below in this README for a full workflow example

## Inputs 📥

| Input | Required? | Default | Description |
| ----- | --------- | ------- | ----------- |
| `body` | `true` | `${{ github.event.issue.body }}` | The RAW body of the issue to parse if you want to override the default |

## Outputs 📤

| Output | Description |
| ------ | ----------- |
| `json` | A JSON string of the parsed issue |

## Example 📸

Given the following issue body:

```md
### Your contact details

me@me.com

### What happened?

A bug happened!

### Version

1.0.0

### What browsers are you seeing the problem on?

Chrome, Safari

### What else?

- [x] Never give up
- [ ] Hot Dog is a Sandwich
```

The actions output of `${{ steps.issue-parser.outputs.json }}` would be:

```json
{
  "your_contact_details": "me@me.com",
  "what_happened?": "A bug happened!",
  "version": "1.0.0",
  "what_browsers_are_you_seeing_the_problem_on?": "Chrome, Safari",
  "code_of_conduct": "- [x] Never give up\r\n- [ ] Hot Dog is a Sandwich"
}
```

By looking at this example, you will notice that all the headings are `###` and this is what we are seperating the issue body by. The headings are converted to lowercase and snake case with spaces being replaced by `_` characters. The headings are also trimmed of any leading or trailing whitespace. The headings are then used as the JSON keys and their values are the text between the headings. If there are multiple lines of text between the headings, they are joined together with `\r\n` characters.

## Full Workflow Example 🚀

Here is a full workflow example that will run on any issue that is opened or edited. It will parse the issue body into JSON and then print the JSON to the console.

You may want to add some extra conditional logic to this workflow to only run on the specific issues you want to parse. For example, if you have a bug report issue  template, you may want to only run this workflow on issues that have the "bug report" label. This will help to prevent unnecessary workflow runs or workflow failures that aren't related to the issue template parsing.

```yaml
name: Example Workflow
on:
  issues:
    types: [opened, edited]

permissions:
  issues: read

jobs:
  example:
    runs-on: ubuntu-latest

    steps:
      - uses: GrantBirki/issue-template-parser@vX.X.X # <-- Replace with the latest version
        id: issue-parser
        with:
          body: ${{ github.event.issue.body }}

      - name: print the parsed issue in JSON format
        run: echo '${{ steps.issue-parser.outputs.json }}'
```

## Releasing a New Version 🏷️

To release a new version run `script/release` and then publish the following release
