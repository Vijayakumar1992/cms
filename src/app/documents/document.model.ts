export class Document {
    constructor(
        public documentid: string,
        public name: string,
        public description: string,
        public url: string,
        public children: Document[]
    ) {}
}