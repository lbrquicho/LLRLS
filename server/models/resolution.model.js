const mongoose = require('mongoose');

var resolutionSchema = new mongoose.Schema({
    rDate:{
        type: String,
        required: 'Date can\'t be empty'
    },
    rTime:{
        type: String,
        required: 'Time can\'t be empty'
    },  
    resolutionNo:{
        type: String,
        required: 'Resolution Year and Number can\'t be empty'
    },
    rClassification:{
        type: String,
        required: 'Resolution Classification can\'t be empty'
    },
    rSubClassification:{
        type: String,
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
    presMem:[{
        memberName: '',
    memberPos:'',
      }],
      absMem:[{
        memberName: '',
    memberPos:'',
      }],
    resolutionDes:{
        type: String,
        required: 'Description can\'t be empty'
    },
    approDes:{
        type: String
    },
    rSecretary:{
        type: String,
        required: 'Secretary can\'t be empty'
    },
    rViceMayor:{
        type: String,
        required: 'Vice Mayor can\'t be empty'
    },
    rMayor:{
        type: String,
        required: 'Mayor can\'t be empty'
    }
});

mongoose.model('Resolution', resolutionSchema);