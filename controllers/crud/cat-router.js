const SR_CAT = require('../../models/sr_categories');
const MAL_CAT = require('../../models/malfunction_categories');

const mainCatRouter = async (main, cat) => {  
  console.log(cat);
  
    switch (main) {
      case 3:
        return await mapper(cat, SR_CAT);
      case 4:        
        return await mapper(cat, MAL_CAT);
      default:
        return ' ';
      }
  }
  
  const mapper = async (cat, model) => await model.findOne({ where: { catId: cat }, attributes: ["catName"], raw: true});

  module.exports = { mainCatRouter };