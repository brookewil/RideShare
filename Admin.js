export class Admin {
    constructor(email, password, phoneNumber) {
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.createdAt = new Date();
    }

   
}

export default Admin;
