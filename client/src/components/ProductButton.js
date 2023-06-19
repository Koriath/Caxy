import React from "react";

class ProductButton extends React.Component{

  constructor(props) {
      super(props);
    }

  render(){

    return (
      <div className="productCell" onClick={() => this.props.sellProduct(this.props.product)}>
        <div className="productInfo">

          <img className="productIcon" src= {`/icons/${this.props.product.icon}.png`} alt="icon"/>

          <p className="productnamedisplay"><strong>{this.props.product.name}</strong></p>
          <p className="productpricedisplay">{this.props.product.price.toFixed(2)} €</p>

        </div>
        <meter className='productmeter' min='0' low= {this.props.product.lowAlarm} max={this.props.product.maxAmount} value={this.props.product.amount}> stock</meter>

      </div>
    );
  }

}

export default ProductButton;
