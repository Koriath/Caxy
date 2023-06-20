import React from "react";

class CategoryButton extends React.Component{

  super(){
    this.category = 0;
  }

  render(){
    if(this.props.category){
      this.category = this.props.category.id;
      return (
        <div>
          <p className="categoryButton">{this.props.category.name}</p>
        </div>
      );
    }
    else{
      return (
        <div>
          <p className="categoryButton">Todos</p>
        </div>
      );
    }

  }

}

export default CategoryButton;
