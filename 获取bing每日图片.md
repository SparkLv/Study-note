使用https://jsonp.afeld.me/代理

例如
```js
var uri = encodeURIComponent('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&nc=1516669601712&pid=hp&ensearch=1&video=1&quiz=1&fav=1')
//nc为时间戳
var xhr = new XMLHttpRequest();
xhr.open('get',`https://jsonp.afeld.me/?url=${uri}`,true)
xhr.send()
xhr.onreadystatechange = function () {
  if(xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
```

结果

```json
{"images":[{"startdate":"20180122","fullstartdate":"201801220800","enddate":"20180123","url":"/az/hprichbg/rb/BirdseyeGGB_EN-US12998518634_1920x1080.jpg","urlbase":"/az/hprichbg/rb/BirdseyeGGB_EN-US12998518634","copyright":"Bird’s-eye view of the Golden Gate Bridge, San Francisco, California (© Alex Menendez/Aurora Photos)","copyrightlink":"/search?q=golden+gate+bridge&form=hpcapt&filters=HpDate%3a%2220180122_0800%22","quiz":"/search?q=Bing+homepage+quiz&filters=WQOskey:%22HPQuiz_20180122_BirdseyeGGB%22&FORM=HPQUIZ","wp":true,"hsh":"87e5a09037dcd97363d82def65228421","drk":1,"top":1,"bot":1,"hs":[]}],"tooltips":{"loading":"Loading...","previous":"Previous image","next":"Next image","walle":"This image is not available to download as wallpaper.","walls":"Download this image. Use of this image is restricted to wallpaper only.","play":"Play video","pause":"Pause video"},"quiz":{"question":"Watch your step! What bridge is this?","id":"HPQuiz_20180122_BirdseyeGGB","url":"/search?q=Bing+homepage+quiz&filters=WQOskey%3A%22HPQuiz_20180122_BirdseyeGGB%22&FORM=HPQUIZ","options":[{"text":"Golden Gate Bridge","url":"/search?q=golden+gate+bridge&filters=IsConversation%3A%22True%22+btrequestsource%3A%22homepage%22+WQOskey%3A%22HPQuiz_20180122_BirdseyeGGB%22+WQId%3A%221%22+WQQI%3A%220%22+WQCI%3A%220%22+ShowTimesTaskPaneTrigger%3A%22false%22+WQSCORE%3A%221%22&FORM=HPQUIZ"},{"text":"George Washington Bridge","url":"/search?q=golden+gate+bridge&filters=IsConversation%3A%22True%22+btrequestsource%3A%22homepage%22+WQOskey%3A%22HPQuiz_20180122_BirdseyeGGB%22+WQId%3A%221%22+WQQI%3A%220%22+WQCI%3A%221%22+ShowTimesTaskPaneTrigger%3A%22false%22+WQSCORE%3A%220%22&FORM=HPQUIZ"},{"text":"Brooklyn Bridge","url":"/search?q=golden+gate+bridge&filters=IsConversation%3A%22True%22+btrequestsource%3A%22homepage%22+WQOskey%3A%22HPQuiz_20180122_BirdseyeGGB%22+WQId%3A%221%22+WQQI%3A%220%22+WQCI%3A%222%22+ShowTimesTaskPaneTrigger%3A%22false%22+WQSCORE%3A%220%22&FORM=HPQUIZ"}]},"fav":{"murl":"http://az608707.vo.msecnd.net/files/BirdseyeGGB_EN-US12998518634_1920x1200.jpg","purl":"http://www.bing.com/gallery/#images/BirdseyeGGB"}}
```