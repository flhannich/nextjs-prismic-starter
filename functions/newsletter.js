const axios = require('axios');

const mailChimpAPIKey = process.env.MAILCHIMP_API_KEY;
const mailChimpListID = process.env.MAILCHIMP_LIST_ID;
const mailChimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX;


exports.handler = (event, context, callback) => {
  let body = {}
  try {
    body = JSON.parse(event.body)
  } catch (e) {
    body = parse(event.body)
  }

  const data = {
    email_address: body.email,
    status: "pending",
    merge_fields: {}
  };

  const subscriber = JSON.stringify(data);

  axios(
    {
      method: 'post',
      url: `https://${mailChimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailChimpListID}/members/`,
      data: subscriber,
      auth: {
        username: 'apikey', // any value will work 
        password: mailChimpAPIKey
      }
    }
  ).then(function(response){
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ emailAdded: true })
    })
  }).catch(function(error) {
    if (error.response) {
      console.error(error.response);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error(error.message);
    }
    console.error(error.config);
  });
};