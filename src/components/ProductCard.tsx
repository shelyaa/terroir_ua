import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  rate?: number;
  imagePath: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  rate,
  imagePath,
}) => {
  return (
    <Card className="font-manrope flex overflow-hidden flex-col">
    <div className="flex justify-center">
      <img src={imagePath} alt={name} className="max-h-64 object-contain" />
    </div>
  
    <CardHeader>
      <CardTitle className="text-center">{name}</CardTitle>
    </CardHeader>
  
    <CardContent className="grid grid-cols-2 font-bold">
      <CardDescription>{price} грн</CardDescription>
  
      <div className="flex items-center gap-2 justify-end">
        <CardDescription>{rate}</CardDescription>
        <img src="src/assets/star.svg" alt="star" className="w-4 h-4" />
      </div>
    </CardContent>
  </Card>
  );
};
