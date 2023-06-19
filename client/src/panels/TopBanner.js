import React from "react";

class TopBanner extends React.Component{

  showManagerLogin(){}
  showAdminLogin(){}

  render(){
    return (
      <div className="toppanel">

        <div className="logoArea">
          <img className="logoicon" src="/logo.png" alt="icon"/>
          <h1>Caxy</h1>
        </div>

        <div className="adminlinks">
          <h1 onClick={this.showManagerLogin}>Manager</h1>
          <h1 onClick={this.showAdminLogin}>Admin</h1>
        </div>

      </div>
    );
  }

}

export default TopBanner;
