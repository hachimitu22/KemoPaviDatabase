function createPutterHobby() {
  var _class = createPutterBase();
  
  _class._getRowOffset = function(data) {
    const areaOffset = { 'さばんな': 0, 'こうざん': 2, 'みずべ': 4 }[data.area];
    const timeZoneOffset = { '昼': 0, '夜': 1 }[data.timeZone];
    
    return areaOffset + timeZoneOffset;
  };
  _class._getRow = function(tValues, data) {
    const baseRow = tValues[1].indexOf(data.friend);
    const row = baseRow + this._getRowOffset(data) + 1;
    return row;
  },
  _class._getColumn = function(values, data) {
    const column = values[2].indexOf(data.hobby) + 1;
    return column;
  };
  _class._logData = function(data) {
    return [data.friend, data.area, data.timeZone, data.hobby];
  };
  
  return _class;
}
