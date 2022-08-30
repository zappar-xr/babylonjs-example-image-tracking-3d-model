# Zappar for BabylonJS Example
​
This repository contains an AR example using the Zappar SDK for BabylonJS. This specific example uses `parcel` to compile and bundle the assets and code, and TypeScript to get full auto-complete and compile-time error checking.
​
To learn more about Zappar for BabylonJS, head over to the [Zappar for BabylonJS](https://www.npmjs.com/package/@zappar/zappar-babylonjs) (@zappar/zappar-babylonjs) page on npm.
​
## Preview
​
Scan the QR code below using your native camera app or QR code reader to view the example:
​
![Preview QR Code"](preview-qr-code.png)
​
## Prerequisites
​
To get started you'll want to ensure you have:
​
- installed Node.js version 10 or later
- printed out the example target image, `example-tracking-image.png` (image tracked projects only)
​
## Running the Project
​
Once you have cloned this repository, open a terminal in the root directory of this project and follow these steps to get started.
​
Install the dependencies by running:
​
```bash
npm install
```
​
Next, run the project using the following command:
​
```bash
npm start
```
​
The `parcel` tool will host the content locally and give you an address you can open in your browser of your local machine.
​
We recommend launching **instant world tracking** and **image tracked** projects on a mobile device to get the best user experience. If you'd like to try on a mobile device, follow these steps:
​
1. Ensure the device is on the same local network (e.g. Wifi)
2. Find out the IP address of your computer
3. On your mobile device, visit: `https://YOUR-IP-ADDRESS:PORT` replacing both `YOUR-IP-ADDRESS` and `PORT` (the port is the number after the `:` in the address given by `parcel`). Note it's important to type `https` at the start of the address to ensure your device connects over HTTP**S**.

## Target Image
![Target Image](example-tracking-image.png)
