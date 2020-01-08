import React from "react";
import loading from '../Assets/copper-loader.gif'


// Loading Page
const LoadingScreen = () => {
  return (
    <div className="container text-center">
      <div className="row row-center">
        <div className="col-xs-1 col-sm-1"></div>
          <div className="col-xs-10 col-sm-10" style={{ padding: "15%" }}>
            <img src={loading} />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen;