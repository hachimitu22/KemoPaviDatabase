function createConverterWikiData() {
  var _class = createConverterBase();
  const targets = ['◎', '○', '△'];
  const areaAndTimeZone = getAreaOrder();
  const recordStartOffset = 3;

  var getNamePositions = function(values, friends) {
    var positions = {};
    
    for(var i = 0, len1 = values.length; i < len1; i++) {
      for(var j = 0, len2 = values[i].length; j < len2; j++) {
        var value = values[i][j];
        
        if(friends.indexOf(value) >= 0 && !positions[value]) {
          positions[value] = { 'x': j, 'y': i };
        }
      }
    }
    
    return positions;
  };
  var getSize = function(values, namePos) {
    var count = 0;
    for(var i = namePos.y + recordStartOffset; i < values.length; i++) {
      if(values[i][namePos.x] === ''){
        if(i + 1 < values.length && values[i+1][namePos.x] === ''){
          break;
        }
      }
      count++;
    }
    
    return count;
  };
  
  _class.makeDataArray = function(values, friends) {
    var arr = [];
    const positions = getNamePositions(values, friends);
    
    friends.forEach(function(friend) {
      const namePos = positions[friend];
      const size = getSize(values, namePos);
      
      if(namePos.x < 0 || namePos.y < 0 || size < 1) {
        return;
      }
      
      const preRecordValues = values.slice(
        namePos.y + recordStartOffset,
        namePos.y + recordStartOffset + size
      );
      
      preRecordValues.forEach(function(preRecord) {
        const record = preRecord.slice(namePos.x, namePos.x + areaAndTimeZone.length + 1);
        const pureHobbyName = record[0].replace(/[\?\*]*/g, '');
        
        record.slice(1, record.length).forEach(function(value, index) {
          if (['◎', '○', '△'].indexOf(value) >= 0) {
            var hobbyRecord = createHobbyRecord(
              friend,
              pureHobbyName,
              areaAndTimeZone[index].area,
              areaAndTimeZone[index].timeZone
            );
            arr.push(hobbyRecord);
          }
        });
      });
    });
    
    return arr;
  };
  _class.convertToDataArray = _class.makeDataArray;
  
  return _class;
}
