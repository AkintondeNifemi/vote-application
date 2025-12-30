import { Schema, model, models } from "mongoose";

const contestantModels = new Schema(
  {
    pollId: {
      type: Schema.Types.ObjectId,
      ref: "Polls",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    candidate: {
      type: [Schema.Types.ObjectId],
      ref: "Candidates",
      default: [],
    },
    voter: {
      type: [Schema.Types.ObjectId],
      ref: "Voter",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

contestantModels.index({ pollId: 1, position: 1 }, { unique: true });

const Contestant = models.Contestant || model("Contestant", contestantModels);
export default Contestant;
