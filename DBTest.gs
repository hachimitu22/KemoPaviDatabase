function myFunction() {
  var docid = '1C-MdHd9FyzyEB2enE9mfPXkwhvpJmcL27sneNLAZ';
//  var sql = 'INSERT INTO ' + docid + ' (ID, NAME, AGE) VALUES (4, "池田", 33)';
  var sql = "INSERT INTO " + docid + " (ID, NAME, AGE) VALUES (4, '池田', 33)";
  FusionTables.Query.sql(sql);
}

function getDB() {
  var docid = '1C-MdHd9FyzyEB2enE9mfPXkwhvpJmcL27sneNLAZ';
  var sql = 'SELECT * FROM ' + docid + ' ORDER BY ID';
  var result = FusionTables.Query.sqlGet(sql);
  
  Logger.log(result.rows[0][0]);
}