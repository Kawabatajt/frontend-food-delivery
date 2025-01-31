"use client";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { SideBar } from "@/app/components/Sidebar";
import { Payment, columns } from "@/app/payments/column";
import { DataTable } from "@/app/payments/data-table";
import { useAuth } from "@clerk/nextjs";
type FoodCategory = {
  _id: string;
  categoryName: string;
};
export default function Home() {
  const { getToken } = useAuth();
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const token = await getToken();
      if (!token) return;
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food-order`, {
        headers: {
          authentication: token,
        },
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    };
    fetchOrderData();
  }, []);
  console.log({ data });

  return (
    <div className="w-[1440px] mx-auto">
      <div className="flex">
        <SideBar />
        <div className="bg-[#f4f4f5] flex-1 min-h-screen pl-6 pr-10 py-6">
          <div className="flex justify-end mb-6">
            <UserButton />
          </div>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
