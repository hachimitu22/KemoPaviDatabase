function createConverterMeetList() {
  var _class = createConverterBase();
  
  _class.makeDataArray = function(values) {
    var arr = [];
    
    for(var i = 2, len = values.length; i < len; i++) {
      var line = values[i];
      
      if(line[1] === '') {
        break;
      }

      var hobbyRecord = createHobbyRecord(
        line[1],  // friend
        line[6],  // hobby
        line[2],  // area
        line[3]   // timeZone
      );
      arr.push(hobbyRecord);
    }
    
    return arr;
  };
  _class.convertToDataArray = _class.makeDataArray;
  
  return _class;
}
