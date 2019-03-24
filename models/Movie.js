const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [25, '`{PATH}` alanı (`{VALUE}`) {MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [1, '`{PATH}` alanı (`{VALUE}`) {MINLENGTH} karakterden büyük olmalıdır.']
    },
    category: String,
    country: String,
    year: {
        type: Number,
        max: 2020,
        min: 1900
    },
    imdbScore: Number,
    directorId: Schema.Types.ObjectId,
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);