## OneSignal Rest API for Azure DevOps

Send notification with OneSignal over Azure DevOps 
  
## Usage
Add a new task, select **OneSignal - Create Push Notification** from the **Utility** category and configure it as needed.

Parameters include:

- **APP ID**: OneSignal AppId
- **REST API KEY**: OneSignal Rest API Key
- **Title**: Your message's title
- **Message**: Your message content

 ## How to build the .vsix package
- Clone the code to a directory.
- Install [Node.js](https://nodejs.org/ "Node.js").
- Install the extension packaging tool (TFX) by running 
`npm install -g tfx-cli` from a command prompt.
- `npm install vss-web-extension-sdk --save` run in the clone directory.
- `tfx extension create --manifest-globs vss-extension.json` run in the clone directory.

Thats all! I guess :)
