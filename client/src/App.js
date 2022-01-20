import './App.css';
import{ useState } from "react";
import Axios from 'axios';

function App() {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const [inventoryList, setInventoryList] = useState([]);

  const addItem = () => {
    Axios.post("http://localhost:3001/create", {
      item: item,
      amount: amount,
      price: price
    }).then(() => {
      setInventoryList([...inventoryList, {
      item: item,
      amount: amount,
      price: price
    }])
    });
  };

  const getInventory = () => {
    Axios.get("http://localhost:3001/inventory").then((response) => {
      setInventoryList(response.data);
    });
  };

  return (
    <div className="App">
      <div className='info'>
        <label>Item:</label>
        <input type="text"
        onChange={(event) => {
          setItem(event.target.value);
          }}
        />
        <label>Amount: </label>
        <input type="number"
        onChange={(event) => {
          setAmount(event.target.value);
          }}
        />
        <label>Price:</label>
        <input type="number"
        onChange={(event) => {
          setPrice(event.target.value);
          }}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <hr size="80px" width="100%" />

      <div className='inventory'>
        <button onClick={getInventory}>Show Inventory</button>

        {inventoryList.map((val, key) => {
          return (
          <div class="entry">
            <ul>
              <li>
                <h3>Item: {val.prod_name}</h3>
              </li>
              <li>
                <h3>Amount: {val.amount} </h3>
              </li>
              <li>
                <h3>Price: ${val.price} </h3>
              </li>
            </ul>
          </div>)
        })}

      </div>
    </div>);
}

export default App;
