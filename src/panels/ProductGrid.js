import React from "react";

import ProductButton from '../components/ProductButton.js';

export default class ProductGrid extends React.Component{

  constructor(props) {
      super(props);
    }

  render(){
    var buttons = [];
    this.props.products.map((p,i) => {
      if(this.props.currentCategory == 0 || this.props.currentCategory == p.category)
        {buttons.push(<ProductButton product={p} salesList={this.props.salesList} sellProduct={this.props.sellHandler} key={i}/>);}
    });
    return(
      <div className="productGrid">
        {buttons}
      </div>
    );
  }

}
