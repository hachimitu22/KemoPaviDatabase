var _commondata = {};

function transpose(arr) {
  return arr[0].map(function (_, c) { return arr.map(function (r) { return r[c]; }); });
}

function getInputSpreadSheet() {
  if(!_commondata.inputSpreadSheet) {
    const ss = SpreadsheetApp.openById('1cAujeky_O_8bIz8vUZoyQC4VCXVh5l9G3lD6ph9ckFk');
    _commondata.inputSpreadSheet = ss;
  }
  
  return _commondata.inputSpreadSheet;
}

function getAreas() {
  if(!_commondata.areas) {
    const ss = getInputSpreadSheet();
    const s = ss.getSheetByName('_基本データ');
    const range = s.getRange('C3:C');
    const values = range.getValues();

    _commondata.areas = values;
  }
  
  return _commondata.areas;
}

function getTimeZones() {
  if(!_commondata.timeZones) {
    const ss = getInputSpreadSheet();
    const s = ss.getSheetByName('_基本データ');
    const range = s.getRange('D3:D');
    const values = range.getValues();

    _commondata.timeZones = values;
  }
  
  return _commondata.timeZones;
}

function getAreaOrder() {
  if(!_commondata.areaOrder) {
    const areas = getAreas();
    const timeZones = getTimeZones();
    var order = [];
    
    areas.forEach(function(area) {
      timeZones.forEach(function(timeZone) {
        order.push({ 'area': area, 'timeZone': timeZone });
      });
    });
    
    _commondata.areaOrder = order;
  }
  
  return _commondata.areaOrder;
}

function getAreaOffsets() {
  if(!_commondata.areaOffsets) {
    const areas = getAreas();
    const timeZones = getTimeZones();
    const timeZoneCount = timeZones.length;
    var offsets = {};
    
    areas.forEach(function(area, index) {
      offsets[area] = timeZoneCount * index;
    });
    
    _commondata.areaOffsets = offsets;
  }
  
  return _commondata.areaOffsets;
}

function getTimeZoneOffsets() {
  if(!_commondata.timeZoneOffsets) {
    const timeZones = getTimeZones();
    var offsets = {};
    
    timeZones.forEach(function(timeZone, index) {
      offsets[timeZone] = index;
    });
    
    _commondata.timeZoneOffsets = offsets;
  }
  
  return _commondata.timeZoneOffsets;
}

function getFriendNames() {
  if(!_commondata.FriendNames) {
    const ss = getInputSpreadSheet();
    const s = ss.getSheetByName('_基本データ');
    const range = s.getRange('B3:B');
    const values = range.getValues();
    const tValues = transpose(values);

    _commondata.FriendNames = tValues;
  }
  
  return _commondata.FriendNames;
}

function getFriendNamesNotSort() {
  if(!_commondata.FriendNamesNotSort) {
    const ss = getInputSpreadSheet();
    const s = ss.getSheetByName('_基本データ');
    const range = s.getRange('A3:A');
    const values = range.getValues();
    const tValues = transpose(values);

    _commondata.FriendNamesNotSort = tValues;
  }
  
  return _commondata.FriendNamesNotSort;
}
