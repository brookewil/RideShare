class Driver extends User {
    constructor() {
        this.approved = false;
        this.cars = [];
    }

    approve() {
        const date = new Date();
        this.approved = true;
        console.log(`Driver ${this.username} approved on ${date}`);
    }

    remove() {
        const date = new Date();
        this.approved = false;
        console.log(`Driver ${this.username} removed on ${date}`)
    }

    addCar(car) {
        const date = new Date();
        this.cars.push(car);
        console.log(`Car added to ${this.username}'s account ON ${date}`);
    }
}