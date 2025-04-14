import User from './User.js';
import Car from './Car.js';

export class Driver extends User {
    constructor(email, password, birthday, phoneNumber, car) {
        super(email, password, birthday, phoneNumber);
        this.type = 'driver';
        this.cars = [car]; // initialize cars array properly
        this.approved = false;
    }
  

  approve() {
    const date = new Date();
    this.approved = true;
    console.log(`Driver ${this.username} approved on ${date}`);
  }

  remove() {
    const date = new Date();
    this.approved = false;
    console.log(`Driver ${this.username} removed on ${date}`);
  }

  addCar(car) {
    const date = new Date();
    this.cars.push(car);
    console.log(`Car added to ${this.username}'s account on ${date}`);
  }
}
export default Driver;
