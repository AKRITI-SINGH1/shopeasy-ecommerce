const paypal = require("@paypal/paypal-server-sdk");
require("dotenv").config();

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

function environment() {
  // Create and return a SandboxEnvironment. Use LiveEnvironment for production.
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  // Use this client to make PayPal API calls.
  return new paypal.core.PayPalHttpClient(environment());
}

module.exports = { client };