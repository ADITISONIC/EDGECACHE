import mongoose, { Schema, Document,Types } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortId: string;
  clicks: number;
  user: Types.ObjectId;
  expiresAt?: Date;
  createdAt: Date;
}

const UrlSchema = new Schema<IUrl>(
  {
    originalUrl: {
      type: String,
      required: true,
    },

    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    clicks: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

UrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IUrl>("Url", UrlSchema);
