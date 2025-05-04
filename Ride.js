class Ride {
  constructor(pickupLocation, dropoffLocation, useruuid) {
    this.pickupLocation = pickupLocation; // { latitude, longitude }
    this.dropoffLocation = dropoffLocation; // { latitude, longitude }
    this.assignedDriveruuid = null;
    this.useruuid = useruuid;
    this.cost = 0;
    this.status = 'pending';
    this.distance = 0;
    this.duration = 0;
    this.driverlocation = null;
    this.pickupdistance = null;
    this.pickupduration = 0;
  }

  // 🔥 Convert to plain object for Firebase
  toFirestore() {
    return {
      pickupLocation: this.pickupLocation,
      dropoffLocation: this.dropoffLocation,
      assignedDriveruuid: this.assignedDriveruuid,
      useruuid: this.useruuid,
      cost: this.cost,
      status: this.status,
      distance: this.distance,
      duration: this.duration,
      driverlocation: this.driverlocation,
      pickupdistance: this.pickupdistance,
      pickupduration: this.pickupduration,
      timestamp: new Date().toISOString()
    };
  }
}

export default Ride;
