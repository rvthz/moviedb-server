import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoConverter from '../service/mongoConverter';
import * as _ from "lodash";

const movieSchema = new mongoose.Schema({
    title: {type: String},
    image: {type: String},
    content: {type: String},
}, {
    collection: 'movie'
});
movieSchema.plugin(uniqueValidator);

const MovieModel = mongoose.model('post', movieSchema);

async function query() {
    const result = await MovieModel.find({});
    if (result) {
        return mongoConverter(result);
    }
}

async function get(id) {
    const result = await MovieModel.findOne({_id: id});
    if (result) {
        return mongoConverter(result);
    }
}

async function search(content) {
    const result = await MovieModel.find(content);
    if (result) {
        return mongoConverter(result);
    }
}

async function createNewOrUpdate(data) {
    if (!data.id) {
        const newMovie = new MovieModel(data);
        const result = await newMovie.save();
        return mongoConverter(result);
    } else {
        const result = await MovieModel.findByIdAndUpdate(data.id, _.omit(data, 'id'), {new: true});
        return mongoConverter(result);
    }
}

async function deleteMovie(id) {
    const result = await MovieModel.findByIdAndDelete(id);
    return mongoConverter(result);
}

export default {
    query,
    get,
    createNewOrUpdate,
    search,
    delete: deleteMovie, // zmiana nazwy funkcji delete na deleteMovie

    model: MovieModel
};
