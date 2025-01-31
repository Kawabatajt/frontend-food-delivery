"use client";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Inter } from "next/font/google";
import { useAuthFetch } from "./useFetchData";
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
import { useClerk } from "@clerk/nextjs";
type FoodCategory = {
  _id: string;
  categoryName: string;
};

export const CategoryModal = () => {
  const [inputValue, setInputValue] = useState<any>([]);
  const { isLoading, data } = useAuthFetch("food-category");
  const categories: FoodCategory[] = data;
  const [createOpenModal, setCreateOpenModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useClerk();
  const params = useParams();
  if (isLoading) return <div>Loading...</div>;
  const addCategory = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category`,
      {
        method: "POST",
        body: JSON.stringify({ categoryName: inputValue }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCreateOpenModal(!createOpenModal);
  };
  const onChangeHandler = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    setIsDisabled(!value.trim());
  };

  const selectedCategory = categories?.find(
    (category: FoodCategory) => category._id === params.id
  );

  return (
    <div className={`${inter.className}`}>
      <div className="bg-white p-6 rounded-xl">
        <h1 className="mb-4 font-semibold text-xl">Dishes category</h1>
        <div className="flex flex-wrap gap-3">
          <Link href={`/admin/menu`}>
            <Badge variant="outline">All Dishes</Badge>
          </Link>
          {categories?.map((category) => (
            <Link key={category._id} href={`/admin/menu/${category._id}`}>
              <Badge
                key={category._id}
                variant="outline"
                className="font-medium px-4 py-2 rounded-full"
              >
                {category.categoryName}
              </Badge>
            </Link>
          ))}
        </div>
        <Dialog
          open={createOpenModal}
          onOpenChange={() => setCreateOpenModal(!createOpenModal)}
        >
          <DialogTrigger>
            <div className="rounded-full bg-[#EF4444]">
              <Plus className="text-white" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <h1>Category Name</h1>
            <Input value={inputValue} onChange={onChangeHandler} />
            <Button
              disabled={isDisabled}
              onClick={() => addCategory()}
              className="font-medium flex justify-center items-center text-white text-[14px] bg-[#18181B] w-[123px] h-[40px]"
              variant="outline"
            >
              Add Category
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      {selectedCategory && (
        <EachCategory allCategories={categories} category={selectedCategory} />
      )}
    </div>
  );
};
