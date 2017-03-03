var io = require('socket.io');
var _ = require('underscore');
var deck = require('./deck');
var DAL = require('./dal');
var tables = require('./tabledecks');


function Io() {
    return {
        init: function(server) {
            var objServ = io.listen(server);
            var table;
            objServ.sockets.on('connection', function(client) {
                client.on('createTable', function(args) {
                    table = tables.createNewTable(args);
                    client.emit('connectionSuccess', { id: client.id, tableId: table.gid });
                });
                client.on('joinTable', function(args) {
                    table = tables.getTable(args.tableId);
                    if(!table.playerExistsInTable(args.player.clientId)){
                        var addedPlayer = table.addPlayer({
                            id: client.id,
                            cardSet: {
                                closed: true
                            },
                            playerInfo: args.player
                        }, client);
                        if(table.type == "SYSTEM"){
                            DAL.db.table_players.addSystemTablePlayer(table.gid, addedPlayer.playerInfo.id,
                                function(result) {
                                    console.log('user added to system table success');
                                }, function(err) {
                                    console.log(err.message);
                                });
                        }
                        else if(table.type == "CUSTOM"){
                            DAL.db.table_players.addCustomTablePlayer(table.gid, addedPlayer.playerInfo.id,
                                function(result) {
                                    console.log('user added to custom table success');
                                }, function(err) {
                                    console.log(err.message);
                                });
                        }
                        console.log('now player count is:' + table.getActivePlayers());
                        if (addedPlayer !== false) {
                            var newPlayer = {
                                id: args.player.clientId,
                                tableId: table.gid,
                                slot: addedPlayer.slot,
                                active: addedPlayer.active,
                                packed: addedPlayer.packed,
                                playerInfo: args.player,
                                cardSet: addedPlayer.cardSet,
                                otherPlayers: table.getPlayers()
                            };
                            client.emit('tableJoined', {player: newPlayer, tableId: args.tableId});
                            client.broadcast.emit('newPlayerJoined', {player: newPlayer, tableId: args.tableId});
                            startNewGameOnPlayerJoin(table.gid);
                        }
                    }
                });
                client.on('seeMyCards', function(args) {
                    table = tables.getTable(args.tableId);
                    var cardsInfo = table.getCardInfo()[args.player.id].cards;
                    table.updateSideShow(args.player.id);
                    client.emit('cardsSeen', {
                        cardsInfo: cardsInfo,
                        players: table.getPlayers(),
                        tableId: table.gid,
                    });
                    client.broadcast.emit('playerCardSeen', {
                        id: args.player.id,
                        players: table.getPlayers(),
                        tableId: table.gid,
                    });
                });
                client.on('placePack', function(args) {
                    table = tables.getTable(args.tableId);
                    var players = table.packPlayer(args.player.id);
                    if (table.getActivePlayers() === 1) {
                        table.decideWinner();
                        client.emit('showWinner', {
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            packed: true,
                            tableId: table.gid
                        });
                        client.broadcast.emit('showWinner', {
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            packed: true,
                            tableId: table.gid
                        });
                        table.stopGame();
                        startNewGame(table.gid);

                    } else {
                        client.emit('playerPacked', {
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            tableId: table.gid,
                        });
                        client.broadcast.emit('playerPacked', {
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            tableId: table.gid,
                        });
                    }
                });
                client.on('placeBet', function(args) {
                    table = tables.getTable(args.tableId);
                    var players = table.placeBet(args.player.id, args.bet.amount, args.bet.blind, args.player.playerInfo._id);
                    if (args.bet.show || table.isPotLimitExceeded()) {
                        args.bet.show = true;
                        var msg = table.decideWinner(args.bet.show);
                        client.emit('showWinner', {
                            tableId: table.gid,
                            message: msg,
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            potLimitExceeded: table.isPotLimitExceeded()
                        });
                        client.broadcast.emit('showWinner', {
                            tableId: table.gid,
                            message: msg,
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            potLimitExceeded: table.isPotLimitExceeded()
                        });
                        table.stopGame();
                        startNewGame(table.gid);
                    } else {
                        client.emit('betPlaced', {
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            tableId: table.gid,
                        });
                        client.broadcast.emit('betPlaced', {
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            tableId: table.gid,
                        });
                    }
                });
                client.on('respondSideShow', function(args) {
                    table = tables.getTable(args.tableId);
                    var players = table.getPlayers(),
                        msg = "";
                    table.resetSideShowTurn();
                    if (args.lastAction === "Denied") {
                        table.setNextPlayerTurn();
                        table.sideShowDenied(args.player.id);
                        msg = [args.player.playerInfo.userName, ' has denied side show'].join('');
                        client.emit('sideShowResponded', {
                            message: msg,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            tableId: table.gid,
                        });
                        client.broadcast.emit('sideShowResponded', {
                            message: msg,
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            tableId: table.gid,
                        });

                    } else if (args.lastAction === "Accepted") {
                        table.setNextPlayerTurn();
                        msg = table.sideShowAccepted(args.player.id);
                        client.emit('sideShowResponded', {
                            message: msg.message,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            tableId: table.gid,
                        });
                        client.broadcast.emit('sideShowResponded', {
                            message: msg.message,
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            tableId: table.gid,
                        });
                    }
                });
                client.on('placeSideShow', function(args) {
                    table = tables.getTable(args.tableId);
                    var sideShowMessage = table.placeSideShow(args.player.id, args.bet.amount, args.bet.blind, args.player.playerInfo._id);
                    var players = table.getPlayers();
                    if (table.isPotLimitExceeded()) {
                        args.bet.show = true;
                        var msg = table.decideWinner(args.bet.show);
                        client.emit('showWinner', {
                            message: msg,
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            potLimitExceeded: table.isPotLimitExceeded(),
                            tableId: table.gid,
                        });
                        client.broadcast.emit('showWinner', {
                            message: msg,
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            potLimitExceeded: table.isPotLimitExceeded(),
                            tableId: table.gid,
                        });
                        table.stopGame();
                        startNewGame(table.gid);
                    } else {
                        client.emit('sideShowPlaced', {
                            message: sideShowMessage,
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            tableId: table.gid,

                        });
                        client.broadcast.emit('sideShowPlaced', {
                            message: sideShowMessage,
                            bet: args.bet,
                            placedBy: args.player.id,
                            players: players,
                            table: table.getTableInfo(),
                            tableId: table.gid,
                        });
                    }
                });
                client.on('removePlayer', function(args) {
                    table = tables.getTable(args.tableId);
                    if(table ){
                        if (table.gameStarted && table.isActivePlayer(args.id))
                            table.packPlayer(args.id);

                        var removedPlayer = table.removePlayer(args.id);
                        if(removedPlayer) {
                            console.log('removed player ' + args.playerInfo.displayName + ' from table');
                            console.log('total players left:' + table.getActivePlayers());
                            client.broadcast.emit('playerLeft', {
                                bet: {
                                    lastAction: "Packed",
                                    lastBet: ""
                                },
                                removedPlayer: removedPlayer,
                                placedBy: removedPlayer.id,
                                players: table.getPlayers(),
                                table: table.getTableInfo(),
                                tableId: table.gid,
                            });
                            DAL.db.table_players.removePlayer(table.gid, args.playerInfo.id,
                                function (result) {
                                    console.log('removed player from table success');
                                }, function (err) {
                                    console.log(err.message);
                                });
                            if (table.getActivePlayers() == 1 && table.gameStarted) {
                                table.decideWinner();
                                client.emit('showWinner', {
                                    bet: {
                                        lastAction: "Packed",
                                        lastBet: ""
                                    },
                                    placedBy: removedPlayer.id,
                                    players: table.getPlayers(),
                                    table: table.getTableInfo(),
                                    packed: true,
                                    lastPlayerGameEnded: true,
                                    tableId: table.gid,
                                    playerId: table.getRemainingPlayerId()
                                });
                                client.broadcast.emit('showWinner', {
                                    bet: {
                                        lastAction: "Packed",
                                        lastBet: ""
                                    },
                                    placedBy: removedPlayer.id,
                                    players: table.getPlayers(),
                                    table: table.getTableInfo(),
                                    packed: true,
                                    lastPlayerGameEnded: true,
                                    tableId: table.gid,
                                    playerId: table.getRemainingPlayerId()
                                });

                                table.stopGame();
                                //TODO : Restart game when only one player left.
                                startNewGame(table.gid);
                            }
                            if (table.getActivePlayers() == 0 && !table.gameStarted) {
                                if(table.type == "SYSTEM"){
                                    DAL.db.system_tables.removeTable(table.gid,
                                        function (result) {
                                            console.log('table removed success');
                                        }, function (err) {
                                            console.log(err.message);
                                        });
                                }
                            }
                        }
                    }
                });
                client.on('gameEndConfirmed', function(args) {
                    table = tables.getTable(args.table);
                    if(table){
                        DAL.db.table_players.removePlayer(table.gid, args.player,
                            function (result) {
                                table = tables.getTable(args.table);
                                if(table && table.type == 'SYSTEM'){
                                    DAL.db.system_tables.removeTable(args.table,
                                        function (result) {
                                            console.log('table removed success');
                                        }, function (err) {
                                            console.log(err.message);
                                        });
                                }
                            }, function (err) {
                                console.log(err.message);
                            });
                    }
                });
                client.on('newChatMessageAdded', function(args) {
                    client.emit('showChatMessage', args);
                    client.broadcast.emit('showChatMessage', args);
                });
                client.on('sendGift', function(args){
                    console.log('sendGift called');
                    client.emit('sendGiftSuccess', args);
                    client.broadcast.emit('sendGiftSuccess', args);
                });
                client.on('updatePlayerOnServer', function(args) {
                    table = tables.getTable(args.tableId);
                    if(table){
                        var player = table.getPlayerById(args.playerId);
                        player.playerInfo[args.field] = args.value;
                        client.emit('updatePlayerOnServerSuccess', args);
                        client.broadcast.emit('updatePlayerOnServerSuccess', args);
                    }
                });
                client.on('disconnect', function() {
                    if(table ){
                        if (table.gameStarted && table.isActivePlayer(client.id))
                            table.packPlayer(client.id);

                        var removedPlayer = table.removePlayer(client.id);
                        if(removedPlayer){
                            console.log('disconnect for ' + client.id);
                            console.log('total players left:' + table.getActivePlayers());
                            DAL.db.table_players.removePlayer(table.gid, removedPlayer.playerInfo.id,
                                function (result) {
                                    client.broadcast.emit('playerLeft', {
                                        bet: {
                                            lastAction: "Packed",
                                            lastBet: ""
                                        },
                                        removedPlayer: removedPlayer,
                                        placedBy: removedPlayer.id,
                                        players: table.getPlayers(),
                                        table: table.getTableInfo(),
                                        tableId: table.gid,
                                    });
                                }, function (err) {
                                    console.log(err.message);
                                });
                            if (table.getActivePlayers() == 1 && table.gameStarted) {
                                table.decideWinner();
                                client.emit('showWinner', {
                                    bet: {
                                        lastAction: "Packed",
                                        lastBet: ""
                                    },
                                    placedBy: removedPlayer.id,
                                    players: table.getPlayers(),
                                    table: table.getTableInfo(),
                                    packed: true

                                });
                                client.broadcast.emit('showWinner', {
                                    bet: {
                                        lastAction: "Packed",
                                        lastBet: ""
                                    },
                                    placedBy: removedPlayer.id,
                                    players: table.getPlayers(),
                                    table: table.getTableInfo(),
                                    packed: true
                                });
                                table.stopGame();
                                startNewGame(table.gid);
                            }
                            if (table.getActivePlayers() == 0 && !table.gameStarted) {
                                if(table.type == "SYSTEM"){
                                    DAL.db.system_tables.removeTable(table.gid,
                                        function (result) {
                                            console.log('table removed success');
                                        }, function (err) {
                                            console.log(err.message);
                                        });
                                }
                            }
                        }
                    }
                });
                function startNewGameOnPlayerJoin(tableId) {
                    table = tables.getTable(tableId);
                    if (table.getPlayersCount() >= table.minPlayers && !table.gameStarted) {
                        setTimeout(function() {
                            client.emit('distributeCards', {
                                tableId: table.gid,
                            });
                            client.broadcast.emit('distributeCards', {
                                tableId: table.gid,
                            });
                        }, 0);
                        setTimeout(function() {
                            client.emit('gameCountDown', {
                                counter: 7,
                                tableId: table.gid,
                            });
                            client.broadcast.emit('gameCountDown', {
                                counter: 7,
                                tableId: table.gid,
                            });
                        }, 5000);
                        setTimeout(function() {
                            table = tables.getTable(tableId);
                            if (table.getPlayersCount() >= table.minPlayers && !table.gameStarted) {
                                table.startGame();
                                var sentObj = {
                                    players: table.getPlayers(),
                                    table: table.getTableInfo(),
                                    tableId: table.gid
                                };
                                client.emit('startNew', sentObj);
                                client.broadcast.emit('startNew', sentObj);
                            } else if (table.getPlayersCount() == 1 && !table.gameStarted) {
                                client.emit('notification', {
                                    message: 'Please wait for more players to join',
                                    timeout: 4000,
                                    tableId: table.gid,
                                });
                                client.broadcast.emit('notification', {
                                    message: 'Please wait for more players to join',
                                    timeout: 4000,
                                    tableId: table.gid,
                                });
                            }
                        }, 12000);
                    } else if (table.getPlayersCount() == 1 && !table.gameStarted) {
                        client.emit('notification', {
                            message: 'Please wait for more players to join',
                            timeout: 4000
                        });
                        client.broadcast.emit('notification', {
                            message: 'Please wait for more players to join',
                            timeout: 4000
                        });
                    }
                }
                function startNewGame(tableId, after) {
                    if(tableId){
                        table = tables.getTable(tableId);
                        if (table.getPlayersCount() >= table.minPlayers && !table.gameStarted) {
                            setTimeout(function() {
                                client.emit('distributeCards', {
                                    tableId: table.gid,
                                });
                                client.broadcast.emit('distributeCards', {
                                    tableId: table.gid,
                                });
                            }, 5000);
                            setTimeout(function() {
                                client.emit('gameCountDown', {
                                    counter: 7,
                                    tableId: table.gid,
                                });
                                client.broadcast.emit('gameCountDown', {
                                    counter: 7,
                                    tableId: table.gid,
                                });
                            }, 10000);
                            setTimeout(function() {
                                if (table.getPlayersCount() >= table.minPlayers && !table.gameStarted) {
                                    table.startGame();
                                    var sentObj = {
                                        players: table.getPlayers(),
                                        table: table.getTableInfo(),
                                        tableId: table.gid,
                                    };
                                    client.emit('startNew', sentObj);
                                    client.broadcast.emit('startNew', sentObj);
                                } else if (table.getPlayersCount() == 1) {
                                    client.emit('notification', {
                                        message: 'Please wait for more players to join',
                                        timeout: 4000
                                    });
                                    client.broadcast.emit('notification', {
                                        message: 'Please wait for more players to join',
                                        timeout: 4000
                                    });
                                    // setTimeout(function() {
                                    table.reset();
                                    var sentObj = {
                                        players: table.getPlayers(),
                                        table: table.getTableInfo()
                                    };
                                    client.emit('resetTable', sentObj);
                                    client.broadcast.emit('resetTable', sentObj);
                                    // }, 7000);
                                }
                            }, 17000);
                        } else if (table.getPlayersCount() == 1) {
                            setTimeout(function() {
                                client.emit('notification', {
                                    message: 'Please wait for more players to join',
                                    timeout: 4000,
                                    tableId: table.gid
                                });
                                client.broadcast.emit('notification', {
                                    message: 'Please wait for more players to join',
                                    timeout: 4000,
                                    tableId: table.gid
                                });
                            }, 4000);
                            setTimeout(function() {
                                table.reset();
                                var sentObj = {
                                    players: table.getPlayers(),
                                    table: table.getTableInfo(),
                                    tableId: table.gid
                                };
                                client.emit('resetTable', sentObj);
                                client.broadcast.emit('resetTable', sentObj);
                            }, 4000);
                        }
                    }
                }
            });

        }
    }

}
module.exports = new Io();