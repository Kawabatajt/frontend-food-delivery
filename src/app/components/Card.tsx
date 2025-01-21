import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
export const FoodCard = ({ food }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="">
          <CardContent>
            <div
              className="w-[377px] h-[364px] rounded-xl bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${food.image}) ` }}
            ></div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-medium text-2xl text-[#FD543F]">
                {food.foodName}
              </h1>
              <span className="text-lg font-semibold text-[#09090B]">
                ${food.price}
              </span>
            </div>
            <p className="text-sm font-normal text-[#09090B]">
              {food.ingredients}
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogTitle></DialogTitle>
        <div className="flex gap-6 w-[1000px]">
          <div
            className="w-[377px] h-[364px] rounded-xl bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${food.image}) ` }}
          ></div>
          <div className="w-[377px] h-[364px]">
            <h1 className="font-medium text-3xl text-[#FD543F]">
              {food.foodName}
            </h1>
            <p className="text-base">{food.ingredients}</p>
            <div>
              <h1>Total price</h1>
              <h1>{food.price}</h1>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
