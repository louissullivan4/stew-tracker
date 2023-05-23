import React from 'react';
import { useState } from 'react';
import configdata from '../config.json';

import './SearchBar.css'; 

const SearchBar = () => {
    const backendUrl = configdata.DEV.SERVER_URL
    const [keyword, setKeyword] = useState("");
    const [foodList, setFoodList] = useState([]);

    const handleSearch = async() => {
      if (keyword !== "") {
        const response = await fetch(`${backendUrl}/foodlike/${keyword}`);
        const data = await response.json();
        setFoodList(data);
      }
    }
    
    const BarStyle = {width:"20rem",background:"#F0F0F0", border:"none", padding:"0.5rem", margin:"1rem auto", borderRadius:"10px", "marginTop":"3rem"};
    const ButtonStyle = {background:"#F0F0F0", border:"none", padding:"0.5rem", margin:"1rem auto", borderRadius:"10px", cursor:"pointer", margin:"0.5rem"}
    return (
      <div>
        <input 
        style={BarStyle}
        key="search-bar"
        value={keyword}
        placeholder={"Search food..."}
        onChange={(e) => {setKeyword(e.target.value)}}
        />
        <button style={ButtonStyle} onClick={() => {handleSearch()}}>Enter</button>
        <table>
        <th>Food</th>
        <th>Calories per 100 g/ml</th>
          {foodList.map((food) => {
            return (
              <tr>
                <td>{food.name}</td>
                <td>{food.calories}</td>
              </tr>
            )
          })}
        </table>
      </div>
    );
  }
  
  export default SearchBar;