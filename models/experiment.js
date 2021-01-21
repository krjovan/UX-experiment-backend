const mongoose = require('mongoose');

//Tabela, odnosno atributi, tip podataka i ostale gluposti
const ExperimentSchema = mongoose.Schema({
    redosled: { type: Number, required: true },
    layoutTime1: { type: Number, default: 0, required: true },
    layoutTime2: { type: Number, default: 0, required: true }   
});



//OVO USER pod navodnicima je pod kojim ce se imenom ta tabela cuvat u bazi, plus eksoprtujemo sve
const Experiment = module.exports = mongoose.model('Experiment', ExperimentSchema);


//Krud operacije nad Tabelom pomocu biblioteke koju smo ucitali mongoose
module.exports.addExperiment = function (experiment, callback) {
    experiment.save(callback);
}

module.exports.saveExperiment = function (experiment, callback) {
    var query = {
        _id: experiment._id
    };
    Experiment.findOneAndUpdate(query, experiment, callback);
}

module.exports.getExperimentById = function (id, callback) {
    Experiment.findById(id, callback);
}

module.exports.getAllExperiments = function (callback) {
    Experiment.find({}, callback);
}

module.exports.removeExperiment = function (id, callback) {
    Experiment.findById(id, (err, experiment) => {
        experiment.remove(callback);
    });
}
