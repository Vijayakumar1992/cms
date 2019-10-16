export class Contact {    
    // we shoten this code to be efficient 
    constructor(
        public id: string,
        public name: string,       
        public email: string,
        public phone: string,
        public imageUrl: string,
        public group: Contact[]) { }
}