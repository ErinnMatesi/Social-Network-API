const { User, Thought } = require('../models');

module.exports = {
// getThoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// getSingleThought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// createThought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: {thoughts: thought._id} },
          { new: true}
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({message: 'Thought created, but found no user with that ID'})
          : res.json('Created Thought!')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// updateThought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// deleteThought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { videos: req.params.videoId }},
            { new:true}
          )
      )
      .then((user) =>
        !user
            ? res
              .status(404)
              .json({ message: 'Thought deleted, but found no user with that ID' })
            : res.json({ message: 'Deleted Thought!' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// createReaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: {reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// deleteReaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};