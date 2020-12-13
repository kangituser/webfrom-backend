const _pwd = require("./password-helpers/index");
const _serviceRequest = require("./service-request-helpers/index");

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

      const { email, role } = await _pwd.findUserById(id);

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

  create: async (req, res, next) => {
    try {
      const { id, originalUrl } = req;
      const { blobName, containerName } = req.body;

      const authUser = await findUserById(id);
      const serviceRequestToCreate = _serviceRequest.mapServiceRequest(req.body, id, authUser);
      const klhUsers = await _serviceRequest.findKLHUsers(2);

      authUser.role == 3 ? klhUsers.unshift(authUser.email) : null;

      // create service request
      const serviceRequest = await _serviceRequest.createServiceRequest(serviceRequestToCreate);
      // create blob
      await _serviceRequest.createBlob(serviceRequest.id, blobName, containerName);
      // create state
      await _serviceRequest.setStateToCreate(serviceRequest.id);

      // TODO: send email ({ srId: asr.id, email: klhEmails, main: asr.problem_type, sub: asr.problem_type, title: asr.title, description: asr.description, name: authUser.fullName, impact: asr.impact_name, klhModule: asr.module_klh_name }, originalUrl)
      
      return res.status(201).send({ message: "success" });
    } catch (err) {
      next(err);
    }
  },

  edit: async (req, res, next) => {
    try {
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
