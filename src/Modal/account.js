import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
    date: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["debit", "credit"],
      required: true,
    },
  });
  const accountSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      transactions: [transactionSchema],
      accountBalance: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );
  

   const Account = model("Account", accountSchema);
  export default Account;