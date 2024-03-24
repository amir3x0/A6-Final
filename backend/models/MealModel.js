const mongoose = require('mongoose');

const { Schema } = mongoose;

const mealSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    recipes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: [] }],
    username: {
        type: String,
        required: true,
        ref: 'User',
    },
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
