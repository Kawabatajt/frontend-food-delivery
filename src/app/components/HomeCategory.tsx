"use client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryModal } from "./Category";
import { FoodCard } from "./Card";

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
  _id: number;
  categoryName: string;
};
type Props = {
  category: Category;
};
export const HomeCategory = ({ category }: Props) => {
  const [foods, setFoods] = useState<Foods[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const query = category?._id ? `?id=${category?._id}` : "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food${query}`
      );
      const data = await response.json();
      console.log(data);
      setFoods(data);
    };
    fetchFoods();
  }, [category?._id]);

  return (
    <div className={`bg-white mt-6 rounded-xl p-5 ${inter.className}`}>
      <h1 className="mb-4 text-xl font-semibold">{category?.categoryName}</h1>
      <div className="flex flex-wrap gap-9">
        {foods?.map((food) => {
          return <FoodCard food={food} key={food._id} />;
        })}
      </div>
    </div>
  );
};
