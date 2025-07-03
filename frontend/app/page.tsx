"use client";

import { useEffect, useState } from "react";
import NPSForm from "@/components/NPSForm";
import NPSList from "@/components/NPSList";

interface NPSItem {
  id: string;
  productName: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

const fetchData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"}/api/responses`
  );
  const data = await res.json();
  return data;
};

export default function Home() {
  const [npsItems, setNpsItems] = useState<NPSItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData();
        setNpsItems(
          data.sort(
            (a: NPSItem, b: NPSItem) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (error) {
        console.error("Failed to fetch NPS items:", error);
      }
    })();
  }, []);

  const handleFormSubmit = async (data: {
    productName: string;
    rating: number;
    comment: string;
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"}/api/responses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();

    const newItem: NPSItem = {
      id: responseData.id,
      productName: responseData.productName,
      rating: responseData.rating,
      comment: responseData.comment || null,
      createdAt: responseData.createdAt,
    };

    setNpsItems((prev) => [newItem, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Customer Feedback
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us understand your experience and improve our products
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <NPSForm onSubmitAction={handleFormSubmit} />
          </section>

          <section>
            <NPSList items={npsItems} />
          </section>
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Your feedback helps us create better products for everyone</p>
        </footer>
      </div>
    </div>
  );
}
