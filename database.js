const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogify', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database is connected')
});

const authenticationSchema = mongoose.Schema({
    username: {type: String, unique: true, dropDups: true},
    password: {type: String}
});

const Authentication = mongoose.model('Authentication', authenticationSchema);

module.exports.Authentication = Authentication;