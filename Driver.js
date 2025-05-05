import User from './User.js';
 import Car from './Car.js';

 export class Driver extends User {
  constructor(fullname, email, password, birthday, phoneNumber, car, profileImage) {
  super(fullname, email, password, birthday, phoneNumber, profileImage);
  this.type = 'driver';
  this.car = car; // Now a single car object
  }




  // Removed addCar method
 }
 export default Driver;