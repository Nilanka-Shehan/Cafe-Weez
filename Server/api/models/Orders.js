const mongoose = require("mongoose");
const Counter = require("./Counter");
const { Schema } = mongoose;

const orderDetails = new Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: String,
    phoneNumber: String,
    tableNumber: String,
    distance: Number,
    deliveryDate: Date,
    orderType: {
      type: String,
      enum: ["online", "dining"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cod"],
      default: "cod",
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: false,
        },
        productName: {
          type: String,
          required: false,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Virtual field to calculate the total price dynamically
orderDetails.virtual("calculatedTotalPrice").get(function () {
  return this.cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
});

// Middleware to set totalPrice before saving the order
orderDetails.pre("save", function (next) {
  this.totalPrice = this.calculatedTotalPrice;
  next();
});

//Auto-increment orderId
orderDetails.pre("save", async function (next) {
  if (!this.orderId) {
    const counter = await Counter.findOneAndUpdate(
      { name: "order" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.orderId = `Order ${counter.seq}`;
  }
  next();
});

const Orders = mongoose.model("Orders", orderDetails);
module.exports = Orders;
