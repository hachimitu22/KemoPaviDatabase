function createConverterWikiData() {
  var _class = createConverterBase();
  
  _class.makeDataArray = function(values, friends) {
    var arr = [];
    const targets = ['◎', '○', '△'];
    var areaAndTimeZone = getAreaOrder();
    
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
        for(var i = 0, len = size; i < len; i++) {
          var record = [];
          for(var j = 0; j < 7; j++) {
            record.push(values[pos.y + 1 + i][pos.x + j]);
          }
          var hobby = record[0].replace(/[\?\*]*/g, '');
          
          record.slice(1, 6).forEach(function(value, index) {
            if (['◎', '○', '△'].indexOf(value) >= 0) {
              arr.push({
                'friend': friend,
                'hobby': hobby,
                'area': areaAndTimeZone[index].area,
                'timeZone': areaAndTimeZone[index].timeZone,
              });
            }
          });
        }
      }
    });
    
    return arr;
  };
  _class.convertToDataArray = _class.makeDataArray;
  
  return _class;
}
