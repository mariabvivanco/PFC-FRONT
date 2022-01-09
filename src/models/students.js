export class Students {
       
    name= '';
    country= ''
    city='';
    phoneNumber='';
    email='';
    presence=''
    transfer=false;
    skills=[[]];
    photo='';
    document=''

    

    constructor(name, country, city, phoneNumber, email,  presence,  transfer,  skills,  photo, document){
            this.name = name;
            this.country = country;
            this.city = city ;
            this.phoneNumber = phoneNumber;
            this.email = email;
            this.presence = presence;
            this.transfer = transfer;
            this.skills = skills;
            this.photo = photo;
            this.document = document;
        }

}