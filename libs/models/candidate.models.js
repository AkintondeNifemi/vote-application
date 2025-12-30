import { Schema, models, model } from "mongoose";

const candidateModels = new Schema(
  {
    pollId: {
      type: Schema.Types.ObjectId,
      ref: "Polls",
      required: true,
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    contestantId: {
      type: Schema.Types.ObjectId,
      ref: "Contestants",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Candidates = models.Candidates || model("Candidates", candidateModels);
export default Candidates;
