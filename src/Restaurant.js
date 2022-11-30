import React from "react";

function Restaurant(props) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 p-3">
      <div className="card" style={{ margin: "auto", width: "256px" }}>
        <img
          src={props.info.imageUrl}
          className="card-img-top"
          style={{ width: "254px", height: "160px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.info.name}</h5>
          <h6 className="card-subtitle">{props.info.address}</h6>

          <div style={{ marginTop: "4%", color: "white" }}>
            <div
              style={{
                backgroundColor: props.info.rating > 4 ? "#48c479" : "#db7c38",
                display: "inline",
              }}
            >
              <i class="fa-solid fa-star"></i> {props.info.rating}
            </div>
            <span style={{ marginLeft: "60%", color: "grey" }}>
              {props.info.city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
