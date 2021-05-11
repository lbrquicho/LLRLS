const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
mongoose.set('useFindAndModify', false);

module.exports.register = (req, res, next) => {
    var user = new User();
    user.usertype = req.body.usertype;
    user.firstname = req.body.firstname;
    user.middlename = req.body.middlename;
    user.lastname = req.body.lastname;
    user.department = req.body.department;
    user.position = req.body.position;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.updateUserProfile = (req, res, next) => {
    const password = req.body.password;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            req.body.saltSecret = salt;
            User.findOneAndUpdate({ '_id': req.params.usersId }, 
            {   usertype: req.body.usertype, 
                firstname: req.body.firstname, 
                middlename: req.body.middlename, 
                lastname: req.body.lastname, 
                department: req.body.department, 
                position: req.body.position, 
                email: req.body.email,
                password: req.body.password})
                .then((users) => res.send(users))
                .catch((error) => console.log(error));
        });
    });
}

module.exports.updateUserProfileWithoutPassword = (req, res, next) => {
    //console.log("hello");
    User.findOneAndUpdate({'_id': req.body._id}, 
    {
        usertype: req.body.usertype,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        department: req.body.department,
        position: req.body.position,
        email: req.body.email})                
        .then((users) => res.send(users))
        .catch((error) => console.log(error));
}


module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,
                    ['usertype', 'firstname','middlename',
                    'lastname', 'department', 'position', 'email']) });
        }
    );
}

module.exports.allUserProfile = (req, res, next) =>{
    User.find({})
    .then((users) => res.send(users))
    .catch((error) => console.log(error));
}



module.exports.deleteUser = (req, res, next) =>{
    User.findByIdAndDelete({_id: req.params.usersId })
    .then((users) => res.send(users))
    .catch((error) => console.log(error));
};
