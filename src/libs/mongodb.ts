import { connect } from "mongoose";

const { MONGODB_URI } = process.env;

if ( !MONGODB_URI ) {
  throw new Error('MONGODB_URI env must be defined');
}

export const connectDB = async () => {
  try {
    const { connection } = await connect( MONGODB_URI );
    
    if ( connection.readyState  === 1 ) {
      console.log('MongoDB connected');
      return Promise.resolve(true);
    } 

  } catch (error) {
    console.log(error);
    return Promise.resolve(false);
  } 

};