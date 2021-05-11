const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Revision = mongoose.model('Revision');
mongoose.set('useFindAndModify', false);

module.exports.addRevi = (req, res, next) => {
    var revision = new Revision();
    revision.oDate = req.body.oDate;
    revision.oTime = req.body.oTime;
    revision.oClassification = req.body.oClassification;
    revision.oSubRRClassification = req.body.oSubRRClassification;
    revision.ordinanceNo = req.body.ordinanceNo;
    revision.resolutionRefNo = req.body.resolutionRefNo;
    revision.isRevised = req.body.isRevised;
    revision.ordinanceRefNo = req.body.ordinanceRefNo;
    revision.sectionNo = req.body.sectionNo;
    revision.chapterNo = req.body.chapterNo;
    revision.isTagalog = req.body.isTagalog;
    revision.isPursuantTo = req.body.isPursuantTo;
    revision.pSection = req.body.pSection;
    revision.pParagraph = req.body.pParagraph;
    revision.pArticle = req.body.pArticle;
    revision.pChapter = req.body.pChapter;
    revision.pTitle = req.body.pTitle;
    revision.pBook = req.body.pBook;
    revision.resolutionDes = req.body.resolutionDes;
    revision.ordinanceDes = req.body.ordinanceDes;
    revision.approDes = req.body.approDes;
    revision.oSecretary = req.body.oSecretary;
    revision.oViceMayor = req.body.oViceMayor;
    revision.oMayor = req.body.oMayor;
    revision.presMem = req.body.presMem;
    revision.absMem = req.body.absMem;
    revision.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['error in revision form']);
            else
                return next(err);
        }

    });
}
