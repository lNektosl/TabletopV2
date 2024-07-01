exports.handler = async function (event, context) {
  const youtubeApiKey = process.env.YOUTUBE_APIKEY;
  const jsemailApiKey = process.env.JSEMAIL_APIKEY;
  const jsemailServiceKey = process.env.JSEMAIL_SERVICE_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify({
      YOUTUBE_APIKEY: youtubeApiKey,
      JSEMAIL_APIKEY: jsemailApiKey,
      JSEMAIL_SERVICE_KEY: jsemailServiceKey,
    }),
  };
};