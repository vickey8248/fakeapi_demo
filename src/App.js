import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // (() => {
    //   setLoader(true);
    //   axios
    //     .get("https://faketoreapi.com/products")
    //     .then((response) => {
    //       console.log(response);
    //       setProducts(response.data);
    //       setLoader(false);
    //     })
    //     .catch((err) => {
    //       setLoader(false);
    //     });
    // })();
    (async () => {
      setLoader(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response);
        setProducts(response.data);
        setLoader(false);
      } catch (err) {
        setLoader(false);
      }
    })();
  }, []);
  return (
    <div>
      <h1>List</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "22% 22% 22% 22%",
          // height: "250px",
          placeContent: "space-evenly",
          rowGap: "8px",
        }}
      >
        {loader && <h1>Loading.........</h1>}
        {products.length === 0 && loader === false && <h1>Error</h1>}
        {products &&
          loader === false &&
          products.map((item) => (
            <div
              key={item?.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "6px",
                border: "1px solid",
                borderRadius: "10px",
              }}
            >
              <p>{item?.title}</p>
              <img
                src={item?.image}
                alt={item?.name}
                style={{
                  height: "250px",
                  objectFit: "contain",
                }}
              ></img>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  // padding: "10px",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <h3>Price</h3>
                <h2>RS.{item?.price}</h2>
              </div>
              <button>Buy Now</button>
              <button>Add to Cart</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
