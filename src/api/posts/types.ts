export type PurchaseProps = {
  quantity: number;
  productId: string;
  zipCode: string;
};
export type CardPurchaseProps = {
  quantity: number;
  productId: string;
};

export type Product = {
  userId: number;
  id: string;
  title: string;
  body: string;
  price: number;
  image: string;
  onPress: ({ quantity, productId }: CardPurchaseProps) => void;
  // quantityChanged: (quantity: number) => void;
};
