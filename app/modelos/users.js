const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');  //cifrado de claves

const userSchema = new mongoose.Schema({
  local: {
    userid: String,
    password: String
  }
});

// " MEtodo que Recibe clave usuario y retorna el cifrado de la clave"
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// "Valida la contraseña del usuario"
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// Declaracion del modelo de bd
module.exports = mongoose.model('User', userSchema);