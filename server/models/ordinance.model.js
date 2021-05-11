const mongoose = require('mongoose');

var ordinanceSchema = new mongoose.Schema({
    oDate:{
        type: String,
        required: 'Date can\'t be empty'
    },
    oTime:{
        type: String,
        required: 'Time can\'t be empty'
    },  
    oClassification:{
        type: String,
        required: 'Ordinance Classification can\'t be empty'
    },
    oSubRRClassification:{
        type: String
    },
    ordinanceNo:{
        type: String,
        required: 'Ordinance Number can\'t be empty'
    },
    resolutionRefNo:{
        type: String       
    },
    isRevised:{
        type: Boolean
    },
    ordinanceRefNo:{
        type: String
    },
    sectionNo:{
        type: String
    },
    chapterNo:{
        type: String
    },
    isTagalog:{
        type: Boolean
    },
    isPursuantTo:{
        type: Boolean
    },
    pSection:{
        type: String
    },
    pParagraph:{
        type: String
    },
    pArticle:{
        type: String
    },
    pChapter:{
        type: String
    },
    pTitle:{
        type: String
    },
    pBook:{
        type: String
    },
    resolutionDes:{
        type: String
    },
    ordinanceDes:{
        type: String,
        required: 'Description can\'t be empty'
    },
    approDes:{
        type: String
    },
    oSecretary:{
        type: String,
        required: 'Secretary can\'t be empty'
    },
    oViceMayor:{
        type: String,
        required: 'Vice Mayor can\'t be empty'
    },
    oMayor:{
        type: String,
        required: 'Mayor can\'t be empty'
    },
    presMem:[{
        memberName: '',
    memberPos:'',
      }],
      absMem:[{
        memberName: '',
    memberPos:'',
      }]
});

mongoose.model('Ordinance', ordinanceSchema, 'ordinance');