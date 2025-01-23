"use client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import { useAuthFetch } from "./useFetchData";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryModal } from "./Category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Value } from "@radix-ui/react-select";
import { DialogClose } from "@radix-ui/react-dialog";

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
  allCategories: Category[];
};
export const EachCategory = ({
  category,
  allCategories,
}: {
  category: Category;
  allCategories: Category[];
}) => {
  const [foods, setFoods] = useState<Foods[]>([]);
  const [foodValue, setFoodValue] = useState<string>();
  const [priceValue, setPriceValue] = useState<number>();
  const [ingredientsValue, setIngredientsValue] = useState<string>();
  const [createDialog, setCreateDialog] = useState(false);
  const [imageValue, setImageValue] = useState<any>(false);
  const [imageUpdate, setImageUpdate] = useState<string>();
  const { isLoading, data: foodItems } = useAuthFetch(
    `food?id=${category._id}`
  );

  console.log({ allCategories });
  const [categoryId, setCategoryId] = useState<string>();
  const [editFoods, setEditFoods] = useState<Foods[]>();
  const handleEdit = async (food: Foods) => {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food?id=${food._id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: foodValue,
          price: priceValue,
          ingredients: ingredientsValue,
          image: imageUpdate,
          category: categoryId,
        }),
      }
    );
    window.location.reload();
  };
  const handleDelete = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food?id=${id}`,
      {
        method: "DELETE",
      }
    );
  };
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-delivery");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/db8gb9fvf/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const dataJson = await response.json();
      console.log(dataJson);
      setImageValue(dataJson.secure_url);
      setImageUpdate(dataJson.secure_url);
    }
  };
  console.log(imageValue);
  const src = imageValue;
  const addFoodDetails = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food`, {
      method: "POST",
      body: JSON.stringify({
        foodName: foodValue,
        price: priceValue,
        ingredients: ingredientsValue,
        image: imageValue,
        category: category._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setFoods([...foods, data]);
    setCreateDialog(!createDialog);
  };

  return (
    <div className={`bg-white mt-6 rounded-xl p-5 ${inter.className}`}>
      <h1 className="mb-4 text-xl font-semibold">{category?.categoryName}</h1>
      <div className="flex gap-4 flex-wrap">
        <div className="w-[270px] h-[241px] rounded-xl border-dashed border-[#EF4444] border-[1px] flex flex-col justify-center items-center gap-6">
          <Dialog open={createDialog} onOpenChange={setCreateDialog}>
            <DialogTrigger>
              <div className="size-[40px] rounded-full bg-[#EF4444] flex justify-center items-center ">
                <Plus className="text-white" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="mb-6">
                <DialogTitle>{`Add new Dish to ${category?.categoryName} `}</DialogTitle>
              </DialogHeader>
              <div className="flex justify-between mb-2">
                <div>
                  <h1 className="mb-2 font-medium">Food name</h1>
                  <Input
                    placeholder="Type food name"
                    className="pr-12"
                    value={foodValue}
                    onChange={(e) => setFoodValue(e.target.value)}
                  />
                </div>
                <div>
                  <h1 className="mb-2 font-medium">Price</h1>
                  <Input
                    placeholder="Enter price"
                    className="pr-12"
                    value={priceValue}
                    onChange={(e) => setPriceValue(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="mb-2">
                <h1 className="mb-2 font-medium">Ingredients</h1>
                <Input
                  placeholder="List ingredients..."
                  className="pb-20 pt-4"
                  value={ingredientsValue}
                  onChange={(e) => setIngredientsValue(e.target.value)}
                />
              </div>
              <div>
                <h1 className="mb-2 font-medium">Food Image</h1>
                <div className="h-[138px] w-[100%] bg-[#2563EB0D] rounded-lg">
                  <label className=" size-[100%] border-[1px] border-dashed flex justify-center items-center ">
                    <input
                      className="hidden size-[200px]"
                      type="file"
                      onChange={handleUpload}
                    />
                    {src ? (
                      <div
                        style={{ backgroundImage: `url(${src})` }}
                        className="bg-center bg-cover bg-no-repeat h-[138px] w-[100%] rounded-lg"
                      ></div>
                    ) : (
                      <div className="flex flex-col items-center gap-4 rounded-lg">
                        <div className="size-[32px] bg-white flex justify-center items-center rounded-full">
                          <Image className="size-[16px]" />
                        </div>
                        <p className="font-medium">
                          Choose a file or drag & drop it here
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  className="bg-[#18181B] text-white font-medium text-sm"
                  variant="outline"
                  onClick={addFoodDetails}
                >
                  Add Dish
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="w-[120px]">
            <h1 className="text-[14px] text-center">
              {`Add new Dish to ${category?.categoryName}`}
            </h1>
          </div>
        </div>
        {foodItems?.map((food) => {
          return (
            <div
              key={food._id}
              className="w-[270px] h-[241px] border-[1px] border-[#E4E4E7] rounded-xl p-4 relative"
            >
              <div
                className="w-[238.75px] h-[129px] mb-5 rounded-xl bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${food.image}) ` }}
              ></div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-medium text-sm text-[#EF4444]">
                  {food.foodName}
                </h1>
                <span className="text-xs font-normal text-[#09090B]">
                  ${food.price}
                </span>
              </div>

              <p className="text-xs font-normal text-[#09090B]">
                {food.ingredients}
              </p>
              <Dialog>
                <DialogTrigger>
                  <div className="size-[44px] bg-white rounded-full flex justify-center items-center absolute right-8 bottom-[45%]">
                    <Pencil className="text-[#EF4444]" />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dishes info</DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-between">
                    <h1>Dish Name</h1>
                    <Input
                      defaultValue={food?.foodName}
                      className="px-2 py-2 w-[300px]"
                      value={foodValue}
                      onChange={(e) => setFoodValue(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between">
                    <h1>Dish Category</h1>
                    <div className="">
                      <Select onValueChange={(val) => setCategoryId(val)}>
                        <SelectTrigger className="w-[300px]">
                          <SelectValue placeholder={category.categoryName} />
                        </SelectTrigger>
                        <SelectContent>
                          {allCategories?.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              <Badge variant="outline">
                                {category.categoryName}
                              </Badge>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <h1>Ingredients</h1>
                    <Input
                      defaultValue={food?.ingredients}
                      className="px-2 pt-5 w-[300px] pb-20"
                    />
                  </div>
                  <div className="flex justify-between">
                    <h1>Price</h1>
                    <Input
                      defaultValue={food?.price}
                      className="px-2 py-2 w-[300px]"
                    />
                  </div>
                  <div className="flex justify-between">
                    <h1>Image</h1>

                    <label className="rounded-lg w-[300px] h-[150px] border-[1px] border-dashed flex justify-center items-center bg-center bg-cover">
                      {imageValue ? (
                        <div
                          style={{ backgroundImage: `url(${imageValue}) ` }}
                          className="rounded-lg w-[300px] h-[150px] border-[1px] border-dashed flex justify-center items-center bg-center bg-cover"
                        >
                          <Input
                            onChange={handleUpload}
                            className="hidden size-[200px]"
                            type="file"
                          />
                        </div>
                      ) : (
                        <div
                          style={{ backgroundImage: `url(${food.image}) ` }}
                          className="rounded-lg w-[300px] h-[150px] border-[1px] border-dashed flex justify-center items-center bg-center bg-cover"
                        >
                          <Input
                            onChange={handleUpload}
                            className="hidden size-[200px]"
                            type="file"
                          />
                        </div>
                      )}
                    </label>
                  </div>
                  <div className="flex justify-between mt-9">
                    <DialogClose asChild>
                      <div
                        onClick={() => handleDelete(food._id)}
                        className="py-2 px-4 border-[1px] rounded-md"
                      >
                        <Trash className="text-[#EF4444]" />
                      </div>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button
                        onClick={() => handleEdit(food)}
                        variant="outline"
                        className="font-medium hover:bg-[#18181B] hover:text-white"
                      >
                        Save changes
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      </div>
    </div>
  );
};
