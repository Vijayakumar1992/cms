export class Contact {    
    // we shoten this code to be efficient 
    constructor(
        public contactId: string,
        public name: string,
        public phone: string,
        public email: string,
        public imageUrl: string,
        public group: Contact[]) { }
}