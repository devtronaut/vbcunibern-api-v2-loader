import mongoose from 'mongoose';

let dbConnection: mongoose.Connection | null = null;

const getConnection = async (url: string, dbName: string, user: string, pass: string): Promise<mongoose.Connection> => {
  return new Promise((resolve, reject) => {
    // Resolve with existing connection if possible
    if(dbConnection !== null){
      console.log(`Using existing connection to mongo database: ${dbConnection.db.databaseName}`);
      resolve(dbConnection);
    }

    // Set the credentials for the connection and the database name
    const mongoConOptions: mongoose.ConnectOptions = {
      dbName,
      user,
      pass
    }
    
    mongoose.set('strictQuery', true);
    mongoose.connect(url, mongoConOptions)
    .then(db => {
      dbConnection = db.connection;
      console.log(`Successfully connected to mongo database: ${dbConnection.db.databaseName}`);

      // Register listener for errors after the initial connection
      dbConnection.on('error', err => {
        console.log('Error with mongo database:' + err);
      })
      
      // Register listener for disconnects from the database
      dbConnection.on('disconnected', () => {
        console.log('Disconnected from mongo database.');
      })

      resolve(dbConnection);
    }).catch(err => {
      // Log errors during the initial connection attempt
      console.log(`Failure during initial connection attempt: ${err}`);
      reject();
    })
  })
}

export {getConnection}