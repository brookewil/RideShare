class Car {
    constructor(year, make, model, color, plate) {
        this.year = year;
        this.make = make;
        this.model = model;
        this.color = color;
        this.plate = plate;
    }

    getDetails() {
        return [this.year, this.make, this.model, this.color, this.plate];
    }

}
export default Car;