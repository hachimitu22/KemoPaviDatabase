function getHTML(url){
  var f = UrlFetchApp.fetch(url);
  var myXml = f.getContentText();

  return myXml;
}

function getHtmlTest(){
  const url = 'http://kemono-friendswiki.com/pavilion/index.php?cmd=edit&page=たましいにビンビンくるぜ';
  const xml = getHTML(url);
  
  Logger.log(xml);
}
