import React from "react";

import SaleItem from '../components/SaleItem.js';

export default class SalesList extends React.Component{

  constructor(props) {
      super(props);
    }

  render(){
    return (
      <div>
        { this.props.saleList.length ? this.props.saleList.map((sale,i) => <SaleItem sale={sale} key={i}/>) : <p> No sales. </p>}
        <p>Total: {this.props.totalPrice.toFixed(2)}€</p>
      </div>
    );
  }


}
