const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlResolution = require('../controllers/resolution.controller');
const ctrlOrdinance = require('../controllers/ordinance.controller');
const ctrlRevision = require('../controllers/revision.controller');
const multerController = require('../controllers/multer.controller');

const jwtHelper = require('../config/jwtHelper');


//users routes
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);

router.patch('/updateUserProfile/:usersId', ctrlUser.updateUserProfile);
router.patch('/updateUserProfileWithoutPassword/:userId', ctrlUser.updateUserProfileWithoutPassword);

router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/allUserProfile', ctrlUser.allUserProfile);

router.delete('/deleteUser/:usersId', ctrlUser.deleteUser);

//resolution routes
router.post('/addReso', ctrlResolution.addReso);
router.get('/allResolution', ctrlResolution.allResolution);
router.delete('/deleteResolution/:resolutionsId', ctrlResolution.deleteResolution);
router.patch('/updateResolution/:resolutionsId', ctrlResolution.updateResolution);

//ordinance routes
router.post('/addOrdi', ctrlOrdinance.addOrdi);
router.get('/allOrdinance', ctrlOrdinance.allOrdinance);
router.delete('/deleteOrdinance/:ordinancesId', ctrlOrdinance.deleteOrdinance);
router.patch('/updateOrdinance/:ordinancesId', ctrlOrdinance.updateOrdinance);

//revision routes
router.post('/addRevi', ctrlRevision.addRevi)

//pdfuploads routes
router.post('/uploadFiles', multerController.multerUploadFiles);
router.get('/getPDF/:filename', multerController.multerGetPDF);
router.delete('/deletePDF/:filename', multerController.multerDeletePDF);

module.exports = router;