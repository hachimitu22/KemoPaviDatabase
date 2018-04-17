function createPutterBase() {
  return {
    _getRow: function(){ return 1; },
    _getColumn: function(){ return 1; },
    _getMark: function(mark, data) {
      return mark;
    },
    putCheckMark: function(sheet, dataArray, mark, showLog) {
      var self = this;
      var sheetName = sheet.getName();
      var range = sheet.getDataRange();
      var values = range.getValues();
      var tValues = transpose(values);
      var result = { 'success': 0, 'miss': 0 };

      
      dataArray.forEach(function (data) {
        const row = self._getRow(tValues, data);
        const column = self._getColumn(values, data);
        const _mark = self._getMark(mark, data);
        
        if(row >= 1 && column >= 1) {
          values[row - 1][column - 1] = _mark;
//          if(showLog !== 'undefined' && showLog) {
//            self._logSuccess(sheetName, row, column, data, mark);
//          }
          result.success++;
        } else {
          if(showLog !== 'undefined' && showLog) {
            self._logMiss(sheetName, row, column, data, mark);
          }
          result.miss++;
        }
      });
      
      range.setValues(values);

      if(showLog !== 'undefined' && showLog) {
        Logger.log(result);
      }
    },
    _logData: function(data) {
      return [data.friend, data.area, data.timeZone];
    },
    _logSuccess: function(sheetName, row, column, data, mark) {
      Logger.log(['put success', sheetName, row.toString(), column.toString()].concat(this._logData(data)).join(','));
    },
    
    _logMiss: function(sheetName, row, column, data, mark) {
      Logger.log(['put miss', sheetName, row.toString(), column.toString()].concat(this._logData(data)).join(','));
    },
  };
}
