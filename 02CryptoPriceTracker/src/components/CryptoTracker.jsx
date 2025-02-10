import { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import { BsSun, BsMoon } from 'react-icons/bs'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

const CryptoTracker = () => {
  const [coins, setCoins] = useState([])
  const [filteredCoins, setFilteredCoins] = useState([])
  const [currency, setCurrency] = useState('usd')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('market_cap')
  const [darkMode, setDarkMode] = useState(false)
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem('favorites')) || []
  )
  const [chartData, setChartData] = useState(null)

  // Fetch Crypto Data
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: currency,
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: true,
            },
          }
        )
        setCoins(response.data)
        setFilteredCoins(response.data)
        setChartData({
          labels: response.data[0].sparkline_in_7d.price.map(
            (_, index) => index
          ),
          datasets: [
            {
              label: `${response.data[0].name} Price Trend`,
              data: response.data[0].sparkline_in_7d.price,
              borderColor: '#ffcc00', // Changed to Yellow
              backgroundColor: 'rgba(255, 204, 0, 0.2)', // Transparent Yellow
              borderWidth: 2,
            },
          ],
        })
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCryptoData()
    const interval = setInterval(fetchCryptoData, 30000) // Auto refresh every 30s
    return () => clearInterval(interval)
  }, [currency])

  // Handle Search
  useEffect(() => {
    setFilteredCoins(
      coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, coins])

  // Sort Coins
  const handleSort = (key) => {
    setSortBy(key)
    setFilteredCoins([...filteredCoins].sort((a, b) => b[key] - a[key]))
  }

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(!darkMode)

  // Add to Favorites
  const toggleFavorite = (coin) => {
    let updatedFavorites
    if (favorites.some((fav) => fav.id === coin.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== coin.id)
    } else {
      updatedFavorites = [...favorites, coin]
    }
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  if (loading)
    return <div className="text-center text-xl mt-10">Loading...</div>
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      } min-h-screen w-full p-5`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-5">
          Crypto Price Tracker
        </h1>

        {/* Controls */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search for a coin..."
            className="w-full p-2 border rounded-md shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className={`ml-3 p-2 border rounded-md ${
              darkMode
                ? 'bg-gray-800 text-white border-gray-600'
                : 'bg-white text-black'
            }`}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="usd">USD ($)</option>
            <option value="inr">INR (₹)</option>
            <option value="eur">EUR (€)</option>
            <option value="gbp">GBP (£)</option>
          </select>
          <button
            onClick={toggleDarkMode}
            className="ml-3 p-2 bg-blue-500 text-white rounded-md flex items-center"
          >
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4 border">Fav</th>
                <th className="py-2 px-4 border">Coin</th>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort('current_price')}
                >
                  Price ({currency.toUpperCase()}) ⬆️
                </th>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort('price_change_percentage_24h')}
                >
                  24h Change ⬆️
                </th>
                <th
                  className="py-2 px-4 border cursor-pointer"
                  onClick={() => handleSort('market_cap')}
                >
                  Market Cap ⬆️
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <tr key={coin.id} className="text-center border">
                  <td className="py-2 px-4 border">
                    <button onClick={() => toggleFavorite(coin)}>
                      {favorites.some((fav) => fav.id === coin.id) ? '⭐' : '☆'}
                    </button>
                  </td>
                  <td className="py-2 px-4 border flex items-center space-x-2 justify-center">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <span className="font-semibold">
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td
                    className={`py-2 px-4 border ${
                      coin.price_change_percentage_24h < 0
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="py-2 px-4 border">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart */}
        {chartData && <Line data={chartData} className="mt-5" />}
      </div>
    </div>
  )
}

export default CryptoTracker
