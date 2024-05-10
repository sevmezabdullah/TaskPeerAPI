

export const INTERFACE_TYPE = {
    UserService: Symbol.for('IUserService'),
    UserRepository: Symbol.for('IUserRepository'),
    UserController: Symbol.for('UserController'),

    CategoryService: Symbol.for('ICategoryService'),
    CategoryRepository: Symbol.for('ICategoryRepository'),
    CategoryController: Symbol.for('CategoryController'),



    TaskService: Symbol.for('ITaskService'),
    TaskRepository: Symbol.for('ITaskRepository'),
    TaskController: Symbol.for('TaskController'),

    Token: Symbol.for('Token'),
    Hash: Symbol.for('Hash'),
    Email: Symbol.for('Email'),
    AuthHandler: Symbol.for('AuthHandler'),
    FileUploader: Symbol.for('FileUploader'),
}