const config = {
   port: process.env.PORT || 3001,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://twwai:KTp5wYwutrLHPLT@cluster0.ooees.mongodb.net/IoT?retryWrites=true&w=majority',

  JwtSecret: process.env.JWT_SECRET || 'secret'
};

export default config;
