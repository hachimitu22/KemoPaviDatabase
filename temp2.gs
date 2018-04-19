function newWikiDataFriends2(friends, values) {
  var data = {
    'friends': {},
  };
  friends.forEach(function (friend) {
    data.friends[friend] = newTableHobbyAndArea(friend);
  });
  
  const playedListSize = getAreaOrder().length;

  const hobbyRecords = createConverterMeetList().makeDataArray(values, friends);
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
      if (['◎', '○', '△'].indexOf(d.played[index]) <= -1) {
        d.played[index] = record.mark;
      }
    }
  });
  
  return data;
}

function test2() {
  var ss = getInputSpreadSheet();
  const friends = getFriendNamesNotSort();
  var w = newWikiDataFriends2(friends, ss.getSheetByName('出会った履歴_入力済み').getDataRange().getValues());
  
  Logger.log(w);
}
