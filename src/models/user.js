

export class User {
    
    email = '';
    password = '';
    name='';
    phone='';
    
    

    constructor(email, password, name, phone){
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }


}