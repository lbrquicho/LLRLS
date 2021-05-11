const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Ordinance = mongoose.model('Ordinance');
mongoose.set('useFindAndModify', false);

module.exports.addOrdi = (req, res, next) => {
    var ordinance = new Ordinance();
    ordinance.oDate = req.body.oDate;
    ordinance.oTime = req.body.oTime;
    ordinance.oClassification = req.body.oClassification;
    ordinance.oSubRRClassification = req.body.oSubRRClassification;
    ordinance.ordinanceNo = req.body.ordinanceNo;
    ordinance.resolutionRefNo = req.body.resolutionRefNo;
    ordinance.isRevised = req.body.isRevised;
    ordinance.ordinanceRefNo = req.body.ordinanceRefNo;
    ordinance.sectionNo = req.body.sectionNo;
    ordinance.chapterNo = req.body.chapterNo;
    ordinance.isTagalog = req.body.isTagalog;
    ordinance.isPursuantTo = req.body.isPursuantTo;
    ordinance.pSection = req.body.pSection;
    ordinance.pParagraph = req.body.pParagraph;
    ordinance.pArticle = req.body.pArticle;
    ordinance.pChapter = req.body.pChapter;
    ordinance.pTitle = req.body.pTitle;
    ordinance.pBook = req.body.pBook;
    ordinance.resolutionDes = req.body.resolutionDes;
    ordinance.ordinanceDes = req.body.ordinanceDes;
    ordinance.approDes = req.body.approDes;
    ordinance.oSecretary = req.body.oSecretary;
    ordinance.oViceMayor = req.body.oViceMayor;
    ordinance.oMayor = req.body.oMayor;
    ordinance.presMem = req.body.presMem;
    ordinance.absMem = req.body.absMem;
    ordinance.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['error in ordinance form']);
            else
                return next(err);
        }

    });
}

module.exports.allOrdinance = (req, res, next) =>{
    Ordinance.find({})
    .then((ordinances) => res.send(ordinances))
    .catch((error) => console.log(error));
}

module.exports.deleteOrdinance = (req, res, next) =>{
    Ordinance.findByIdAndDelete({_id: req.params.ordinancesId })
    .then((ordinances) => res.send(ordinances))
    .catch((error) => console.log(error));
};

module.exports.updateOrdinance = (req, res, next) => {
    Ordinance.findOneAndUpdate({ '_id': req.params.ordinancesId }, { $set: req.body })
    .then((ordinances) => res.send(ordinances))
    .catch((error) => console.log(error));
}