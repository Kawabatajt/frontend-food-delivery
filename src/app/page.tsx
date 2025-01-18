"use client";
import { useState, useEffect } from "react";
import { HeroSection } from "./components/Hero";
import { HomePageCategory } from "./components/HomePageCategory";

type FoodCategory = {
  _id: number;
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
      console.log(data);
      setFoodCategory(data);
    };
    fetchFoodCategory();
  }, []);
  const addCategory = async () => {
    const categoryName = prompt("Add category");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category`,
      {
        method: "POST",
        body: JSON.stringify({ categoryName: categoryName }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    setFoodCategory([...foodCategory, data]);
  };

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
      <div className="flex flex-col  items-center mt-8 gap-9">
        <h1 className="">Categories</h1>
        <HomePageCategory />
      </div>
    </div>
  );
}
