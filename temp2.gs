function newTableHobbyAndArea2(friend, values) {
  var data = {
    'friend': friend,
    'hobbys': {},
  };
  
  values.forEach(function(lineValues) {
    const _hobby = lineValues[0]
    const hobby = _hobby.replace(/[\*\?]/g, '');
    const action = (_hobby.indexOf('*') === -1) ? '' : '*';
    const playedList = lineValues.slice(1, 7);

    data.hobbys[hobby] = newHobbyData(hobby, action, playedList);
  });
  
  return data;
}

function newWikiDataFriends2(friends, values) {
  var data = {
    'friends': {},
  };
  
  var getPosition = function(values, friend) {
    const x = 4;
    const y = (function() {
      var _y = -1;
      
      values.some(function(lineValues, index) {
        if(lineValues[1] === friend) {
          _y = index;
          return true;
        }
      });
      
      return _y;
    })();
    
    if(y >= 0) {
      return { 'x': x, 'y': y };
    } else {
      return { 'x': -1, 'y': -1 };
    }
  };
  var getSize = function(values) {
    const _values = values[2].slice(4, values[2].length);
    var count = 0;
    
    for(var i = 0; i < _values.length; i++) {
      if(_values[i] === ''){
        break;
      }
      count++;
    }
    
    return count;
  };

  const size = getSize(values);
  
  friends.forEach(function(friend) {
    const pos = getPosition(values, friend);
    
    if(pos.x >= 0 && pos.y >= 0 && size >= 1) {
      var hobbyValues = [values[2].slice(4, 4 + size)];
      var markValues = (function() {
        var arr = [];

        values.slice(pos.y, pos.y + 6).forEach(function(lineValues) {
          arr.push(lineValues.slice(pos.x, pos.x + size));
        });
        
        return arr;
      })();
      
      data.friends[friend] = newTableHobbyAndArea2(friend, transpose(hobbyValues.concat(markValues)));
    }
  });
  
  return data;
}

function test2() {
  var test = createTest('putter');
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  const friends = ['サーバル'];
  
  test.suite('newWikiDataFriends2', function() {
    const s = ss.getSheetByName('あそびどうぐ')
    const values = s.getDataRange().getValues();
    
    var data = newWikiDataFriends2(friends, values);
    
    Logger.log(Object.keys(data.friends['サーバル'].hobbys));
  });
}