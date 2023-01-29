import mongoose, { Connection } from "mongoose";

const getConnection = async (url: string): Promise<Connection> => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }

    const db = mongoose.connection;

    db.on('error', () => reject(new Error('Could not connect to the database.')));

    db.once('open', () => {
      console.log('Database is connected.');
      resolve(db);
    })
  })
}

export {getConnection}