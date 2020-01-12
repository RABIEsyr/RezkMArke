

export class Product {
    constructor(
        public name: String,
        public price: Number,
        public category: String,
        public expireIn: Date,
        public imageUrl: String,
        public quantity: Number,
        public addedBy: String
        ) {}
}
