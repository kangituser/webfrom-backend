const _pwd = require("./password-helpers/index");
const _serviceRequest = require("./service-request-helpers/index");

const _user = require('./user-helpers/index');
const sendEmail = require('./massage-routelet');
const enums = require('./mail/states');

module.exports = {
  getAllOpen: async (req, res, next) => {
    try {
      const { id } = req;
      const status = [1, 2, 4, 5, 6];
      const roles = [1, 2, -1];

      const { email, role } = await _pwd.findUserById(id);

      let serviceReq;

      if (!roles.includes(role)) {
        serviceReq = await _serviceRequest.remap(status, email);
      } else {
        serviceReq = await _serviceRequest.remap(status);
      }

      return res.status(200).send({ serviceReq });
    } catch (err) {
      next(err);
    }
  },

  getAllClosed: async (req, res, next) => {
    try {
      const { id } = req;
      const status = 3;
      const roles = [1, 2, -1];

      const email = await _pwd.findUserEmailById(id);

      const role = await _user.getUserRole(id);

      if (!roles.includes(role)) {
        serviceReq = await _serviceRequest.remap(status, email.email);
      } else {
        serviceReq = await _serviceRequest.remap(status);
      }

      return res.status(200).send({ serviceReq });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { blobName, containerName } = req.body;
      
      const authUser = await _pwd.findUserById(req.id);
      const serviceRequestToCreate = _serviceRequest.mapServiceRequest(req.body, req.id, authUser);
      const klhUsers = await _serviceRequest.findKLHEmails(2);

      authUser.role == 3 ? klhUsers.unshift(authUser.email) : null;

      // create service request
      const serviceRequest = await _serviceRequest.createServiceRequest(serviceRequestToCreate);
      // create blob
      await _serviceRequest.createBlob(serviceRequest.id, blobName, containerName);
      // create state
      await _serviceRequest.setStateToCreate(serviceRequest.id);
      sendEmail({ 
        srId: serviceRequest.id, 
        email: klhUsers, 
        main: serviceRequest.problem_type, 
        sub: serviceRequest.problem_type, 
        title: serviceRequest.title, 
        description: serviceRequest.description, 
        name: authUser.fullName, 
        impact: serviceRequest.impact_name, 
        klhModule: serviceRequest.module_klh_name 
      }, enums.SERVICE_REQUEST, enums.serviceRequestCreated);
      
      return res.status(201).send({ message: "success" });
    } catch (err) {
      next(err);
    }
  },

  edit: async (req, res, next) => {
    try {
      const { id, originalUrl } = req;
      const { srId, status } = req.body;
      const roles = [1, 2, -1];

      const user = await _pwd.findUserById(id);
      if (!roles.includes(user.role)) {
        return res.status(422).send({ message: "unauthorized user." });
      }

      let state = await _serviceRequest.findStateById(srId);
      const states = [0, 1, 2, 3];


      if (!state) {
        state = await _serviceRequest.setStateToEdit(srId);
        // return res.status(201).send({ message: 'created a new state' });
      }

      if (state.syncStatus === 6) {
        await _serviceRequest.updateStatetoError(state)
        return res.status(201).send({ message: 'success.' });
      }

      if (!states.includes(state.syncStatus)) {
        return res.status(401).send({ message: 'record was not updated' });
      }

      
      // handle edit
      let editedServiceRequest = await _serviceRequest.updateServiceRequest(req.body, user.fullName, state);
      let body = await _serviceRequest.sendServiceRequestEditedEmail(editedServiceRequest, status, user, req.body, originalUrl);

      if (body.closed) {
        sendEmail(body, enums.SERVICE_REQUEST, enums.serviceRequestClosed);  
      } else {
        sendEmail(body, enums.SERVICE_REQUEST, enums.serviceRequestEdited);
      }

      return res.status(201).send({ message: 'success.' });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req;
      const roles = [1, -1];
      const { role } = await _pwd.findUserById(id);
      
      if (!roles.includes(role)) {
        return res.status(422).send({ message: "unauthorized user " });
      }
      
      const { srId } = req.body;
      const state = await _serviceRequest.findStateById(srId);
      if (!state) {
        await _serviceRequest.setStateToDelete(srId);
        await _serviceRequest.deleteServiceRequest(srId);
        return res.status(201).send({ message: 'state does not exist, created a state with id 4 to delete' });
      }
      
      const states = [4, 5, 6];

      if (states.includes(state.syncStatus)) {
        return res.status(401).send({ message: 'nothing to delete' });
      }

      await _serviceRequest.updateStateToDelete(state.id);
      await _serviceRequest.deleteServiceRequest(srId);
      return res.status(201).send({ message: 'sysaid service request destroyed, status updated for deletion' });
    } catch (err) {
      next(err);
    }
  },
};
