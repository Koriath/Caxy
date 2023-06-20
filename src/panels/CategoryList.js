import React from "react";

import CategoryButton from '../components/CategoryButton.js';

class CategoryList extends React.Component{

  render(){
    return (
      <div className= "categoryMenu">
        <CategoryButton />
        {this.props.categories.map((c,i) => <CategoryButton category={c} key={i}/>)}
      </div>
    );
  }

}

export default CategoryList;
