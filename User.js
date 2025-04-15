// User.js
class User {
    constructor(email, password, birthday, phoneNumber) {
        this.username = email; // username and email are the same
        this.password = password;
        this.birthday = birthday;
        this.phoneNumber = phoneNumber;
        this.active = false;
        this.rides = 0;
        this.rating = -1;
        this.funds = 0;
        this.location = null;
      }

    setActive(activeStatus) {
        this.active = activeStatus;
    }

    signup() {
        const date = new Date();
        console.log(`User ${this.username} signed up at ${date}`);
    }
}

export default User;
