"use client";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { SideBar } from "@/app/components/Sidebar";
import { CategoryModal } from "@/app/components/Category";
import { EachCategory } from "@/app/components/EachCategory";
import { useAuthFetch } from "@/app/components/useFetchData";
type FoodCategory = {
  _id: string;
  categoryName: string;
};
export default function Home() {
  const [foodCategory, setFoodCategory] = useState<FoodCategory[]>([]);
  const { isLoading, data } = useAuthFetch("food-category");
  const categories: FoodCategory[] = data;
  if (isLoading) return <div>Loading ...</div>;
  return (
    <div className="w-[1440px] mx-auto">
      <div className="flex">
        <SideBar />
        <div className="bg-[#f4f4f5] flex-1 min-h-screen pl-6 pr-10 py-6">
          <div className="flex justify-end mb-6">
            <UserButton />
          </div>
          <CategoryModal />
          {categories?.map((category) => (
            <EachCategory
              allCategories={categories}
              key={category._id}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
