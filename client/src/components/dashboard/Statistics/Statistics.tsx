import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  DollarSign,
  ShoppingCart,
  Star,
  AlertTriangle
} from 'lucide-react';

type SalesData = {
  month: string;
  sales: number;
  books: number;
};

type CategoryData = {
  name: string;
  value: number;
  color: string;
};

type Book = {
  title: string;
  author: string;
  sold: number;
  revenue: number;
};

type InventoryAlert = {
  book: string;
  stock: number;
  status: 'critical' | 'low';
};

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: 'up' | 'down';
};

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
        <Icon className={`w-6 h-6 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {trend === 'up' ? (
        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
      ) : (
        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
      )}
      <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{change}%</span>
      <span className="text-sm text-gray-500 ml-1">vs last month</span>
    </div>
  </div>
);

const Statistics: React.FC = () => {
  const salesData: SalesData[] = [
    { month: 'Jan', sales: 45000, books: 890 },
    { month: 'Feb', sales: 52000, books: 1040 },
    { month: 'Mar', sales: 48000, books: 960 },
    { month: 'Apr', sales: 61000, books: 1220 },
    { month: 'May', sales: 55000, books: 1100 },
    { month: 'Jun', sales: 67000, books: 1340 }
  ];

  const categoryData: CategoryData[] = [
    { name: 'Fiction', value: 35, color: '#8884d8' },
    { name: 'Non-Fiction', value: 25, color: '#82ca9d' },
    { name: 'Children', value: 20, color: '#ffc658' },
    { name: 'Academic', value: 15, color: '#ff7300' },
    { name: 'Other', value: 5, color: '#00ff88' }
  ];

  const topBooks: Book[] = [
    { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", sold: 245, revenue: 3675 },
    { title: "Atomic Habits", author: "James Clear", sold: 198, revenue: 3564 },
    { title: "The Thursday Murder Club", author: "Richard Osman", sold: 187, revenue: 2805 },
    { title: "Educated", author: "Tara Westover", sold: 156, revenue: 2340 },
    { title: "The Midnight Library", author: "Matt Haig", sold: 143, revenue: 2145 }
  ];

  const inventoryAlerts: InventoryAlert[] = [
    { book: "Dune", stock: 3, status: "critical" },
    { book: "1984", stock: 8, status: "low" },
    { book: "Pride and Prejudice", stock: 12, status: "low" },
    { book: "The Great Gatsby", stock: 5, status: "critical" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">📊 Bookshop Statistics</h1>
          <p className="text-gray-600 mt-1 md:mt-2">Overview of your bookstore performance and metrics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <StatCard title="Total Revenue" value="$67,432" change="12.5" icon={DollarSign} trend="up" />
          <StatCard title="Books Sold" value="1,340" change="8.2" icon={BookOpen} trend="up" />
          <StatCard title="Active Customers" value="892" change="5.1" icon={Users} trend="up" />
          <StatCard title="Avg. Order Value" value="$48.50" change="3.2" icon={ShoppingCart} trend="down" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sales Trend (6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [name === 'sales' ? `$${value}` : value, name === 'sales' ? 'Revenue' : 'Books Sold']} />
                <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 Top Selling Books</h3>
            <div className="space-y-4">
              {topBooks.map((book, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{book.title}</h4>
                    <p className="text-xs text-gray-600">{book.author}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 text-sm">{book.sold} sold</p>
                    <p className="text-sm text-green-600">${book.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">⚠️ Inventory Alerts</h3>
            <div className="space-y-3">
              {inventoryAlerts.map((item, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  item.status === 'critical' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <div className="flex items-center">
                    <AlertTriangle className={`w-4 h-4 mr-2 ${
                      item.status === 'critical' ? 'text-red-500' : 'text-yellow-500'
                    }`} />
                    <span className="font-medium text-gray-900 text-sm">{item.book}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">📈 Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="sales" fill="#8884d8" name="Revenue ($)" />
              <Bar yAxisId="right" dataKey="books" fill="#82ca9d" name="Books Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 md:mt-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Customer Rating</h4>
            <p className="text-2xl font-bold text-gray-900 mt-2">4.8/5</p>
            <p className="text-sm text-gray-600">Based on 234 reviews</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center">
            <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Total Inventory</h4>
            <p className="text-2xl font-bold text-gray-900 mt-2">12,847</p>
            <p className="text-sm text-gray-600">Books in stock</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center">
            <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Return Rate</h4>
            <p className="text-2xl font-bold text-gray-900 mt-2">2.1%</p>
            <p className="text-sm text-gray-600">This month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;