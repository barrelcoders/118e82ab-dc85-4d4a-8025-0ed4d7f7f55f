var express = require('express');
var router = express.Router();
var DAL = require('../lib/dal');
var utils = require('../lib/base/utils');
var dateTime = require('node-datetime');
var tableInviteStatus = {
    0: 'PENDING',
    1: 'ACCEPTED',
    2: 'REJECTED'
};

var tableStatus = {
    CREATED: 'CREATED',
    RUNNING: 'RUNNING',
    ENDED: 'ENDED'
}
router.post('/getAvailableSystemTables', function(req, res) {
    var table;
    if (req.body.potAmount && req.body.maxPlayers && req.body.userId) {
        DAL.db.system_tables.find(req.body.potAmount, tableStatus.CREATED, function(tables){
            if (!tables || tables.length === 0) {
                table = {
                    id: utils.guid(),
                    pot_amount: req.body.potAmount,
                    max_players: req.body.maxPlayers,
                    status: tableStatus.CREATED,
                    min_players:2,
                    date: dateTime.create().format('Y-m-d H:M:S')
                };
                DAL.db.system_tables.insert(table, function(result){
                    res.json({
                        'status': 'success',
                        data: table
                    });
                }, function(error){
                    res.json({
                        status: 'failed',
                        message: 'PROBLEM_FETCH_TABLE'
                    });
                });
            } else {
                table = tables[0];
                res.json({
                    'status': 'success',
                    data: table
                });
                /*DAL.db.system_tables.addPlayer(table.id, req.body.userId, function(result){
                    res.json({
                        'status': 'success',
                        data: table
                    });
                }, function(error){
                    res.json({
                        status: 'failed',
                        message: 'PROBLEM_FETCH_TABLE'
                    });
                });*/
            }
        }, function(error){
            res.json({
                status: 'failed',
                message: 'PROBLEM_FETCH_TABLE'
            });
        });
    }
});
router.post('/getSystemTable', function(req, res) {
    var table;
    if (req.body.id) {
        DAL.db.system_tables.findById(req.body.id, function(tables){
            if (!tables || tables.length === 0) {
                res.json({
                    status: 'failed',
                    message: 'PROBLEM_FETCH_TABLE'
                });
            } else {
                table = tables[0];
                res.json({
                    status: 'success',
                    data: table
                });
            }
        }, function(error){
            res.json({
                status: 'failed',
                message: 'PROBLEM_FETCH_TABLE'
            });
        });
    }
});
router.post('/saveChat', function(req, res) {
    if (req.body.message && req.body.date && req.body.table_id && req.body.user_id) {
        DAL.db.chats.addChatMessage(req.body.table_id, req.body.user_id, req.body.message, req.body.date, function(){
            res.json({
                    status: 'success',
            });
        }, function(error){
            res.json({
                status: 'failed',
                message: 'PROBLEM_ADDING_CHAT'
            });
        });
    }
});
router.post('/loadChats', function(req, res) {
    if (req.body.table_id) {
        DAL.db.chats.loadChats(req.body.table_id, function(chats){
            res.json({
                status: 'success',
                data: chats,
            });
        }, function(error){
            res.json({
                status: 'failed',
                message: 'PROBLEM_FETCHING_CHAT'
            });
        });
    }
});
router.post('/createCustomTable', function(req, res) {
    var table;
    if( req.body.name &&
        req.body.bootAmount &&
        req.body.minPlayers &&
        req.body.maxPlayers &&
        req.body.owner &&
        req.body.date){
        DAL.db.custom_tables.find(req.body.name, function(tables){
            if (!tables || tables.length === 0) {
                table = {
                    id: utils.guid(),
                    name: req.body.name,
                    boot_amount: req.body.bootAmount,
                    min_players: req.body.minPlayers,
                    max_players: req.body.maxPlayers,
                    owner: req.body.owner,
                    date: req.body.date,
                };
                DAL.db.custom_tables.insert(table, function(result){
                    res.json({
                        'status': 'success',
                        data: table
                    });
                }, function(error){
                    res.json({
                        status: 'failed',
                        message: 'PROBLEM_TABLE_CREATION'
                    });
                });
            } else {
                table = tables[0];
                res.json({
                    'status': 'failed',
                    data: table,
                    message: 'ALREADY_CREATED'
                });
            }
        }, function(err){
            res.json({
                status: 'failed',
                message: 'PROBLEM_TABLE_CREATION'
            });
        })
    } else {
        res.json({
            status: 'failed',
            message: 'VALIDATION_FAILED'
        });
    }
});
router.post('/getCustomTables', function(req, res) {
    if(req.body.owner){
        DAL.db.custom_tables.findAll(req.body.owner, function(tables){
            if (!tables || tables.length === 0) {
                res.json({
                    status: 'failed',
                    message: 'NO_TABLE_FOUND'
                });
            } else {
                res.json({
                    status: 'success',
                    data: tables
                });
            }
        }, function(err){
            res.json({
                status: 'failed',
                message: 'PROBLEM_FETCHING_TABLE'
            });
        })
    }
});
router.post('/getCustomTable', function(req, res) {
    if(req.body.id){
        DAL.db.custom_tables.findById(req.body.id, function(tables){
            if (!tables || tables.length === 0) {
                res.json({
                    status: 'failed',
                    message: 'NO_TABLE_FOUND'
                });
            } else {
                res.json({
                    status: 'success',
                    data: tables[0]
                });
            }
        }, function(err){
            res.json({
                status: 'failed',
                message: 'PROBLEM_FETCHING_TABLE'
            });
        })
    }
});
router.post('/loadGifts', function(req, res) {
    DAL.db.gifts.loadGifts(function(gifts){
            if (!gifts || gifts.length === 0) {
                res.json({
                    status: 'failed',
                    message: 'NO_GIFTS_FOUND'
                });
            } else {
                res.json({
                    status: 'success',
                    data: gifts
                });
            }
        }, function(err){
            res.json({
                status: 'failed',
                message: 'PROBLEM_FETCHING_GIFTS'
            });
        });
});
router.post('/loadInvities', function(req, res) {
    if (req.body.req_to) {
        DAL.db.custom_tables.loadInvites(req.body.req_to, function(invites){
            if (!invites || invites.length === 0) {
                res.json({
                    status: 'failed',
                    message: 'NO_INVITES_FOUND'
                });
            } else {
                res.json({
                    status: 'success',
                    data: invites
                });
            }
        }, function(err){
            res.json({
                status: 'failed',
                message: 'PROBLEM_FETCHING_INVITES'
            });
        });
    }

});
router.post('/sendPlayInvite', function(req, res) {
    var invite;
    if (req.body.req_from && req.body.req_to && req.body.table_id) {
        DAL.db.custom_tables.existingPlayInvite({
            req_from: req.body.req_from,
            req_to: req.body.req_to,
            table_id: req.body.table_id,
        }, function (invites) {
            if (!invites || invites.length === 0) {
                invite = {
                    req_from: req.body.req_from,
                    req_to: req.body.req_to,
                    table_id: req.body.table_id,
                    status: req.body.status
                };
                DAL.db.custom_tables.sendPlayInvite(invite, function (result) {
                    res.json({
                        status: 'success',
                    });
                }, function (err) {
                    res.json({
                        status: 'failed',
                        message: 'PROBLEM_SENDING_INVITE'
                    });
                });
            } else {
                res.json({
                    status: 'failed',
                    message: 'INVITE_ALREADY_EXISTS'
                });
            }
        }, function(err){
            res.json({
                status: 'failed',
                message: 'PROBLEM_SENDING_INVITE'
            });
        });
    }

});
router.post('/updateInviteStatus', function(req, res) {
    if (req.body.id && req.body.status) {
        DAL.db.custom_tables.updateInviteStatus(req.body.id, req.body.status, function(){
            res.json({
                status: 'success',
            });
        }, function(error){
            res.json({
                status: 'failed',
                message: 'PROBLEM_UPDATE_INVITE_STATUS'
            });
        });
    }
});
router.post('/deleteInvite', function(req, res) {
    if (req.body.id) {
        DAL.db.chats.deleteInvite(req.body.id, function(){
            res.json({
                status: 'success',
            });
        }, function(error){
            res.json({
                status: 'failed',
                message: 'PROBLEM_DELETE_INVITE'
            });
        });
    }
});
module.exports = router;