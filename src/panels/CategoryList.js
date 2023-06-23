import React from "react";

import CategoryButton from '../components/CategoryButton.js';

class CategoryList extends React.Component{

  render(){
    return (
      <div className= "categoryMenu">
        <CategoryButton selected = {this.props.currentCategory == 0} selectCategory={this.props.selectCategory}/>
        {this.props.categories.map((c,i) =>
          <CategoryButton selected = {this.props.currentCategory == c.id} selectCategory={this.props.selectCategory} category={c} key={i}/>)}
      </div>
    );
  }

}

export default CategoryList;
