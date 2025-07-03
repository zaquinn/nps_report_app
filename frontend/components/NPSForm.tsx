"use client";

import { useState } from "react";

interface NPSFormProps {
  onSubmitAction: (data: {
    productName: string;
    rating: number;
    comment: string;
  }) => void;
}

export default function NPSForm({ onSubmitAction }: NPSFormProps) {
  const [productName, setProductName] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName && rating !== null) {
      onSubmitAction({ productName, rating, comment });
      setProductName("");
      setRating(null);
      setComment("");
    }
  };

  const ratingLabels = [
    "Extremely Unlikely",
    "Very Unlikely",
    "Unlikely",
    "Neutral",
    "Likely",
    "Extremely Likely",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Rate Your Experience
        </h2>
        <p className="text-gray-600">
          Help us improve by sharing your feedback
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600 focus:border-transparent transition-colors placeholder-gray-400"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How likely are you to recommend this product? (0-5)
          </label>
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-1 md:gap-2">
              {[...Array(6)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index)}
                  className={`
                    h-10 md:h-12 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer
                    ${
                      rating === index
                        ? index <= 2
                          ? "bg-red-500 text-white shadow-lg"
                          : index === 3
                            ? "bg-yellow-500 text-white shadow-lg"
                            : "bg-green-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {index}
                </button>
              ))}
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Extremely Unlikely</span>
              <span className="hidden md:inline">Neutral</span>
              <span>Extremely Likely</span>
            </div>

            {rating !== null && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Rating {rating}:</span>{" "}
                  {ratingLabels[rating]}
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Additional Comments (Optional)
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400 resize-none"
            placeholder="Share your thoughts about this product..."
          />
        </div>

        <button
          type="submit"
          disabled={!productName || rating === null}
          className="w-full bg-blue-600 cursor-pointer text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
