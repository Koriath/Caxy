import React from "react";

import SaleItem from '../components/SaleItem.js';

export default class SalesList extends React.Component{

  constructor(props) {
      super(props);
    }

  render(){
    return (
      <div className="salesView">
        <div className="salesDisplay">
        { this.props.saleList.length ? this.props.saleList.map((sale,i) => <SaleItem sale={sale} key={i}/>) : <p> </p>}
        </div>
        <div className="totaldisplay">
          <p className="totalprice">Total: {this.props.totalPrice.toFixed(2)}€</p>
          <div className="saleButton" onClick={() => this.props.finalizeSale()}>VENDER</div>
        </div>
      </div>
    );
  }


}
