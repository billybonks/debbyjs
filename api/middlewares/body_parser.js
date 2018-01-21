const bodyParser = require('body-parser');
const crypto = require('crypto');

const verifyRequestSignature = function (request, response, buffer) {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') return;
  var signature = request.headers['x-hub-signature'];

  if (!signature) {
    response.sendStatus(404).json({ msg: `Couldn't validate the signature`});
  } else {
    var elements = signature.split('=');
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', process.env.FB_APP_SECRET)
                        .update(buffer)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      response.sendStatus(404).json({ msg: `Couldn't validate the signature`});
      throw new Error(`Couldn't validate the request signature.`);
    }
  }
}

module.exports = bodyParser.json({
  type: '*/*',
  verify: verifyRequestSignature,
})
