class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;

        this.rating = -1;
        this.rides = 0;
        this.funds = 0;
    }

    signup() {
        const date = new Date();
        console.log(`User ${this.username} signed up at ${date}`);
    }
}