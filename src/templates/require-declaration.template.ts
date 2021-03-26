export const template = JSON.stringify({
  "type": "VariableDeclaration",
  "declarations": [
    {
      "type": "VariableDeclarator",
      "id": {
        "type": "Identifier",
        "loc": {
          "identifierName": "functionNamePromise"
        },
        "name": "functionNamePromise"
      },
      "init": {
        "type": "CallExpression",
        "callee": {
          "type": "MemberExpression",
          "object": {
            "type": "CallExpression",
            "callee": {
              "type": "Identifier",
              "loc": {
                "identifierName": "require"
              },
              "name": "require"
            },
            "arguments": [
              {
                "type": "StringLiteral",
                "extra": {
                  "rawValue": "util",
                  "raw": "'util'"
                },
                "value": "util"
              }
            ]
          },
          "property": {
            "type": "Identifier",
            "loc": {
              "identifierName": "promisify"
            },
            "name": "promisify"
          },
          "computed": false
        },
        "arguments": [
          {
            "type": "MemberExpression",
            "object": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "loc": {
                  "identifierName": "require"
                },
                "name": "require"
              },
              "arguments": [
                {
                  "type": "StringLiteral",
                  "extra": {
                    "rawValue": "parentLib",
                    "raw": "'parentLib'"
                  },
                  "value": "parentLib"
                }
              ]
            },
            "property": {
              "type": "Identifier",
              "loc": {
                "identifierName": "functionName"
              },
              "name": "functionName"
            },
            "computed": false
          }
        ]
      }
    }
  ],
  "kind": "const"
});