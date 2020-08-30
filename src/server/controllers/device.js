const axios = require('axios');
const Device = require('../models/device');

// eslint-disable-next-line max-len
const Authorization = 'key=AAAAchBWnqQ:APA91bEPgygG1MHBIWQN1fHxAXcAFV6n_ZrAqj20isePgNneg5260YlRcecVM2nLT8e8xyYyDkJ_u5xZJLH3khwiI1ypJVuQmai_Dc62dYQIVRJ46yyhw3aGu5zTIJNARfyCduQjfRde';
const urlPush = 'https://fcm.googleapis.com/fcm/send';

const headers = () => ({
    'Content-Type': 'application/json',
    Authorization,
  });

const post = async (data) => {
  try {
    const res = await axios.post(urlPush, data, {
      headers: headers(),
    });
    return res ? res.data : { error: true };
  } catch (e) {
    console.log('e.response', e.response);
    return { error: e.response };
  }
};

module.exports = {
  create: async (req, res) => {
    const id = req.user.id;
    const { uuid } = req.body;
    const checkDevice = await Device.findOne({ uuid });
    if (checkDevice) {
      const dv = await Device.findOneAndUpdate(
        { _id: checkDevice._id },
        { ...req.body },
        { new: true },
      ).exec();
      return res.send(dv);
    }
    const device = await Device.create({
      ...req.body,
      onwer: id,
    });
    const newDevice = await device.save();

    return res.send(newDevice);
  },
  remove: async (req, res) => {
    const device = await Device.findByIdAndRemove(req.params.id);
    res.json({ sucsess: device && device._id, _id: req.params.id });
  },
  view: async (req, res) => {
    const device = await Device.findById(req.params.id);
    res.json(device);
  },
  userByDevice: async (req, res) => {
    const { id } = req.params;
    const userByDevice = await Device.findById(id).populate('user');
    res.send(userByDevice);
  },
  list: async (_, res) => {
    const device = await Device.find();
    res.json(device);
  },
  sendPush: async (req, res) => {
    const data = {
      registration_ids: [req.body.registration_ids],
      notification: {
          body: 'Push Notification for POC REACT NATIVE WEB',
          title: 'POC REACT NATIVE WEB',
      },
    };
    const push = await post(data);
    return res.json(push);
  },
};
