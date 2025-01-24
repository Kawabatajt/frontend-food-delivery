"use client";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";
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
import { FoodCard } from "./Card";
type FoodCategory = {
  _id: string;
  categoryName: string;
};
type Category = {
  _id: string;
  categoryName: string;
};
type Props = {
  category: Category;
};

export const HomePageCategory = ({ category }: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("categoryId");

  return (
    <div>
      <div className="">
        <Link href={`/foods?categoryId=${category._id}`}>
          <Badge
            key={category._id}
            variant="outline"
            className={`font-normal text-[#18181B] text-lg rounded-full border-none px-5 text-nowrap ${
              category._id == search ? "bg-[#EF4444] text-white" : "bg-white"
            }`}
          >
            {category.categoryName}
          </Badge>
        </Link>
      </div>
    </div>
  );
};
