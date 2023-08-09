//functions are only for server=> functions->stripe->get data from stripe->back to functions->checkout


//domain/.netlify/functions/hello
exports.handler = async function () {

  return {
    statusCode: 200,
    body: 'hello',
  }
}



//for BE