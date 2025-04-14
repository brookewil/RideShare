import User from './User.js';
class Rider extends User {
    constructor(email, password, birthday, phoneNumber) {
        super(email, password, birthday, phoneNumber);
        this.type = 'rider';
      }
    }


export default Rider;
