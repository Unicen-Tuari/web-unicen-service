var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var infoSchema = new Schema({
	group: String,
	thingtype: String,
	thing:   Schema.Types.Mixed,
	dateAdded : { type: Date, default: Date.now },
})

// export 'Person' model so we can interact with it in other files
module.exports = mongoose.model('Information',infoSchema);
