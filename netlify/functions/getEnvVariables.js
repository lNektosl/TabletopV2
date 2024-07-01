exports.handler = async function (event, context) {
  const youtubeApiKey = process.env.YOUTUBE_APIKEY;
  const jsemailApiKey = process.env.JSEMAIL_APIKEY;

  return {
    statusCode: 200,
    body: JSON.stringify({
      YOUTUBE_APIKEY: youtubeApiKey,
      JSEMAIL_APIKEY: jsemailApiKey,
    }),
  };
};