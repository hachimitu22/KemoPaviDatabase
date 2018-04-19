

function putWikiToHobby() {
  const ss = getInputSpreadSheet();
  const wikiSheet = ss.getSheetByName('wikiからのコピペ');
  const friends = getFriendNames();
//  const friends = ['サーバル'];

  const values = wikiSheet.getDataRange().getValues();

  var dataArray = createConverterWikiData().makeDataArray(values, friends, ['◎', '○', '△']);

  createPutterHobby().putCheckMark(ss.getSheetByName('あそびどうぐ'), dataArray, '○', true);
}

function putMeetHistory() {
  const ss = getInputSpreadSheet();
  const meetSheet = ss.getSheetByName('出会った履歴_入力済み');
  const values = meetSheet.getDataRange().getValues();
  
  var dataArray = createConverterMeetList().makeDataArray(values);

  createPutterHobby().putCheckMark(ss.getSheetByName('あそびどうぐ'), dataArray, '○', true);
}

function putAll() {
  putWikiToHobby();
  putMeetHistory();
}
