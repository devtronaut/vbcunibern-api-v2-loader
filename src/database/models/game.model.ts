import { model, Model, Schema } from 'mongoose';
import { loaderConfig } from '../../config/loader-config';

export interface IGame{
  id: string,
  date: Date,
  league: string,
  opponent: string,
  mode: string,
  gametype: string,
  location: string 
}

const gameSchema: Schema =  new Schema<IGame>({
  id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  league: {
    type: String,
    required: true
  },
  opponent: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  gametype: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }},
  { timestamps: true}
)

const gameModel: Model<IGame> = model<IGame>(loaderConfig.GAMES_COLLECTION, gameSchema, loaderConfig.GAMES_COLLECTION);

export {gameModel}