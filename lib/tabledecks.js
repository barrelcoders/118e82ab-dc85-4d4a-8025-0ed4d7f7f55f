var _ = require('underscore');
var utils = require('./base/utils');
var DAL = require('./dal');
var deck = require('./deck');
var cardComparer = require('./cardComparer');

function Table(options) {

    this.gid = options.id;
    this.gameStarted = false;
    this.minPlayers = options.min_players;
    this.type = options.type;
    var maxPlayers = options.max_players;
    var players = {};
    var clients = {};
    var tableInfo;
    var cardsInfo = {};


     var avialbleSlots = {};
     for(i=1;i<=options.max_players;i++){
        avialbleSlots["slot"+i] = "slot"+i;
     }

    this.avialbleSlots = avialbleSlots;

    this.resetTable = function() {
        var iBoot = options.pot_amount || 1000;
        tableInfo = {
            boot: iBoot,
            lastBet: iBoot,
            lastBlind: true,
            maxBet: iBoot * Math.pow(2, 7),
            potLimit: iBoot * Math.pow(2, 11),
            showAmount: true
        };
    }
    this.getPlayers = function() {
        return players;
    };
    this.getPlayersCount = function() {
        return _.size(players);
    }
    this.playerExistsInTable = function(player_id) {
        var result = false;
        for (var p in players) {
            if (players[p].playerInfo.id === player_id) {
                result = true;
            }
        }
        return result;
    }
    this.getRemainingPlayerId = function(){
        for (var p in players) {
            return players[p].playerInfo.id;
        }
    }
    this.getTableInfo = function() {
        tableInfo.isShowAvailable = this.getActivePlayers() === 2;
        return tableInfo;
    }
    this.isPotLimitExceeded = function() {
        if (tableInfo.amount) {
            return tableInfo.amount > tableInfo.potLimit;
        }
        return false;
    }

    this.addPlayer = function(player, client) {
        if (this.getActivePlayers() <= maxPlayers) {
            for (var slot in this.avialbleSlots) {
                player.slot = slot;
            }
            players[player.id] = player;
            clients[player.id] = client;
            players[player.id].active = !this.gameStarted;
            delete this.avialbleSlots[player.slot];
            return player;
        }
        return false;
    };
    this.removePlayer = function(id) {
        if (id && players[id]) {
            var player = players[id];
            this.avialbleSlots[player.slot] = player.slot;
            delete cardsInfo[id];
            delete players[id];
            delete clients[id];
            return player;
        }
    };

    this.getPlayerBySlot = function(slot) {
        for (var player in players) {
            if (players[player].slot === slot) {
                return players[player];
            }
        }
        return undefined;
    }
    this.getPlayerById = function(id) {
        for (var player in players) {
            if (players[player].playerInfo.id === id) {
                return players[player];
            }
        }
        return undefined;
    }
    this.getPrevActivePlayer = function(id) {
        var slot = players[id].slot,
            num = slot.substr(4) * 1;
        for (var count = 0; count <= 4; count++) {
            num--;
            if (num === 0) {
                num = 5;
            }
            if (this.avialbleSlots["slot" + num]) {
                continue;
            }
            if (this.getPlayerBySlot("slot" + num)) {
                if (!this.getPlayerBySlot("slot" + num).active || this.getPlayerBySlot("slot" + num).packed) {
                    continue;
                } else {
                    break;
                }
            }
        }

        var newPlayer = this.getPlayerBySlot("slot" + num);
        return newPlayer;
    }
    this.getNextActivePlayer = function(id) {
        var slot = players[id].slot,
            num = slot.substr(4) * 1;
        for (var count = 0; count <= 4; count++) {
            num++;
            if (num > 5) {
                num = num % 5;
            }
            if (this.avialbleSlots["slot" + num]) {
                continue;
            }
            if (this.getPlayerBySlot("slot" + num)) {
                if (!this.getPlayerBySlot("slot" + num).active || this.getPlayerBySlot("slot" + num).packed) {
                    continue;
                } else {
                    break;
                }
            }
        }

        var newPlayer = this.getPlayerBySlot("slot" + num);
        return newPlayer;
    }

    this.getNextSlotForTurn = function(id) {
        players[id].turn = false;
        var newPlayer = this.getNextActivePlayer(id);
        newPlayer.turn = true;
    }
    this.isActivePlayer = function(id) {
        return players[id] && players[id].active;
    }
    this.packPlayer = function(id) {
        players[id].packed = true;
        this.getNextSlotForTurn(id);
        return this.getPlayers();
    }
    this.placeBetOnly = function(id, bet, blind) {
        tableInfo.amount += bet;
        tableInfo.lastBet = bet;
        players[id].playerInfo.chips -= bet;
        console.log('user updating result: ' + players[id].playerInfo._id);
        DAL.db.users.updateBalance(players[id].playerInfo.chips, players[id].playerInfo.id,
		function(result) {
			console.log('user updated success');
		}, function(err) {
			console.log(err.message);
		});
        tableInfo.lastBlind = blind;
    }
    this.placeBet = function(id, bet, blind) {
        this.placeBetOnly(id, bet, blind);
        this.getNextSlotForTurn(id);
        return this.getPlayers();
    };
    this.getActionTurnPlayer = function() {
        var activePlayer;
        for (var player in players) {
            if (players[player].turn) {
                activePlayer = players[player];
                break;
            }
        }
        return activePlayer;
    }

    this.resetSideShowTurn = function() {
        for (var player in players) {
            players[player].sideShowTurn = false;
        }
    }
    this.sideShowDenied = function(id) {
        players[id].lastAction = 'Denied';
        return [players[id].playerInfo.displayName, ' has denied the request'].join('');
    }
    this.sideShowAccepted = function(id) {
        players[id].lastAction = 'Accepted';
        var nextPlayer = this.getNextActivePlayer(id);
        var cardsToCompare = [{
            id: id,
            set: cardsInfo[id].cards
        }, {
            id: nextPlayer.id,
            set: cardsInfo[nextPlayer.id].cards
        }];
        var result = cardComparer.getGreatest(cardsToCompare),
            cardsToShow = {};
        cardsToShow[id] = {
            cardSet: cardsInfo[id].cards
        };
        cardsToShow[nextPlayer.id] = {
            cardSet: cardsInfo[nextPlayer.id].cards
        };
        if (result.id === id) {
            nextPlayer.packed = true;
        } else {
            players[id].packed = true;
        }
        return {
            message: [players[result.id].playerInfo.displayName, ' has won the side show'].join(''),
            cardsToShow: cardsToShow
        }
    };

    this.setNextPlayerTurn = function() {
        var activeTurnPlayer = this.getActionTurnPlayer();
        this.getNextSlotForTurn(activeTurnPlayer.id);
    }
    this.placeSideShow = function(id, bet, blind) {
        this.placeBetOnly(id, bet, blind);
        var message = this.setPlayerForSideShow(id);
        return message;
    }
    this.setPlayerForSideShow = function(id) {
        var prevPlayer = this.getPrevActivePlayer(id);
        prevPlayer.sideShowTurn = true;
        return [players[id].playerInfo.displayName, ' asking for side show'].join('');
    }

    this.stopGame = function() {
        this.gameStarted = false;
        tableInfo.gameStarted = false;
    }

    this.collectBootAmount = function() {
        var bootAmount = 0;
        for (var player in players) {
            if (players[player].active) {
                players[player].lastBet = tableInfo.boot;
                players[player].lastAction = "";
                bootAmount = bootAmount + tableInfo.boot;
                players[player].playerInfo.chips -= tableInfo.boot;
                DAL.db.users.updateBalance(players[player].playerInfo.chips, players[player].playerInfo.id,
				function(result) {
					console.log('user updated success');
				}, function(err) {
					console.log(err.message);
				});
            }
        }
        tableInfo.amount = bootAmount;
    }
    this.getCardInfo = function() {
        return cardsInfo;
    }
    this.updateSideShow = function(id) {
        var nextPlayer = this.getNextActivePlayer(id);
        if (nextPlayer) {
            nextPlayer.isSideShowAvailable = true;
        }
    }

    function distributeCards() {
        deck.shuffle();
        var deckCards = deck.getCards(),
            index = 0;
        for (var i = 0; i < 3; i++) {
            for (var player in players) {
                if (players[player].active) {
                    if (!cardsInfo[players[player].id]) {
                        cardsInfo[players[player].id] = {};
                    }
                    if (!cardsInfo[players[player].id].cards) {
                        cardsInfo[players[player].id].cards = [];
                    }
                    cardsInfo[players[player].id].cards.push(deckCards[index++]);
                }
            }
        }
    }

    this.getActivePlayers = function() {
        var count = 0;
        for (var player in players) {
            if (players[player].active && !players[player].packed) {
                count++;
            }
        }
        return count;
    }
    this.resetAllPlayers = function() {
        for (var player in players) {
            delete players[player].winner;
            players[player].turn = false;
            players[player].active = true;
            players[player].packed = false;
            players[player].isSideShowAvailable = false;
            players[player].cardSet = {
                closed: true
            };
            players[player].lastBet = "";
            players[player].lastAction = "";
        }
    }
    this.decideWinner = function(showCards) {
        var cardSets = [],
            winnerCard,
            msg = "";
        for (var player in players) {
            players[player].turn = false;
            if (players[player].active && !players[player].packed) {
                if (showCards) {
                    players[player].cardSet.cards = cardsInfo[players[player].id].cards;
                    players[player].cardSet.closed = false;
                }
                cardSets.push({
                    id: players[player].id,
                    set: cardsInfo[players[player].id].cards
                });
            }
        }

        if (cardSets.length === 1) {
            winnerObj = players[cardSets[0].id];
        } else {
            winnerCard = cardComparer.getGreatest(cardSets);
            winnerObj = players[winnerCard.id];
        }
        winnerObj.winner = true;
        winnerObj.playerInfo.chips += tableInfo.amount;
        DAL.db.users.updateBalance(players[player].playerInfo.chips, players[player].playerInfo.id,
		function(result) {
			console.log('user updated success');
		}, function(err) {
			console.log(err.message);
		});
        if (winnerCard) {
            return [winnerObj.playerInfo.displayName, ' won with ', winnerCard.typeName].join('');
        }
        return undefined
    }
    this.reset = function() {
        cardsInfo = {};
        this.resetTable();
        this.resetAllPlayers();
    }
    this.decideDeal = function() {
        var firstPlayer = null,
            dealFound = false,
            isFirst = true,
            dealPlayer;
        for (var player in players) {
            if (players[player].active) {

                if (isFirst) {
                    firstPlayer = players[player];
                    isFirst = false;
                }
                if (players[player].deal === true) {
                    players[player].deal = false;
                    dealPlayer = players[player];
                    dealFound = true;
                }
            }
        }
        if (!dealFound) {
            firstPlayer.deal = true;
        } else {
            var nextPlayer = this.getNextActivePlayer(dealPlayer.id);
            nextPlayer.deal = true;
        }
    }
    this.decideTurn = function() {
        var firstPlayer = null,
            dealFound = false,
            isFirst = true,
            dealPlayer;
        for (var player in players) {

            if (players[player].active) {
                if (isFirst) {
                    firstPlayer = players[player];
                    isFirst = false;
                }
                if (players[player].deal === true) {
                    dealPlayer = players[player];
                    dealFound = true;
                }
            }
        }
        if (!dealFound) {
            firstPlayer.turn = true;
        } else {
            var nextPlayer = this.getNextActivePlayer(dealPlayer.id);
            nextPlayer.turn = true;
        }
    }
    this.startGame = function() {
        cardsInfo = {};
        this.resetTable();
        this.resetAllPlayers();
        this.gameStarted = true;
        tableInfo.gameStarted = true;
        this.decideDeal();
        this.decideTurn();
        tableInfo.isShowAvailable = this.getActivePlayers() === 2;
        tableInfo.isSideShowAvailable = false;
        this.collectBootAmount();
        distributeCards();
        DAL.db.system_tables.updateStatus(this.gid, 'RUNNING',
            function(result) {
                console.log('table status updated');
            }, function(err) {
                console.log(err.message);
            });
    }
    this.resetTable();
    return this;

}


function TableManager() {
    var tables = [];

    return {
        createNewTable: function(options) {
            if(_.any( tables, function( el ) { return el.gid === options.id;  })){
                return _.filter(tables, function(el){
                    return el.gid === options.id;
                })[0];
            }
            else{
                var table = new Table(options);
                tables.push(table);
                return table;
            }
        },
        getTable: function(guid) {
            var result = _.where(tables, {
                gid: guid
            });
            if (result.length !== 0) {
                return result[0];
            }
            return null;
        },
        getTableByBoot: function(boot) {

        },

        startCountDown: function(secs) {

        },

        startGame: function() {

        }
    }
}


module.exports = new TableManager();