"use client";

import { Inter } from "next/font/google";
import { FoodCard } from "./Card";
import { useAuthFetch } from "./useFetchData";
const inter = Inter({ subsets: ["latin"] });
export type Foods = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};
type Category = {
  _id: string;
  categoryName: string;
};
type Props = {
  category: Category;
  addressValue: string;
};
export const HomeCategory = ({ category, addressValue }: Props) => {
  const query = category?._id ? `?id=${category?._id}` : "";
  const { isLoading, data } = useAuthFetch(`food${query}`);
  const foods: Foods[] = data;
  console.log(foods);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={` mt-[74px] rounded-xl${inter.className}`}>
      <h1 className="mb-14 text-white text-3xl font-semibold">
        {category?.categoryName}
      </h1>
      <div className="flex flex-wrap gap-9">
        {foods?.map((food) => {
          return (
            <FoodCard food={food} key={food._id} addressValue={addressValue} />
          );
        })}
      </div>
    </div>
  );
};
