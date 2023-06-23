import React from "react";

import CategoryList from './panels/CategoryList.js';
import ProductGrid from './panels/ProductGrid.js';
import SalesList from './panels/SaleList.js';

export default class Sales extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      saleList: [],
      totalPrice : 0,
      category : 0
    };
    this.sellProduct = this.sellProduct.bind(this);
    this.finalizeSale = this.finalizeSale.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  sellProduct(p){
    //const newList = this.props.saleList;
    var newList = this.state.saleList;
    var newProduct = {name: "product", price: "0.00"};
    newProduct.name = p.name;
    newProduct.price = p.price;
    newProduct.amount = 1;
    var newproduct = true;
    newList.map((s) => {if(s.name === newProduct.name){s.amount ++;newproduct = false;}});
    if(newproduct){newList.push(newProduct);}
    this.setState({totalPrice : this.state.totalPrice+p.price});
    this.setState({saleList : newList});
    console.log("New Sales: "+this.state.saleList);
  };

  finalizeSale(){
    console.log("Finalizing Sale. Total: "+this.state.totalPrice+"€.");
    var saledata = {list : this.state.saleList, total : this.state.totalPrice};

    fetch('/sell', { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(saledata)})
    .then(data =>{
      this.state.saleList = [];
      this.setState({totalPrice : 0});
      this.setState({saleList : []});
      fetch('/stock', { method: 'GET'})
      .then(response => response.json())
      .then(data => {
        console.log(data.products);
        this.props.setProducts(data.products);
      });

    });

  }

  selectCategory(newCat){
    console.log("New Category: ",newCat);
    this.setState({category : newCat});
  }

  render(){
    return (
      <div className ="mainpanel">
        <CategoryList categories = {this.props.categories} currentCategory = {this.state.category} selectCategory={this.selectCategory}/>
        <ProductGrid products = {this.props.products} currentCategory = {this.state.category} saleList = {this.state.saleList} sellHandler={this.sellProduct}/>
        <SalesList saleList = {this.state.saleList} totalPrice={this.state.totalPrice} finalizeSale = {this.finalizeSale}/>
      </div>
      );
  }


}
