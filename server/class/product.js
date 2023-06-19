module.exports = class Product {

  constructor(id,name,category,amount,maxAmount,lowAlarm,price,icon){
    this.id = id;
    this.name = name;
    this.category = category;
    this.amount = amount;
    this.maxAmount = maxAmount;
    this.lowAlarm = lowAlarm;
    this.price = price;
    this.icon = icon;
 }

};
