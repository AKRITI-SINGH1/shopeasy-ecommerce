const paypal = require("@paypal/paypal-server-sdk");

const clientId = "";
const clientSecret = "";

function environment() {
  // Create and return a SandboxEnvironment. Use LiveEnvironment for production.
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  // Use this client to make PayPal API calls.
  return new paypal.core.PayPalHttpClient(environment());
}

module.exports = { client };