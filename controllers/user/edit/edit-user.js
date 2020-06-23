const EditUser = async (user, USERToUpdate, originalUrl) => {
    
    const { messageRoutelet } = require('../../../mail/massage-routelet');
    
    const oldActive = user.isActive;
    const { email, name, active, userRole, phone } = USERToUpdate;

    user.email = email;
    user.fullName = name;
    user.isActive = active;
    user.role = userRole;
    user.phoneNumber = phone;
    const edited = await user.save()
    
    if (oldActive == 0) {
      messageRoutelet(USERToUpdate, originalUrl , null, 'activated');
    }
    return edited;
  }

module.exports = { EditUser };