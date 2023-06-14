/**
 * Part One The Vehicle Class
 * 
 */
//PAM: as per Oxford Dictionary: a thing used for transporting people or goods, especially on land, such as a car, truck, or cart.

class Vehicle{
    constructor(a,b,c){
        // PAM: add restraints ? wanna have a car from year 0? ok...
        this.make = a;
        this.model = b;
        this.year = c;
    };
    honk(){
        return 'Beep.'
    };
    toString(){
        const {make,model,year} = this;
        return `This vehicle is a ${year} ${make} ${model}.`
    };
};

let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
console.log(myFirstVehicle.honk()); // "Beep."
console.log(myFirstVehicle.toString()); // "The vehicle is a Honda Monster Truck from 1999."

/**
 * Part Two The Car Class
 * 
 */

class Car extends Vehicle{
    constructor(a,b,c){
        super(a,b,c);
        this.numWheels = 4;
    };

    toString(){
        const {make,model,year} = this;
        return `This car is a ${year} ${make} ${model}.`
    }
};

let myFirstCar = new Car("Toyota", "Corolla", 2005);
console.log(myFirstCar.toString());; // "The vehicle is a Toyota Corolla from 2005."
console.log(myFirstCar.honk());;     // "Beep."
console.log(myFirstCar.numWheels);;  // 4

/**
 * Part Three The Motorcycle Class
 *
 */

class Motorcycle extends Vehicle{
    constructor(a,b,c){
        super(a,b,c);
        this.numWheels = 2;
    };

    revEngine(){
        return 'VROOM!!!'
    };

    toString(){
        const {make,model,year} = this;
        return `This motorcycle is a ${year} ${make} ${model}`
    }

};

let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);
console.log(myFirstMotorcycle.toString()); // "The vehicle is a Honda Nighthawk from 2000."
console.log(myFirstMotorcycle.honk());     // "Beep."
console.log(myFirstMotorcycle.revEngine()); // "VROOM!!!"
console.log(myFirstMotorcycle.numWheels);  // 2

/**
 * Part Four The Garage Class
 */

class Garage{
    constructor(cap){
        this.vehicles = [];
        this.capacity = cap;
    };

    add(arg){
        if ( arg instanceof Vehicle ){
            const {vehicles, capacity} = this;
            if(vehicles.length !== capacity){
                vehicles.push(arg);
                return 'Vehicle Added To Garage!'
            } else {
                // throw new Error('Garage is full. Cannot add anymore vehicles to the garage: ', this)
                return 'Sorry, were full.'
            };
        } else {
            // throw new Error('That is not a valid Vehicle instance. Please input a valid Vehicle.')
            return 'Only vehicles are allowed in here!'
        };

    };
};

let garage = new Garage(2);

console.log(garage.vehicles); // []
console.log(garage.add(new Car("Hyundai", "Elantra", 2015))); // "Vehicle added!"
console.log(garage.vehicles); // [Car]
console.log(garage.add("Taco")); // "Only vehicles are allowed in here!"

console.log(garage.add(new Motorcycle("Honda", "Nighthawk", 2000))); // "Vehicle added!"
console.log(garage.vehicles); // [Car, Motorcycle]
console.log(garage.add(new Motorcycle("Honda", "Nighthawk", 2001))); // "Sorry, we're full."


