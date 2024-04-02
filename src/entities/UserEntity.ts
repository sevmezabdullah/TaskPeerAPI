export class User {
    constructor(
        public readonly _id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string,
        public readonly created_at: Date,
        public readonly updated_at: Date,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly avatar: string,
    ) { }
}