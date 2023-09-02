import { Schema, model } from 'mongoose';

// TODO: Creando el Schema para la base de datos
const UserSchema = new Schema({
  usuario: { type: String, unique: true },
  contrasena: String
}, { timestamps: true });

// TODO:

const UserModel = model('User', UserSchema);

export default UserModel;
