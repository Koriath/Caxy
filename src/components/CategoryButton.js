import React from "react";

class CategoryButton extends React.Component{

  super(){
    this.category = 0;
  }

  render(){
    console.log("Selected? ",this.props.selected);
    if(this.props == undefined){return;}
    if(this.props.category){
      this.category = this.props.category.id;
      return (
        <div onClick={ () => {this.props.selectCategory(this.category);}}>
          <p className=  {(this.props.selected? "categoryButtonSelected" : "categoryButton")}>{this.props.category.name}</p>
        </div>
      );
    }
    else{
      return (
        <div onClick={ () => {this.props.selectCategory(0);}}>
          <p className={(this.props.selected ? "categoryButtonSelected" : "categoryButton")}>Todos</p>
        </div>
      );
    }

  }

}

export default CategoryButton;
