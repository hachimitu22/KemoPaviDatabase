function charcount(str) {
  var len = 0;
  str = escape(str);
  for (var i = 0; i < str.length; i++, len++) {
    if (str.charAt(i) == "%") {
      if (str.charAt(++i) == "u") {
        i += 3;
        len++;
      }
      i++;
    }
  }
  return len;
}

function repeat(len, word) {
  var str = '';
  for(var i = 0; i < len; i++){
    str += word;
  }
  return str;
}

function getPukiWikiFormatText(friendPageHobbyRecord) {
  const hobbyName = friendPageHobbyRecord.hobby;
  const action = friendPageHobbyRecord.action;

  const link = '[[' + hobbyName + '>あそびどうぐ一覧/' + hobbyName + ']]' + action;
  const spaces = repeat(80 - charcount(link), ' ');
  const played = (function() {
    var arr = [];
    
    friendPageHobbyRecord.played.forEach(function(value) {
      const c = charcount(value);
      const s = repeat(2 - c, ' ');
      arr.push(value + s);
    });
    
    return arr;
  })();
  
  const joinText = [link + spaces].concat(played).join('|');
  return '|' + joinText + '|';
}


function newHobbyData(hobby, action, playedList) {
  return {
    'hobby': hobby,
    'action': action,
    'played': playedList.slice()  // ディープコピー
  };
}

function newTableHobbyAndArea(friend, records) {
  var data = {
    'friend': friend,
    'hobbys': {},
  };
  return data;
}

function newWikiDataFriends(friends, values) {
  var data = {
    'friends': {},
  };
  friends.forEach(function (friend) {
    data.friends[friend] = newTableHobbyAndArea(friend);
  });
  
  const playedListSize = getAreaOrder().length;

  const hobbyRecords = createConverterWikiData().makeDataArray(values, friends, ['◎', '○', '△', '？', '×']);
  hobbyRecords.forEach(function (record) {
    const friend = record.friend;
    const hobby = record.hobby;

    if (!data.friends[friend].hobbys[hobby]) {
      var arr = [];
      for(var i = 0; i < playedListSize; i++){
        arr.push('');
      }
      
      data.friends[friend].hobbys[hobby] = newHobbyData(
        hobby,
        '',
        arr
      );
    }
    var d = data.friends[friend].hobbys[hobby];

    if (d.action === '') {
      d.action = (record.action) ? '*' : '';
    }

    var index = getAreaAndTimeZoneOffset(record.area, record.timeZone);
    if (record.mark !== '') {
      d.played[index] = record.mark;
    }
  });
  
  return data;
}

function test() {
  var ss = getInputSpreadSheet();
  const friends = getFriendNamesNotSort();
  var w = newWikiDataFriends(friends, ss.getSheetByName('wikiからのコピペ').getDataRange().getValues());
  
  Logger.log(w);
}
