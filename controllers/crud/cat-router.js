const SR_CAT = require('../../models/sr_categories');
const MAL_CAT = require('../../models/malfunction_categories');

const mainCatRouter = async (main, cat) => {
    let response, name;
    switch (main) {
      case 3:
        name = await mapper(cat, SR_CAT);
        response = name.catName;
        break;
      case 4:
        name = await mapper(cat, MAL_CAT);
        response = name.catName;
        break;
      default:
        response = ' ';
        break;
      }
      return response;
  }
  
  const mapper = async (cat, model) => await model.findOne({ where: { catId: cat }, attributes: ['catName']});

  module.exports = { mainCatRouter };