function newHobbyData(hobby, action, playedList) {
  return {
    'hobby': hobby,
    'action': action,
    'played': playedList.slice(),
    getPukiWikiFormatText: function() {
      var self = this;
      
      const charcount = function (str) {
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
      };
      const repeat = function(len, word) {
        var str = '';
        for(var i = 0; i < len; i++){
          str += word;
        }
        return str;
      };

      const hobbyLink = '[[' + hobby + ']]' + action;
      const spaces = repeat(30 - charcount(hobbyLink), ' ');
      const played = (function() {
        var arr = [];
        
        self.played.forEach(function(value) {
          const c = charcount(value);
          const s = repeat(2 - c, ' ');
          arr.push(value + s);
        });
        
        return arr;
      })();
      
      const joinText = [hobbyLink + spaces].concat(played).join('|');
      return '|' + joinText + '|';
    },
  };
}

function newTableHobbyAndArea(friend, values) {
  var data = {
    'friend': friend,
    'hobbys': {},
  };
  
  values.forEach(function(lineValues) {
    const _hobby = lineValues[0];
    const hobby = _hobby.replace(/[\*\?]/g, '');
    const action = (_hobby.indexOf('*') === -1) ? '' : '*';
    const playedList = lineValues.slice(1, 7);

    data.hobbys[hobby] = newHobbyData(hobby, action, playedList);
  });
  
  return data;
}

function newWikiDataFriends(friends, values) {
  var data = {
    'friends': {},
  };
  
  var getPosition = function(values, friend) {
    for(var i = 0, len1 = values.length; i < len1; i++) {
      for(var j = 0, len2 = values[i].length; j < len2; j++) {
        if(values[i][j] === friend) {
          return { 'x': j, 'y': i };
        }
      }
    }
    return { 'x': -1, 'y': -1 };
  };
  var getSize = function(values, pos) {
    var count = 0;
    for(var i = pos.y + 1; i < values.length; i++) {
      if(values[i][pos.x] === ''){
        break;
      }
      count++;
    }
    
    return count;
  };
  
  friends.forEach(function(friend) {
    const pos = getPosition(values, friend);
    const size = getSize(values, pos);
    
    if(pos.x >= 0 && pos.y >= 0 && size >= 1) {
      const friendValues = (function() {
        var arr = [];

        values.slice(pos.y + 1, pos.y + size + 1).forEach(function(lineValues, index) {
            arr.push(lineValues.slice(pos.x, pos.x + 6 + 1));
        });
        
        return arr;
      })();
      
      data.friends[friend] = newTableHobbyAndArea(friend, friendValues);

    }
  });
  
  return data;
}
