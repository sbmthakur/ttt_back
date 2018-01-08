# ttt_back

This repository contains the backend code for my other project known as [ttt_form](https://github.com/sbmthakur/ttt_form).

## Getting Started

### Prerequisites

Your system must have `Node.js` installed. As `ttt_back` heavily uses `ES6` features, it may not work with older versions of `node`. 

### Installing

#### Setup

```
git clone git@github.com:sbmthakur/ttt_back.git
```
Switch to HTTPS URL if necessary.

Now run the following command after downloading or cloning this repo:

```
cd ttt_back && npm install
```
This will install dependencies. If you are setting up `ttt_back` on your local system, then change the following line in `index.js`:
```
res.setHeader("Access-Control-Allow-Origin", "https://ttt-form.herokuapp.com");
```
to this:
```
res.setHeader("Access-Control-Allow-Origin", "*");
```
This is done to bypass the [CORS policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) enforced by browsers.
Now, start the server:
```
node index.js
```
#### Testing  

Once the server is up, run the test with Mocha:
```
./node_modules/mocha/bin/mocha tests/apiTests.js 
```
#### 

Please report any issues that you may encounter. Suggestions are welcome.
