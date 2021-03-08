const mongoose = require('mongoose');

var signup = mongoose.model('signup',{
    name : {type:String},
    username :{type: String,validate: {
        validator: async function(username) {
          const user = await this.constructor.findOne({ username });
          if(user) {
            if(this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: props => 'The specified username is already in use.'
      },
      required: [true, 'Username required']},
    email : {type: String,validate: {
        validator: async function(email) {
          const user = await this.constructor.findOne({ email });
          if(user) {
            if(this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: props => 'The specified email address is already in use.'
      },
      required: [true, 'User email required']},
    password : {type: String},

});

module.exports = {signup};