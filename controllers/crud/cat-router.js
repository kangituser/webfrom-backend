const SERVICE_CATEGORIES = require('../../models/sr_categories');
const MALFUNCTION_CATEGORIES = require('../../models/malfunction_categories');

const mainCatRouter = async (main, cat) => {  
  console.log(cat);
  
    switch (main) {
      case 3:
        return await mapper(cat, SERVICE_CATEGORIES);
      case 4:        
        return await mapper(cat, MALFUNCTION_CATEGORIES);
      default:
        return ' ';
      }
  }
  
  const mapper = async (cat, model) => await model.findOne({ where: { catId: cat }, attributes: ["catName"], raw: true});

  module.exports = { mainCatRouter };