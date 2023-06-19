import React from "react";

import CategoryList from './panels/CategoryList.js';
import ProductGrid from './panels/ProductGrid.js';
import SalesList from './panels/SaleList.js';

export default class Sales extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      saleList: [],
      totalPrice : 0
    };
    this.sellProduct = this.sellProduct.bind(this);
  }

  sellProduct(p){
    //const newList = this.props.saleList;
    const newList = this.state.saleList;
    if(newList.includes(p)){newList[newList.indexOf(p)].amount ++;}
    else{p.amount = 1; newList.push(p);}
    this.setState({totalPrice : this.state.totalPrice+p.price});
    this.setState({saleList : newList});
    console.log("Pushing product: "+p.name);
    console.log("New Sales: "+this.state.saleList);
  };

  render(){
    return (
      <div className ="mainpanel">
        <CategoryList categories = {this.props.categories}/>
        <ProductGrid products = {this.props.products} saleList = {this.state.saleList} sellHandler={this.sellProduct}/>
        <SalesList saleList = {this.state.saleList} totalPrice={this.state.totalPrice}/>
      </div>
      );
  }


}
