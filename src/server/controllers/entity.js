const Entity = require('../models/entity');
// const User = require('../models/users');

module.exports = {
  create: async (req, res) => {
    const id = req.user.id;
    const compte = await Entity.create({
      ...req.body,
      onwer: id,
    });
    const newCompte = await compte.save();

    return res.send(newCompte);
  },
  remove: async (req, res) => {
    const entity = await Entity.findByIdAndRemove(req.params.id);
    res.json({ sucsess: entity && entity._id, _id: req.params.id });
  },
  view: async (req, res) => {
    const compte = await Entity.findById(req.params.id);
    res.json(compte);
  },
  userByEntity: async (req, res) => {
    const { id } = req.params;
    const userByEntity = await Entity.findById(id).populate('user');
    res.send(userByEntity);
  },
  list: async (_, res) => {
    const entity = await Entity.find();
    res.json(entity);
  },
};
