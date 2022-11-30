import Restaurant from "./Restaurant";
import React from "react";
function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:3080/restaurants")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="container">
      <h1
        style={{
          marginBottom: "20px",
          padding: "16px",
          borderBottom: "1px solid lightgrey",
        }}
      >
        {data.length} restaurants
      </h1>

      <div className="row">
        {data.map((item) => (
          <Restaurant key={item.id} info={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
