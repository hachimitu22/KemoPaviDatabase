

function putWikiToHobby() {
  const ss = SpreadsheetApp.openById("13zPcyfoit4GTv6taWNOImyIVyORwI2_UPskwv698qmk");
  const wikiSheet = ss.getSheetByName('wikiからのコピペ');
//  const friends = getFriendNames();
  const friends = ['サーバル'];

  
  var s = new Date();
//  const values = wikiSheet.getDataRange().getValues();
  const range = wikiSheet.getRange(1, 1, 2121, 31);
//  const range = wikiSheet.getDataRange();
  var e = new Date();
  Logger.log('range: ' + (e-s)/1000);

  s = new Date();
  const values = range.getValues();
//  const values = wikiSheet.getRange(1, 1, 300, 20).getValues();
  e = new Date();
  Logger.log('values: ' + (e-s)/1000);
  
//  var dataArray = createConverterWikiData().makeDataArray(values, friends);

//  createPutterHobby().putCheckMark(ss.getSheetByName('あそびどうぐ'), dataArray, '○', true);
}

function putMeetHistory() {
  const ss = SpreadsheetApp.openById("13zPcyfoit4GTv6taWNOImyIVyORwI2_UPskwv698qmk");
  const meetSheet = ss.getSheetByName('出会った履歴_入力済み');
  const values = meetSheet.getDataRange().getValues();
  
  var dataArray = createConverterMeetList().makeDataArray(values);

  createPutterHobby().putCheckMark(ss.getSheetByName('あそびどうぐ'), dataArray, '○', true);
//  createPutterMaterial().putCheckMark(ss.getSheetByName('持ってくる材料'), dataArray, '○', true);
//  createPutterSpeech().putCheckMark(ss.getSheetByName('セリフ'), dataArray, '○', true);
}

function putAll() {
  putWikiToHobby();
  putMeetHistory();
}
