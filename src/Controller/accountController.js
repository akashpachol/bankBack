import asyncHandler from "express-async-handler";

import Account from "../Modal/account.js";

export const getTranscation = asyncHandler(async (req, res) => {
  console.log( req.user_id,' req.user_id')
  const transaction = await Account.findOne({ user: req.user_id });

  res
    .status(200)
    .json({
      message: "get all transaction ",
      status: "success",
      data: transaction,
    });
});

export const deposit = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const transaction = await Account.findOne({ user: req.user_id });

  if (!transaction) {
    const account = new Account({
      user:  req.user_id,
      transactions: [{ type: "credit", amount }],
      accountBalance: amount,
    });
    const accountData = await account.save();
  } else {
    transaction.accountBalance += amount;

    transaction.transactions.push({
      type: "credit",
      amount,
      date: new Date(),
    });

    await transaction.save();
  }
  res.json({
    message: "ammount deposit success full",
    status: "success",
  });
});

export const withdraw = asyncHandler(async (req, res) => {
  const { amount } = req.body;
console.log(amount,'jffjjfj');

  const transaction = await Account.findOne({ user: req.user_id });

  if (!transaction || transaction.accountBalance < amount) {
    res.status(404).json({ message: "Insufficient balance" });
    return;
  } else {
    transaction.accountBalance -= amount;

    transaction.transactions.push({
      type: "debit",
      amount,
      date: new Date(),
    });

    await transaction.save();
  }
  res.json({
    message: "ammount withdraw  success full",
    status: "success",
  });
});
