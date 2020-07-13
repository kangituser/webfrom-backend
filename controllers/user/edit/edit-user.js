const EditUser = async (user, USERToUpdate, originalUrl) => {
    const USER = require('../../../models/user');
    const { messageRoutelet } = require('../../../mail/massage-routelet');
    
    const { oldActive } = user;
    const { email, fullName, isActive, role, phoneNumber } = USERToUpdate;

    
    if (oldActive == 0) {
      messageRoutelet(USERToUpdate, originalUrl , null, 'activated');
    }
    await USER.update({ email, fullName, isActive, role, phoneNumber }, { where: { id: user.id }})
  }

module.exports = { EditUser };