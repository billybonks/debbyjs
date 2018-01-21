module.exports = function ({method, url}, response, next) {
  response.on('finish', () => {
    console.log(`${response.statusCode} ${method} ${url}`);
  });
  next();
}
