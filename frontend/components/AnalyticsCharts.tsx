interface AnalyticsData {
  totalResponses: number;
  promoters: number;
  detractors: number;
  neutral: number;
  npsScore: number;
}

interface AnalyticsChartsProps {
  data: AnalyticsData;
}

function DonutChart({ data }: { data: AnalyticsData }) {
  const { promoters, detractors, neutral, totalResponses } = data;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  const promoterOffset = 0;
  const detractorOffset = (promoters / totalResponses) * circumference;
  const neutralOffset =
    ((promoters + detractors) / totalResponses) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="20"
        />

        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth="20"
          strokeDasharray={`${(promoters / totalResponses) * circumference} ${circumference}`}
          strokeDashoffset={-promoterOffset}
          className="transition-all duration-500"
        />

        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#ef4444"
          strokeWidth="20"
          strokeDasharray={`${(detractors / totalResponses) * circumference} ${circumference}`}
          strokeDashoffset={-detractorOffset}
          className="transition-all duration-500"
        />

        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="20"
          strokeDasharray={`${(neutral / totalResponses) * circumference} ${circumference}`}
          strokeDashoffset={-neutralOffset}
          className="transition-all duration-500"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">
          {totalResponses}
        </span>
        <span className="text-sm text-gray-600">Total Responses</span>
      </div>
    </div>
  );
}

function BarChart({ data }: { data: AnalyticsData }) {
  const { promoters, detractors, neutral, totalResponses } = data;
  const maxValue = Math.max(promoters, detractors, neutral);

  const categories = [
    {
      label: "Promoters",
      value: promoters,
      color: "bg-green-500",
      percentage: (promoters / totalResponses) * 100,
    },
    {
      label: "Neutral",
      value: neutral,
      color: "bg-yellow-500",
      percentage: (neutral / totalResponses) * 100,
    },
    {
      label: "Detractors",
      value: detractors,
      color: "bg-red-500",
      percentage: (detractors / totalResponses) * 100,
    },
  ];

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.label} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              {category.label}
            </span>
            <span className="text-sm text-gray-600">
              {category.value} ({category.percentage.toFixed(1)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${category.color} transition-all duration-500`}
              style={{ width: `${(category.value / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  const { promoters, detractors, neutral, totalResponses, npsScore } = data;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{npsScore.toFixed(1)}%</div>
            <div className="text-sm opacity-90">NPS Score</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Net Promoter Score
        </h2>
        <p className="text-gray-600">
          {npsScore >= 50
            ? "Excellent"
            : npsScore >= 0
              ? "Good"
              : "Needs Improvement"}{" "}
          customer satisfaction
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            Response Distribution
          </h3>
          <DonutChart data={data} />

          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Promoters (9-10)</span>
              </div>
              <span className="text-sm font-medium">{promoters}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Neutral (7-8)</span>
              </div>
              <span className="text-sm font-medium">{neutral}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Detractors (0-6)</span>
              </div>
              <span className="text-sm font-medium">{detractors}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Category Breakdown
          </h3>
          <BarChart data={data} />

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">
                  {((promoters / totalResponses) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">Promoters</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">
                  {((neutral / totalResponses) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">Neutral</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">
                  {((detractors / totalResponses) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">Detractors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">👍</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-800">
                {promoters}
              </div>
              <div className="text-sm text-green-700">Happy Customers</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">😐</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-800">
                {neutral}
              </div>
              <div className="text-sm text-yellow-700">Neutral Customers</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">👎</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-800">
                {detractors}
              </div>
              <div className="text-sm text-red-700">Needs Attention</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
