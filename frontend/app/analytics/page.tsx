"use client";

import { useEffect, useState } from "react";
import AnalyticsCharts from "@/components/AnalyticsCharts";

interface AnalyticsData {
  totalResponses: number;
  promoters: number;
  detractors: number;
  neutral: number;
  npsScore: number;
}

const fetchData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"}/api/responses/report`
  );
  const data = await res.json();
  return data;
};

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalResponses: 0,
    promoters: 0,
    detractors: 0,
    neutral: 0,
    npsScore: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to fetch NPS report:", error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights and metrics from your customer feedback
          </p>
        </div>

        <AnalyticsCharts data={analyticsData} />

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Data updates in real-time as new feedback is collected</p>
        </footer>
      </div>
    </div>
  );
}
