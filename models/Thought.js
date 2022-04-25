const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: ()=> new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // uses Moment syntax
      get: (val) => moment(val).format('MMM DD, YYYY [at] hh:mm a')
    },
  }
);


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // uses Moment syntax
      get: (val) => moment(val).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function() {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;