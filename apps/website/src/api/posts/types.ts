export type PurchaseProps = {
  quantity: number;
  productId: string;
  zipCode: string;
};

export type Product = {
  userId: number;
  id: string;
  title: string;
  body: string;
  price: number;
  image: string;
  loading: boolean;
  onPress: ({ quantity, productId, zipCode }: PurchaseProps) => void;
};
