import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
      title: {
        type: String,
        default: "Untitled"
      },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    admin: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
  },
  { timestamps: true }
);
export const Group = mongoose.model("Group", GroupSchema)