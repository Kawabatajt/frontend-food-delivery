"use client";
import { useState, useEffect } from "react";
import { HeroSection } from "./components/Hero";
import { HomePageCategory } from "./components/HomePageCategory";

type FoodCategory = {
  _id: string;
  categoryName: string;
};

export default function Home() {
  const [foodCategory, setFoodCategory] = useState<FoodCategory[]>([]);
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
      {/* {foodCategory?.map((category) => {
        return (
          <div className="text-black" key={category._id}>
            {category.categoryName}
          </div>
        );
      })} */}
      <HeroSection />
      <div className="flex items-center mt-8">
        <h1 className="">Categories</h1>
        {foodCategory?.map((category) => (
          <HomePageCategory key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}
