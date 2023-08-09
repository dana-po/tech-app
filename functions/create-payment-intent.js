//domain/.netlify/functions/create-payment-intent
// aceasta f ruleaza in server de aceea pot adauga valorile process.env.REACT_APP_STRIPE_SECRET_KEY etc,motivul pt care sunt inca in .env este ca daca il pun pe github nu vreau sa expun cheile
// process.env.REACT_APP_STRIPE_SECRET_KEY;-nu e accesibila din FE decat daca se face direct request din Fe
// functions sunt ca middleman sau middleware care ne permit sa ascundem valorile
//node land
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

  // from https://stripe.com/docs/payments/quickstart
  const calculateOrderAmount = () => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return shipping_fee + total_amount;
  };
  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: 'GBP',
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
