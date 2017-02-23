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
var dateTime = require('node-datetime');

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
                    avatar: 'character-1'
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
router.post('/getBonus', function(req, res) {
    var bonus, date, yesterday;
    if (req.body.user) {
        date = dateTime.create();
        DAL.db.bonus.find(req.body.user, date.format('Y-m-d'), function(todayResults){
            if (!todayResults || todayResults.length === 0) {
                date.offsetInDays(-1);
                yesterday = date;
                DAL.db.bonus.find(req.body.user, yesterday.format('Y-m-d'), function(yesterdayResults){
                    if (!yesterdayResults || yesterdayResults.length === 0) {
                        bonus = {
                            user: req.body.user,
                            bonus: 10000,
                        };
                        res.json({
                            'status': 'success',
                            data: bonus
                        });
                    } else {
                        bonus = yesterdayResults[0];
                        bonus.received = dateTime.create(bonus.received).format('Y-m-d H:M:S');
                        res.json({
                            'status': 'failed',
                            data: bonus,
                            message: 'ALREADY_CREDITED'
                        });
                    }
                }, function(err){
                    res.json({
                        status: 'failed',
                        message: 'PROBLEM_FETCHING_BONUS'
                    });
                });
            } else {
                bonus = todayResults[0];
                bonus.received = dateTime.create(bonus.received).format('Y-m-d H:M:S');
                res.json({
                    'status': 'failed',
                    data: bonus,
                    message: 'ALREADY_CREDITED'
                });
            }
        }, function(err){
            res.json({
                status: 'failed',
                message: 'PROBLEM_FETCHING_BONUS'
            });
        });
    } else {
        res.json({
            status: 'failed',
            message: 'PROBLEM_FETCHING_BONUS'
        });
    }
});
router.post('/creditBonus', function(req, res) {
    var bonus, date;
    if (req.body.user && req.body.bonus) {
        DAL.db.bonus.findByUser(req.body.user, function(results){
            if (!results || results.length === 0) {
                    bonus = {
                        amount: req.body.bonus,
                        received: dateTime.create().format('Y-m-d H:M:S'),
                        user: req.body.user
                    };
                    DAL.db.bonus.insert(bonus.user, bonus.received, bonus.amount, function(results){
                        res.json({
                            'status': 'success',
                            data: bonus
                        });
                    },
                    function(err){
                        res.json({
                            status: 'failed',
                            message: 'PROBLEM_CREDITING_BONUS'
                        });
                    });
            } else {
                bonus = {
                    amount: req.body.bonus,
                    received: dateTime.create().format('Y-m-d H:M:S'),
                    user: req.body.user
                };
                DAL.db.bonus.update(bonus.user, bonus.received, bonus.amount, function(results){
                        res.json({
                            'status': 'success',
                            data: bonus
                        });
                    },
                    function(err){
                        res.json({
                            status: 'failed',
                            message: 'PROBLEM_CREDITING_BONUS'
                        });
                    });
            }
        }, function(err){
            res.json({
                status: 'failed',
                message: 'PROBLEM_CREDITING_BONUS'
            });
        });
    } else {
        res.json({
            status: 'failed',
            message: 'PROBLEM_CREDITING_BONUS'
        });
    }
});

module.exports = router;