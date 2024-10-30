export type PurchaseProps = {
  quantity: number;
  productId: number;
};

export type Post = {
  userId: number;
  id: string;
  title: string;
  body: string;
  price: string;
  image: string;
  onPress: ({ quantity, productId }: PurchaseProps) => void;
};
