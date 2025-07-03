interface NPSItem {
  id: string;
  productName: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

interface NPSListProps {
  items: NPSItem[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getRatingColor(rating: number): string {
  if (rating <= 2) return "text-red-600 bg-red-50 border-red-200";
  if (rating === 3) return "text-yellow-600 bg-yellow-50 border-yellow-200";
  return "text-green-600 bg-green-50 border-green-200";
}

function getRatingLabel(rating: number): string {
  if (rating <= 2) return "Detractor";
  if (rating === 3) return "Neutral";
  return "Promoter";
}

export default function NPSList({ items }: NPSListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8v10a2 2 0 002 2h6a2 2 0 002-2V8"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No feedback yet
        </h3>
        <p className="text-gray-600">
          Start collecting valuable feedback from your customers
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Customer Feedback</h2>
        <div className="text-sm text-gray-600">
          {items.length} {items.length === 1 ? "review" : "reviews"}
        </div>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.productName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getRatingColor(item.rating)}`}
                    >
                      {item.rating}/5
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getRatingColor(item.rating)}`}
                    >
                      {getRatingLabel(item.rating)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          item.rating <= 2
                            ? "bg-red-500"
                            : item.rating === 3
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${(item.rating / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 min-w-0">
                      {item.rating}/5
                    </span>
                  </div>
                </div>

                {item.comment && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-gray-700 leading-relaxed">
                      {item.comment}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {formatDate(item.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
