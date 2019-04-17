// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const path = require('path')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const config = vscode.workspace.getConfiguration('hello_world')
  let img_url = config.get('backgroundImage')

  if (img_url.indexOf('https') === -1 || img_url.indexOf('http') === -1) {
    img_url = vscode.Uri.file(path.join(context.extensionPath, 'vsc.jpg'))
  }

  let disposable = vscode.commands.registerCommand('extension.helloWorld', function() {
    const panel = vscode.window.createWebviewPanel(
      'Encourage Division',
      'Encourage Division',
      vscode.ViewColumn.Beside,
      {}
    )

    panel.webview.html = getWebviewContent(img_url)
  })

  context.subscriptions.push(disposable)
}

function getWebviewContent(img_url) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <img src=${img_url}  width="977px" height="721px"/>
  </body>
  </html>
`
}
exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
