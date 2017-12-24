module.exports = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/todo-api',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000
}