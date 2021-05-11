const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Resolution = mongoose.model('Resolution');
mongoose.set('useFindAndModify', false);

module.exports.addReso = (req, res, next) => {
    var resolution = new Resolution();
    resolution.rDate = req.body.rDate;
    resolution.rTime = req.body.rTime;
    resolution.resolutionNo = req.body.resolutionNo;
    resolution.rClassification = req.body.rClassification;
    resolution.rSubClassification = req.body.rSubClassification;
    resolution.isTagalog = req.body.isTagalog;
    resolution.isPursuantTo = req.body.isPursuantTo;
    resolution.pSection = req.body.pSection;
    resolution.pParagraph = req.body.pParagraph;
    resolution.pArticle = req.body.pArticle;
    resolution.pChapter = req.body.pChapter;
    resolution.pTitle = req.body.pTitle;
    resolution.pBook = req.body.pBook;
    resolution.presMem = req.body.presMem;
    resolution.absMem = req.body.absMem;
    resolution.resolutionDes = req.body.resolutionDes;
    resolution.approDes = req.body.approDes;
    resolution.rSecretary = req.body.rSecretary;
    resolution.rViceMayor = req.body.rViceMayor;
    resolution.rMayor = req.body.rMayor;
    resolution.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['error in resolution form']);
            else
                return next(err);
        }

    });
}

module.exports.allResolution = (req, res, next) =>{
    Resolution.find({})
    .then((resolutions) => res.send(resolutions))
    .catch((error) => console.log(error));
}

module.exports.deleteResolution = (req, res, next) =>{
    Resolution.findByIdAndDelete({_id: req.params.resolutionsId })
    .then((resolutions) => res.send(resolutions))
    .catch((error) => console.log(error));
};

module.exports.updateResolution = (req, res, next) => {
    Resolution.findOneAndUpdate({ '_id': req.params.resolutionsId }, { $set: req.body })
    .then((resolutions) => res.send(resolutions))
    .catch((error) => console.log(error));
}