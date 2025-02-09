import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [cryptodata, setCryptoData] = useState(null)

  // useEffect(() => {
  //   async function fetchData() {
  //     let response = await fetch(
  //       'https://api.coingecko.com/api/v3/coins/bitcoin'
  //     )
  //     let data = await response.json()
  //     console.log(data)
  //     setCryptoData(data.market_data.current_price.inr)
  //   }
  //   fetchData()
  // }, [])

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin')
        // res is already in json format 
        console.log(res)
        setCryptoData(res.data.market_data.current_price.inr)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <div>
      <h1 className="text-3xl text-center p-2 m-2 font-extrabold">
        Crypto Price Tracker
      </h1>
      <div className="text-2xl text-center font-semibold">
        Bitcoin price in INR : {cryptodata}
      </div>
    </div>
  )
}

export default App
