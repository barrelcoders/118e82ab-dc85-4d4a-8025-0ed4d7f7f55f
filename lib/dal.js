var config = require('./../config');
var pool = require('mysql').createPool({
     connectionLimit : config.database.connectionLimit, 
     timeout  : 10000,
     host     : config.database.host,
     user     : config.database.user,
     password : config.database.password,
     database : config.database.dbName,
	 port	  : config.database.port
});

var db = {};

function connectionErrorHandling(err, connection, OnError){
	if (err) {
		if(connection){
			connection.release();
		}
	   OnError({"message" : "Error in connection database"});
	   return;
	}
	
	//connection.on('error', function(err) {
	//	OnError({"message" : "Error in connection database"});
	//	return;
	//});
}
db.users = {
	insert: function(userInfo, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			//connection.threadId;
			connectionErrorHandling(err, connection, OnError);
			connection.query('INSERT INTO '+config.database.dbName+'.tbl_users SET ?', userInfo, function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in inserting user"});
				}
			});
		});
	},
	updateBalance: function(chips, id, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}

			connectionErrorHandling(err, connection, OnError);
			connection.query('UPDATE '+config.database.dbName+'.tbl_users SET chips = ? WHERE id = ?', [chips, id], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in updating user"});
				}
			});
		});
	},
	updateAvatar: function(id, avatar, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('UPDATE '+config.database.dbName+'.tbl_users SET avatar = ? WHERE id = ?', [avatar, id], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in updating avatar"});
				}
			});
		});
	},
	updateDisplayName: function(id, displayName, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('UPDATE '+config.database.dbName+'.tbl_users SET displayName = ? WHERE id = ?', [displayName, id], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in updating display name"});
				}
			});
		});
	},
	find: function(userName, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : err});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('SELECT * FROM '+config.database.dbName+'.tbl_users WHERE email = ?', [userName], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in selecting user"});
				}
			});
		});
	},
	findByFBId: function(fb_id, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : err});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('SELECT * FROM '+config.database.dbName+'.tbl_users WHERE fb_id = ?', [fb_id], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in selecting user"});
				}
			});
		});
	}
};
db.system_tables = {
	findById: function(id, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("SELECT * FROM "+config.database.dbName+".tbl_system_defined_tables WHERE id = ?", [id], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in fetching table"});
				}
			});
		});
	},
	find: function(potAmount, status, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("SELECT * FROM tbl_system_defined_tables a " +
				" WHERE a.id in (SELECT table_id FROM table_players GROUP BY table_id HAVING count(id) < a.max_players) "+
				" AND a.pot_amount = ? ", [potAmount], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in fetching available table"});
				}
			});
			//status,
			//a.status = ? AND
		});
	},
	insert: function(tableInfo, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('INSERT INTO '+config.database.dbName+'.tbl_system_defined_tables SET ?', tableInfo, function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in creating table"});
				}
			});
		});
	},
	updateStatus: function(tableId, tableStatus, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('UPDATE '+config.database.dbName+'.tbl_system_defined_tables SET status = ? WHERE id = ?', [tableStatus, tableId], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in updating table status"});
				}
			});
		});
	},
	removeTable: function(tableId, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('DELETE FROM '+config.database.dbName+'.tbl_system_defined_tables WHERE id = ?;', [tableId], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in removing table"});
				}
			});
		});
	},
}
db.custom_tables = {
	findById: function(id, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("SELECT * FROM "+config.database.dbName+".tbl_custom_tables WHERE id = ? ", [id], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in fetching available table"});
				}
			});
		});
	},
	find: function(name, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("SELECT * FROM "+config.database.dbName+".tbl_custom_tables WHERE name = ? ", [name], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in fetching available table"});
				}
			});
		});
	},
	findAll: function(owner, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("SELECT * FROM "+config.database.dbName+".tbl_custom_tables WHERE owner = ? ", [owner], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in fetching available table"});
				}
			});
		});
	},
	insert: function(tableInfo, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('INSERT INTO '+config.database.dbName+'.tbl_custom_tables SET ?', tableInfo, function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in creating table"});
				}
			});
		});
	},
	sendPlayInvite: function(inviteInfo, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('INSERT INTO '+config.database.dbName+'.tbl_custom_table_invite SET ?', inviteInfo, function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in sending table invite"});
				}
			});
		});
	},
	existingPlayInvite: function(inviteInfo, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('SELECT * FROM '+config.database.dbName+'.tbl_custom_table_invite WHERE req_from=? AND req_to=? ' +
				'AND table_id=? AND status=0', [inviteInfo.req_from, inviteInfo.req_to, inviteInfo.table_id], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in fetching table invite status"});
				}
			});
		});
	},
	loadInvites: function(req_to, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("SELECT a.id, a.req_from, a.req_to, a.table_id, a.status, b.name as tableName, c.displayName," +
				" c.email, c.avatar FROM tbl_custom_table_invite a, tbl_custom_tables b,  tbl_users c " +
				" WHERE a.req_from = c.id AND b.id = a.table_id AND a.req_to = ? " +
				" AND a.status = 0;", [req_to], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in fetching available table"});
				}
			});
		});
	},
	updateInviteStatus: function(id, status, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('UPDATE '+config.database.dbName+'.tbl_custom_table_invite SET status = ? WHERE id = ?;', [status, id], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in fetching available table"});
				}
			});
		});
	},
	deleteInvite: function(id, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('DELETE FROM '+config.database.dbName+'.tbl_custom_table_invite WHERE id = ?;', [id], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in fetching available table"});
				}
			});
		});
	},
}
db.table_players = {
	addSystemTablePlayer: function(tableId, userId, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("INSERT INTO "+config.database.dbName+".table_players  (table_id, table_type, player_id) "+
			" SELECT * FROM (SELECT ?, 'SYSTEM', ?) AS tmp WHERE NOT EXISTS "+
			" ( SELECT table_id FROM "+config.database.dbName+".table_players WHERE table_id = ? AND player_id = ?) ;" ,
				[tableId, userId, tableId, userId], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in adding player to system table"});
				}
			});
		});
	},

	addCustomTablePlayer: function(tableId, userId, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("INSERT INTO "+config.database.dbName+".table_players  (table_id, table_type, player_id) "+
				" SELECT * FROM (SELECT ?, 'CUSTOM', ?) AS tmp WHERE NOT EXISTS "+
				" ( SELECT table_id FROM "+config.database.dbName+".table_players WHERE table_id = ? AND player_id = ?) ;" ,
				[tableId, userId, tableId, userId], function(err,rows){
					connection.release();
					if(!err) {
						OnSuccess(rows);
					}
					else{
						OnError({"message" : "Error in adding player to system table"});
					}
				});
		});
	},
	removePlayer: function(tableId, playerId, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query('DELETE FROM '+config.database.dbName+'.table_players WHERE table_id = ? AND player_id = ?',
				[tableId, playerId], function(err,rows){
				connection.release();
				if(!err) {
					OnSuccess(rows);
				}
				else{
					OnError({"message" : "Error in updating table status"});
				}
			});
		});
	},
}
db.chats = {
	addChatMessage: function(tableId, userId, message, date,  OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("INSERT INTO "+config.database.dbName+".tbl_chats (table_id, user_id, message, date) values ( ?, ?, ?, ?) ;" ,
				[tableId, userId, message, date], function(err,rows){
					connection.release();
					if(!err) {
						OnSuccess(rows);
					}
					else{
						OnError({"message" : "Error in adding chat"});
					}
				});
		});
	},
	loadChats: function(tableId,  OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("SELECT c.table_id as 'table_id', c.message as 'message', c.date as 'date', " +
				" u.displayName as 'from' FROM "+config.database.dbName+".tbl_chats c JOIN "
				+config.database.dbName+".tbl_users u ON c.user_id = u.id WHERE c.table_id = ?;" ,
				[tableId], function(err,rows){
					connection.release();
					if(!err) {
						OnSuccess(rows);
					}
					else{
						OnError({"message" : "Error in adding chat"});
					}
				});
		});
	},
}
db.gifts = {
	loadGifts: function(OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("SELECT * FROM "+config.database.dbName+".tbl_gifts;" ,
				[], function(err,rows){
					connection.release();
					if(!err) {
						OnSuccess(rows);
					}
					else{
						OnError({"message" : "Error in loading gifts"});
					}
				});
		});
	},
};
db.bonus = {
	find: function(user, received, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("SELECT * FROM "+config.database.dbName+".tbl_bonus WHERE user = ? AND DATE(received) = ?;" ,
				[user, received], function(err,rows){
					connection.release();
					if(!err) {
						OnSuccess(rows);
					}
					else{
						OnError({"message" : "Error in loading bonus"});
					}
				});
		});
	},
	findByUser: function(user, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("SELECT * FROM "+config.database.dbName+".tbl_bonus WHERE user = ?;" ,
				[user], function(err,rows){
					connection.release();
					if(!err) {
						OnSuccess(rows);
					}
					else{
						OnError({"message" : "Error in loading bonus"});
					}
				});
		});
	},
	insert: function(user, received, bonus, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("INSERT INTO "+config.database.dbName+".tbl_bonus (user, bonus, received) VALUES (?, ?, ?);" ,
				[user, bonus, received], function(err,rows){
					connection.release();
					if(!err) {
						OnSuccess(rows);
					}
					else{
						OnError({"message" : "Error in inserting bonus"});
					}
				});
		});
	},
	update: function(user, received, bonus, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("UPDATE "+config.database.dbName+".tbl_bonus SET bonus = ?, received = ? WHERE user = ?;" ,
				[bonus, received, user], function(err,rows){
					connection.release();
					if(!err) {
						OnSuccess(rows);
					}
					else{
						OnError({"message" : "Error in updating bonus"});
					}
				});
		});
	},
	updateTime: function(user, received, OnSuccess, OnError){
		pool.getConnection(function(err,connection){
			if(!connection){
				OnError({"message" : "connection problem"});
				return;
			}
			connectionErrorHandling(err, connection, OnError);
			connection.query("UPDATE "+config.database.dbName+".tbl_bonus SET received = ? WHERE user = ?;" ,
				[received, user], function(err,rows){
					connection.release();
					if(!err) {
						OnSuccess(rows);
					}
					else{
						OnError({"message" : "Error in updating bonus time"});
					}
				});
		});
	},

};
var DAL={db:db};
module.exports = DAL;