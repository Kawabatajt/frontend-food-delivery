"use client";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect, use } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { EachCategory } from "./EachCategory";
import { useParams } from "next/navigation";
type FoodCategory = {
  _id: string;
  categoryName: string;
};
export const HomePageCategory = () => {
  const [foodCategory, setFoodCategory] = useState<FoodCategory[]>([]);
  useEffect(() => {
    const fetchFoodCategory = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category`
      );
      const data = await response.json();
      console.log(data);
      setFoodCategory(data);
    };
    fetchFoodCategory();
  }, []);

  return (
    <div className="flex gap-2">
      {foodCategory?.map((category) => (
        <Badge
          key={category._id}
          variant="outline"
          className="font-medium px-4 py-2 rounded-full"
        >
          {category.categoryName}
        </Badge>
      ))}
    </div>
  );
};
