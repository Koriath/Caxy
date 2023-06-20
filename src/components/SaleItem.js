import React from "react";

class SaleItem extends React.Component{

  render(){

    return (
      //<div class="saleItem" onClick="()">
      <div className="saleItem">
        <p className="productnamedisplay"><strong>{this.props.sale.name}</strong></p>
        <p className="productnamedisplay"><em>x{this.props.sale.amount}</em></p>
        <p className="productpricedisplay">{this.props.sale.price.toFixed(2)} €</p>
      </div>
    );
  }

}

export default SaleItem;
