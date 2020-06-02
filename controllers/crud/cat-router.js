const SR_CAT = require('../../models/sr_categories');
const MAL_CAT = require('../../models/malfunction_categories');

const mainCatRouter = async (main, cat) => {
    let response, name;
    if (main === 3) {
      name = await srMapper(cat);
      response = name.catName;
    } else if (main === 4) {
      name = await mlMapper(cat);
      response = name.catName;
    } else {
      response = ' ';
    }
    return response;
  }
  
  const srMapper = async cat => await SR_CAT.findOne({ where: { catId: cat }, attributes: ['catName']});
  
  const mlMapper = async cat => await MAL_CAT.findOne({ where: { catId: cat }, attributes: ['catName']}); 

  module.exports = { mainCatRouter };