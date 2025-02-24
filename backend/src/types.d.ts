type Status = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"

export type Product = {
  productId: string,
  quantity: number,
}

export type ProductRecord = Product & {
  _id: string,
}

export type NewOrder = {
  orderId: string,
  userId: string,
  products: Product[],
}

export type Order = NewOrder & {
  status: Status,
}

export type MessagePayload = {
  orderId: string,
  status: string,
}
