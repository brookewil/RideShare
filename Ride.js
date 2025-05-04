class Ride {
  constructor({
    riderId,
    riderName,
    pickupLocation,
    dropoffLocation,
    status = 'requested',
    createdAt = new Date(),
    isPlanned = false,
    rideTime ,
    driverId = null, // ID of the driver assigned to the ride
    driverName = null, // Name of the driver assigned to the ride
  }) {
    this.riderId = riderId;
    this.riderName = riderName;
    this.pickupLocation = pickupLocation; // { latitude, longitude }
    this.dropoffLocation = dropoffLocation; // { latitude, longitude }
    this.status = status;
    this.createdAt = createdAt; // Date the ride was created
    this.isPlanned = isPlanned; // true or false
    this.rideTime = rideTime instanceof Date ? rideTime : null; // string or null (planned time input by user)
    THIS.driverId = driverId; // ID of the driver assigned to the ride
    this.driverName = driverName; // Name of the driver assigned to the ride
  }
}

export default Ride;