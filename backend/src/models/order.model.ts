import mongoose, { Schema, Document } from "mongoose";
import redis from '../config/redis';
import { Order as BaseNewOrder, ProductRecord } from '../types';

export interface NewOrder extends BaseNewOrder, Document {}

const OrderSchema: Schema = new Schema(
  {
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: { type: String, default: "PENDING" },
  },
  { timestamps: true }
);

// hooks to sync redis
OrderSchema.post("save", async function (doc) {
  try {
    if (doc) {
      await redis.set(`order:${doc.orderId}`, JSON.stringify(doc));
      console.log('new order created: Redis');
    }
  } catch (err) {
    console.error('Error saving new order: Redis', err);
  }
});

OrderSchema.post("findOneAndUpdate", async function (doc) {
  try {
    if (doc) {
      await redis.set(`order:${doc.orderId}`, JSON.stringify(doc));
      console.log('order updated: Redis');
    }
  } catch (err) {
    console.error('Error updating order: Redis:', err);
  }
});

// remove extra properties from query, and _id from products
OrderSchema.methods.toJSON = function() {
 const record = this.toObject();
 const {_id, createdAt, updatedAt, __v, ...rest} = record;
 const products = rest.products.map(({_id, ...rest}:ProductRecord ) => rest)

 return {
    ...rest,
    products
 };
}

export default mongoose.model<NewOrder>("Order", OrderSchema);
