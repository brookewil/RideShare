import User from './User.js';
class Rider extends User {
    constructor(fullname, email, password, birthday, phoneNumber, profileImage) {
        super(fullname,email, password, birthday, phoneNumber, profileImage);
        this.type = 'rider';
      }
    }


export default Rider;
