const TokenGenerator = require('uuid-token-generator');

const tokenGenerator = async () => await new TokenGenerator(256, TokenGenerator.BASE62).generate(); 

module.exports = { tokenGenerator };