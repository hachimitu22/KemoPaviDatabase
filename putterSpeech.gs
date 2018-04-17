function createPutterSpeech() {
  var _class = createPutterBase();
  
  _class._getRow = function(tValues, data) {
    const index = tValues[1].indexOf(data.friend);
    const offset = tValues[2].slice(index, index + 6).indexOf(data.speech);
    const row = index + offset + 1;
    return row;
  },
  _class._getColumn = function(values, data) {
    const column = values[1].indexOf(data.area) + { '昼': 0, '夜': 1 }[data.timeZone] + 1;
    return column;
  };
  _class._logData = function(data) {
    return [data.friend, data.area, data.timeZone, data.speech];
  };
  
  return _class;
}
