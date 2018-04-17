function transpose(arr) {
  return arr[0].map(function (_, c) { return arr.map(function (r) { return r[c]; }); });
}

function getAreas() {
  return [
    'さばんな',
    'こうざん',
    'みずべ'
  ];
}

function getTimeZones() {
  return [
    '昼',
    '夜'
  ];
}

function getAreaOrder() {
  const areas = getAreas();
  const timeZones = getTimeZones();
  var order = [];
  
  areas.forEach(function(area) {
    timeZones.forEach(function(timeZone) {
      order.push({ 'area': area, 'timeZone': timeZone });
    });
  });
  
  return order;
}

function getAreaOffsets() {
  const areas = getAreas();
  const timeZones = getTimeZones();
  const timeZoneCount = timeZones.length;
  var offsets = {};

  areas.forEach(function(area, index) {
    offsets[area] = timeZoneCount * index;
  });
  
  return offsets;
}

function getTimeZoneOffsets() {
  const timeZones = getTimeZones();
  var offsets = {};
  
  timeZones.forEach(function(timeZone, index) {
    offsets[timeZone] = index;
  });
  
  return offsets;
}

function getFriendNames() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const s = ss.getSheetByName('_基本データ');
  const range = s.getRange('B3:B');
  const values = range.getValues();
  const tValues = transpose(values);
  
  return tValues[0];
}

function getFriendNamesNotSort() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const s = ss.getSheetByName('_基本データ');
  const range = s.getRange('A3:A');
  const values = range.getValues();
  const tValues = transpose(values);
  const arr = tValues[0].filter(function(value) {
    return value !== '';
  });
  
  return arr;
}
