function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{name: "消費電力の取得", functionName: "main"}, {name: 'シートの全削除', functionName: '_deleteSheets'}];
  ss.addMenu("DevQuiz", entries);

}

function main() {
  var data = _getData();
  _renderData(data);
}

function _renderData(data) {
  data.forEach(_renderSheet);
}

function _renderSheet(cityData) {
  var cityName = cityData.city_name;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(cityName);
  if (! sheet) {
    sheet = ss.insertSheet(cityName);
  }
  var data = cityData.data;
  sheet.clear();
  var range = sheet.getRange(1, 1, data.length, 3);
  var values = data.map(_getRowData);
  range.setValues(values);
}

function _getRowData(data, i) {
  var capacity = data.capacity;
  var usage = data.usage;
  var rate = (Math.round(usage / capacity * 10000) / 100) + '%';
  return [capacity, usage, rate];
}

function _getData() {
  var url = 'http://gdd-2011-quiz-japan.appspot.com/apps_script/data?param=5447613632407930132';
  var response = UrlFetchApp.fetch(url);
  return Utilities.jsonParse(response.getContentText());
}

function _deleteSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  ss.insertSheet();
  sheets.forEach(function (sheet) {
    ss.setActiveSheet(sheet);
    ss.deleteActiveSheet();
    Utilities.sleep(500); //描画が間に合わない
  });
}