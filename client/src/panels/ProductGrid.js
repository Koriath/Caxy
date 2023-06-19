import React from "react";

import ProductButton from '../components/ProductButton.js';

export default class ProductGrid extends React.Component{

  constructor(props) {
      super(props);
    }

  render(){

    return (
      <div className="productGrid">
        {this.props.products.map((p,i) => <ProductButton product={p} salesList={this.props.salesList} sellProduct={this.props.sellHandler} key={i}/> ) }
      </div>
    );
  }

}
