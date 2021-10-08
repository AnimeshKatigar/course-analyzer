const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Tag
const TagSchema = new Schema({
	tag: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	description: {
		type: String,
		trim: true,
		default: ''
	},
	website: {
		type: String,
		trim: true,
		default: ''
	},
	logoLink:{
		type:String,
		trim: true,
		default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN0N867ke9E5FCPCNHa4UwZaV6ZN2m9ONHeA&usqp=CAU'
	}
});

const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;
