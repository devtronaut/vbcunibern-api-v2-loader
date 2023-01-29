import mongoose from 'mongoose';

const getConnection = async (url: string, dbName: string, user: string, pass: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, {
      dbName,
      user,
      pass
    }).then(db => {
      console.log(`Successfully connected to database: ${db.connection.db.databaseName}`);
      resolve();
    }).catch(err => {
      console.log(`Failure during connection attempt: ${err}`);
      reject();
    })
  })
}

export {getConnection}