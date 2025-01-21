"use client";
import { useState, useEffect } from "react";
import { HeroSection } from "../components/Hero";
import { HomePageCategory } from "../components/HomePageCategory";
import { EachCategory } from "../components/EachCategory";
import { HomeCategory } from "../components/HomeCategory";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
type FoodCategory = {
  _id: string;
  categoryName: string;
};
export default function FoodsPage() {
  const [foodCategory, setFoodCategory] = useState<FoodCategory[]>([]);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const SelectedCategory = foodCategory.find(
    (category) => category._id == categoryId
  );

  console.log({ categoryId });

  useEffect(() => {
    const fetchFoodCategory = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category`
      );
      const data = await response.json();
      setFoodCategory(data);
    };
    fetchFoodCategory();
  }, []);

  return (
    <div className="">
      <HeroSection />'
      <div className="w-[2000px] mx-auto">
        <div className="flex gap-2">
          <Link href={`/foods`}>
            <Badge
              variant="outline"
              className={`${
                categoryId === null ? "bg-[#EF4444] text-white" : "bg-white"
              } text-lg rounded-full font-normal`}
            >
              All Dishes
            </Badge>
          </Link>
          {foodCategory?.map((category) => (
            <HomePageCategory category={category} key={category._id} />
          ))}
        </div>
        {categoryId === null
          ? foodCategory.map((category) => (
              <HomeCategory key={category._id} category={category} />
            ))
          : SelectedCategory && (
              <HomeCategory
                key={SelectedCategory._id}
                category={SelectedCategory}
              />
            )}
      </div>
    </div>
  );
}
