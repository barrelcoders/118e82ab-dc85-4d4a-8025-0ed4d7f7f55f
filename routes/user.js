var express = require('express');
var router = express.Router();
var utils = require('../lib/base/utils');
var DAL = require('../lib/dal');
var multer = require('multer');
var updatedFileName = "";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './avatars/')
    },
    filename: function (req, file, cb) {
        updatedFileName = Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        cb(null, updatedFileName);
    }
});
var upload = multer({ storage: storage }).single('file');

router.post('/uploadAvatar', function(req, res) {
    upload(req,res,function(err){
        if(err){
            res.json({
                status: 'failed',
                message: 'PROBLEM_CHANGING_AVATAR'
            });
        }
        res.json({
            'status': 'success',
            'filename': updatedFileName
        });
    });
});
router.post('/updateAvatar', function(req, res) {
    if (req.body.id && req.body.avatar) {
        DAL.db.users.updateAvatar(req.body.id, req.body.avatar, function(result){
            res.json({
                'status': 'success',
                data: {avatar: req.body.avatar}
            });
        }, function(error){
            res.json({
                status: 'failed',
                message: 'PROBLEM_CHANGING_AVATAR'
            });
        });
    } else {
        res.json({
            status: 'failed',
            message: 'PROBLEM_CHANGING_AVATAR'
        });
    }
});
router.post('/updateDisplayName', function(req, res) {
    if (req.body.id && req.body.displayName) {
        DAL.db.users.updateDisplayName(req.body.id, req.body.displayName, function(result){
            res.json({
                'status': 'success',
                data: {displayName: req.body.displayName}
            });
        }, function(error){
            res.json({
                status: 'failed',
                message: 'PROBLEM_CHANGING_DISPLAY_NAME'
            });
        });
    } else {
        res.json({
            status: 'failed',
            message: 'PROBLEM_CHANGING_DISPLAY_NAME'
        });
    }
});
router.post('/updateBalance', function(req, res) {
    if (req.body.id && req.body.chips) {
        DAL.db.users.updateBalance(req.body.chips, req.body.id, function () {
            res.json({
                'status': 'success',
                data: {chips: req.body.chips}
            });
        }, function(){
            res.json({
                status: 'failed',
                message: 'PROBLEM_UPDATING_BALANCE'
            });
        });
    } else {
        res.json({
            status: 'failed',
            message: 'PROBLEM_UPDATING_BALANCE'
        });
    }
});
router.post('/signup', function(req, res) {
    var user;
    if (req.body.name && req.body.email && req.body.password) {
        DAL.db.users.find(req.body.email, function(users){
			if (!users || users.length === 0) {
                user = {
                    id: utils.guid(),
                    displayName: req.body.name,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    chips: 2500000,
                    avatar: 'background: url(images/default_avatar.jpg);'
                };
                DAL.db.users.insert(user, function(result){
					res.json({
						'status': 'success',
						data: user
					});
				}, function(error){
					res.json({
						status: 'failed',
                        message: 'PROBLEM_SIGNUP'
					});
				});
            } else {
                user = users[0];
				res.json({
					'status': 'failed',
					data: user,
                    message: 'ALREADY_REGISTERED'
				});
            }
        }, function(err){
			res.json({
				status: 'failed',
                message: 'PROBLEM_SIGNUP'
			});
		})
    } else {
        res.json({
            status: 'failed',
            message: 'VALIDATION_FAILED'
        });
    }


});
router.post('/signin', function(req, res) {
    var user;
    if (req.body.email && req.body.password) {
        DAL.db.users.find(req.body.email, function(users){
            if (!users || users.length === 0) {
                res.json({
                    status: 'failed',
                    message: 'USER_NOT_FOUND',
                });
            } else {
                user = users[0];
                res.json({
                    'status': 'success',
                    data: user,
                });
            }
        }, function(error){
            res.json({
                status: 'failed',
                message: 'PROBLEM_SIGNIN'
            });
        });
    } else {
        res.json({
            status: 'failed',
            message: 'VALIDATION_FAILED'
        });
    }
});
router.post('/fbsignin', function(req, res) {
    var user;
    if (req.body.name && req.body.email && req.body.picture) {
        DAL.db.users.find(req.body.email, function(users){
            if (!users || users.length === 0) {
                user = {
                    id: utils.guid(),
                    displayName: req.body.name,
                    name: req.body.name,
                    email: req.body.email,
                    password: '',
                    chips: 2500000,
                    avatar: 'background: url('+req.body.picture+');'
                };
                DAL.db.users.insert(user, function(result){
                    res.json({
                        'status': 'success',
                        data: user
                    });
                }, function(error){
                    res.json({
                        status: 'failed',
                        message: 'PROBLEM_SIGNUP'
                    });
                });
            } else {
                user = users[0];
                res.json({
                    'status': 'failed',
                    data: user,
                    message: 'ALREADY_REGISTERED'
                });
            }
        }, function(err){
            res.json({
                status: 'failed',
                message: 'PROBLEM_SIGNUP'
            });
        })
    }
});
router.post('/get', function(req, res) {
    var user;
    if (req.body.userName) {
        DAL.db.users.find(req.body.userName, function(users){
			if (!users || users.length === 0) {
                res.json({
                    status: 'failed'
                });
            } else {
                user = users[0];
            }
            res.json({
                'status': 'success',
                data: user
            });
		}, function(error){
			console.log(error.message);
		});
    } else {
        res.json({
            status: 'failed'
        });
    }
});

module.exports = router;