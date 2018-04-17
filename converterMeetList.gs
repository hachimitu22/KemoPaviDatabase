function createConverterMeetList() {
  var _class = createConverterBase();
  
  _class.makeDataArray = function(values) {
    var arr = [];
    
    for(var i = 2, len = values.length; i < len; i++) {
      var line = values[i];
      
      if(line[1] === '') {
        break;
      }

      arr.push({
        'friend': line[1],
        'area': line[2],
        'timeZone': line[3],
        'material': line[5],
        'hobby': line[6],
        'speech': line[10],
      });
    }
    
    return arr;
  };
  _class.convertToDataArray = _class.makeDataArray;
  
  return _class;
}
