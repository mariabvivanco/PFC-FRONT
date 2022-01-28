export class Filter {
        
    country= ''
    city='';
    presence=''
    transfer=false;
    skills=[[]];

    constructor(country, city,  presence,  transfer,  skills){
        
        this.country = country;
        this.city = city ;
        this.presence = presence;
        this.transfer = transfer;
        this.skills = skills;
        this.document = document;
    }
    
}