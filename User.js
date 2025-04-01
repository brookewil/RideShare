class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;

        this.rides = 0;
        this.rating = -1;
        this.funds = 0;

        this.location = null;
    }

    signup() {
        const date = new Date();
        console.log(`User ${this.username} signed up at ${date}`);
    }
}