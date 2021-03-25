import React,{useState,useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Coin from './Coin';




function App(){
    const[coins,setCoins]=useState([]);
    const[search,setSearch]=useState('');


    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true')
        .then(res=>{
            setCoins(res.data);
            
            

        }).catch(error=>console.log(error));
    },[]);

    
    
    const handleChange=e=>{
        setSearch(e.target.value)
    }
    const filteredCoins=coins.filter(coin=>
        coin.name.toLowerCase().includes(search.toLowerCase()))
    
    return(
        <div className='coin-app'>
        <div className='coin-search'>
          <h1 className="coin-text">💸 Search a currency 💸</h1>
            <form>
                <input type="text" placeholder="Search                                                         💰" className="coin-input" onChange={handleChange}></input>
            </form>
        </div>
        <div className="heading">
            <p>Symbol</p>
            <p>Price</p>
            <p>Volume</p>
            <p>Percent Change</p>
            <p>Market Cap</p>

        </div>
        
        {filteredCoins.map(coin=>{
            let pt=coin.price_change_percentage_24h;
            console.log(coin.sparkline_in_7d['price']);
            return(
                <Coin key={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} marketcap={coin.market_cap} price={coin.current_price} priceChange={pt} volume={coin.total_volume}/>
            )
        })}
            
        </div>
        );
}
export default App;