function combineHobby(wiki, hobby) {
  var _played = [];
  
  wiki.played.forEach(function(value, index) {
    if(value === '') {
      _played.push(hobby.played[index]);
    } else {
      _played.push(value);
    }
  });

  return newHobbyData(wiki.hobby, wiki.action, _played);;
}

function combineFriend(wiki, hobby) {
  var data = {
    'friend': wiki.friend,
    'hobbys': {},
  };

  Object.keys(wiki.hobbys).forEach(function(key) {
    if(wiki.hobbys[key]) {
      if(hobby.hobbys[key]) {
        data.hobbys[key] = combineHobby(wiki.hobbys[key], hobby.hobbys[key]);
      } else {
        const _w = wiki.hobbys[key];
        data.hobbys[key] = newHobbyData(_w.hobby, _w.action, _w.played);
      }
    }
  });

  Object.keys(hobby.hobbys).forEach(function(key) {
    if(!data.hobbys[key] && hobby.hobbys[key].played.some(function(value) { return value !== ''; })) {
      const _h = hobby.hobbys[key];
      data.hobbys[key] = newHobbyData(_h.hobby, _h.action, _h.played);
    }
  });
  
  return data;
}

function combine(friends, wikiData, hobbyData) {
  var data = {
    'friends': {},
  };

  friends.forEach(function(friend) {
    var w = wikiData.friends[friend];
    var h = hobbyData.friends[friend];
    
    data.friends[friend] = combineFriend(w, h);
  });
  
  return data;
}

function sortHobbys(hobbys, lands, waters) {
  var land = [ [], [] ];
  var water = [ [], [] ];
  var unknown = [ [], [] ];
  var _newHobby = [];
  
//  Object.keys(hobbys).forEach(function(key) {
  Array.concat(lands, waters).forEach(function(key) {
    var t;
    if(lands.indexOf(key) >= 0) {
      t = land;
    } else if(waters.indexOf(key) >= 0) {
      t = water;
    } else {
      t = unknown;
    }
    
    if(hobbys[key]) {
      if(hobbys[key].action === '') {
        t[1].push(getPukiWikiFormatText(hobbys[key]));
      } else {
        t[0].push(getPukiWikiFormatText(hobbys[key]));
      }
    }
  });
  
  _newHobby = Array.concat(
    land[0],
    land[1],
    [
      '|>|>|>|>|>|>|  |',
      '|BGCOLOR(#cfe):|CENTER:|CENTER:|CENTER:|CENTER:|CENTER:|CENTER:|c'
    ],
    water[0],
    water[1]
  );
  
  return _newHobby;
}

function getPukiWikiText(friend, lands, waters) {
  var textArr = [friend.friend];
  var sort = sortHobbys(friend.hobbys, lands, waters);
  
  textArr = textArr.concat(sort);
  textArr.push(friend.friend);
  
  return textArr;
}

function putTableHobbyAndFriend() {
  var ss = getInputSpreadSheet();
  const friends = getFriendNamesNotSort();
  var w = newWikiDataFriends(friends, ss.getSheetByName('wikiからのコピペ').getDataRange().getValues());
  var h = newWikiDataFriends2(friends, ss.getSheetByName('出会った履歴_入力済み').getDataRange().getValues());
  var baseDataSheet = ss.getSheetByName('_基本データ');
  var lands = transpose(baseDataSheet.getRange('J3:J').getValues())[0].filter(function(values) { return values !== '' });
  var waters = transpose(baseDataSheet.getRange('K3:K').getValues())[0].filter(function(values) { return values !== '' });
  
  var data = combine(friends, w, h);
  var wtextValues = [];
  var textValues = [];
  
  Object.keys(w.friends).forEach(function(key, index) {
    var friend = w.friends[key];
    var textArr = getPukiWikiText(friend, lands, waters);
    wtextValues.push(textArr);
  });
  Object.keys(data.friends).forEach(function(key, index) {
    var friend = data.friends[key];
    var textArr = getPukiWikiText(friend, lands, waters);
    textValues.push(textArr);
  });

  (function() {
    var kopipeSheet = ss.getSheetByName('wikiへのコピペ用2');
    
    var range = kopipeSheet.getRange(1, 1, 4000, 10);
    range.clearContent();
    var values = range.getValues();

    var _y = 0;
    textValues.forEach(function(textArr) {
      const _x = 0;

      textArr.forEach(function(text, y) {
        values[_y][_x] = text;
        _y++;
      });
      _y++;
    });
    
    _y = 0;
    wtextValues.forEach(function(textArr) {
      const _x = 1;

      textArr.forEach(function(text, y) {
        values[_y][_x] = text;
        _y++;
      });
      _y++;
    });

    range.setValues(values);
  })();
}

function test3() {
  var test = createTest('temp3');
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  const friends = ['サーバル'];
  
  test.suite('newWikiDataFriends2', function() {
    var w = newWikiDataFriends(friends, ss.getSheetByName('wikiからのコピペ').getDataRange().getValues());
    var h = newWikiDataFriends2(friends, ss.getSheetByName('あそびどうぐ').getDataRange().getValues());
    var baseDataSheet = ss.getSheetByName('_基本データ');
    var lands = transpose(baseDataSheet.getRange('J3:J').getValues())[0];
    var waters = transpose(baseDataSheet.getRange('K3:K').getValues())[0];
    
    var data = combine(friends, w, h);
//    var sort = sortHobbys(data.friends['サーバル'].hobbys, lands, waters);
    var text = getPukiWikiText(data.friends['サーバル'], lands, waters);
    Logger.log(text);
  });
}

function test4() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var baseDataSheet = ss.getSheetByName('_基本データ');
  var lands = transpose(baseDataSheet.getRange('J3:J').getValues());
  var waters = transpose(baseDataSheet.getRange('K3:K').getValues());
  Logger.log(lands);
  Logger.log(waters);
}