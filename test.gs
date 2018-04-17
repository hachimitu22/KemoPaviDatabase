function createTest(category) {
  return {
    category: category,
    suite: function (description, callback) {
      Logger.log(this.category + ': test suite - ' + description + ':');
      callback();
    },
    
    assert: function(expect, actual) {
      if(expect === actual) {
        //    Logger.log('green');
      } else {
        Logger.log('test suite - red: ' + expect + " : " + actual);
      }
    },
  };
}

function converterTest() {
  var test = createTest('converter');
  
  test.suite('createConverterWikiData', function() {
    const friends = ['サーバル'];
    const values = [
      ('サーバル						').split('	'),
      ('手まり*	◎					').split('	'),
      ('ネズミのおもちゃ*	○	○		？		').split('	'),
      ('金のネズミのおもちゃ*	△	○				').split('	'),
    ];
    
    var dataArray = createConverterWikiData().makeDataArray(values, friends);

    test.assert(5, dataArray.length);
    test.assert('手まり', dataArray[0].hobby); // 手まり さばんな 昼
    test.assert('さばんな', dataArray[0].area); // 手まり さばんな 昼
    test.assert('昼', dataArray[0].timeZone); // 手まり さばんな 昼

    test.assert('ネズミのおもちゃ', dataArray[1].hobby); // ネズミのおもちゃ さばんな 昼
    test.assert('さばんな', dataArray[1].area); // ネズミのおもちゃ さばんな 昼
    test.assert('昼', dataArray[1].timeZone); // ネズミのおもちゃ さばんな 昼

    test.assert('ネズミのおもちゃ', dataArray[2].hobby); // ネズミのおもちゃ さばんな 夜
    test.assert('さばんな', dataArray[2].area); // ネズミのおもちゃ さばんな 夜
    test.assert('夜', dataArray[2].timeZone); // ネズミのおもちゃ さばんな 夜

    test.assert('金のネズミのおもちゃ', dataArray[3].hobby); // 金のネズミのおもちゃ さばんな 昼
    test.assert('さばんな', dataArray[3].area); // 金のネズミのおもちゃ さばんな 昼
    test.assert('昼', dataArray[3].timeZone); // 金のネズミのおもちゃ さばんな 昼

    test.assert('金のネズミのおもちゃ', dataArray[4].hobby); // 金のネズミのおもちゃ さばんな 夜
    test.assert('さばんな', dataArray[4].area); // 金のネズミのおもちゃ さばんな 夜
    test.assert('夜', dataArray[4].timeZone); // 金のネズミのおもちゃ さばんな 夜
  });
  test.suite('createConverterMeetList', function() {
    const friends = ['サーバル'];
    const values = [
      ('	誰でも書いていいよ、むしろ追加してくだしあ										').split('	'),
      ('	フレンズ	エリア	時間帯	パビリコイン	材料	あそびどうぐ	あーかいぶLv	回数	ぱびりおんLv	セリフ	珍しい行動').split('	'),
      ('	ジャガー	さばんな	夜	3	やわらかい布	土管	15	86	17	川を渡る子、いるかな？	なし').split('	'),
      ('	ライオン	さばんな	夜	3	しっかりした木	セルリアンバッグ	7	24	17	それ、おもしろそうだなー！	なし').split('	'),
      ('											').split('	'),
    ];
    
    var dataArray = createConverterMeetList().makeDataArray(values, friends);

    test.assert(2, dataArray.length);
    test.assert('ジャガー', dataArray[0].friend);
    test.assert('さばんな', dataArray[0].area);
    test.assert('夜', dataArray[0].timeZone);
    test.assert('やわらかい布', dataArray[0].material);
    test.assert('土管', dataArray[0].hobby);
    test.assert('川を渡る子、いるかな？', dataArray[0].speech);

    test.assert('ライオン', dataArray[1].friend);
    test.assert('さばんな', dataArray[1].area);
    test.assert('夜', dataArray[1].timeZone);
    test.assert('しっかりした木', dataArray[1].material);
    test.assert('セルリアンバッグ', dataArray[1].hobby);
    test.assert('それ、おもしろそうだなー！', dataArray[1].speech);
  });
}

function putterTest() {
  var test = createTest('putter');
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  const friends = ['サーバル'];
  const values = [
    '	誰でも書いていいよ、むしろ追加してくだしあ										'.split('	'),
    '	フレンズ	エリア	時間帯	パビリコイン	材料	あそびどうぐ	あーかいぶLv	回数	ぱびりおんLv	セリフ	珍しい行動'.split('	'),
    '	ジャガー	さばんな	夜	3	やわらかい布	土管	15	86	17	川を渡る子、いるかな？	なし'.split('	'),
    '	ライオン	さばんな	夜	3	しっかりした木	セルリアンバッグ	7	24	17	それ、おもしろそうだなー！	なし'.split('	')
  ];
  var dataArray = createConverterMeetList().makeDataArray(values, friends);
  
  test.suite('createPutterHobby', function() {
    var s = ss.getSheetByName('あそびどうぐ_test')
    
    s.getRange('E4:DI189').clearContent();
    createPutterHobby().putCheckMark(s, dataArray, 'x', true);
    
    test.assert(2, dataArray.length);
    test.assert(s.getRange('CZ47').getValue(), 'x');
    test.assert(s.getRange('AI71').getValue(), 'x');
  });
}
