export const INTERFACE_TYPE = {
    UserService: Symbol.for('IUserService'),
    UserRepository: Symbol.for('IUserRepository'),
    UserController: Symbol.for('UserController'),

    CategoryService: Symbol.for('ICategoryService'),
    CategoryRepository: Symbol.for('ICategoryRepository'),
    CategoryController: Symbol.for('CategoryController'),

    Token: Symbol.for('Token'),
    Hash: Symbol.for('Hash'),
    Email: Symbol.for('Email'),
    AuthHandler: Symbol.for('AuthHandler'),
}