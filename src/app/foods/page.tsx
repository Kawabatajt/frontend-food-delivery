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
  const search = searchParams.get("categoryId");
  const allSearch = searchParams.get("all-categories");
  const SelectedCategory = foodCategory.find(
    (category) => category._id == search
  );

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
        <div className="flex">
          <Link href={`/foods?all-categories=1`}>
            <Badge>All Dishes</Badge>
          </Link>
          {foodCategory?.map((category) => (
            <HomePageCategory category={category} key={category._id} />
          ))}
        </div>
        {allSearch == "1"
          ? foodCategory.map((category) => (
              <HomeCategory key={category.id} category={category} />
            ))
          : SelectedCategory && <HomeCategory category={SelectedCategory} />}
      </div>
    </div>
  );
}
