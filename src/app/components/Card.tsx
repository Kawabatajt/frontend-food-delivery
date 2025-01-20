import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type Foods = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};
type Props = {
  food: Foods;
};
export const FoodCard = ({ food }: Props) => (
  <Card className="rounded-xl pt-6">
    <CardContent className="">
      <img
        className="w-[365px] h-[210px] rounded-xl mb-5"
        src={food?.image}
        alt=""
      />
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-medium text-2xl text-[#FD543F]">{food.foodName}</h1>
        <span className="text-lg font-semibold text-[#09090B]">
          ${food.price}
        </span>
      </div>
      <p className="text-sm font-normal text-[#09090B]">{food.ingredients}</p>
    </CardContent>
  </Card>
);
