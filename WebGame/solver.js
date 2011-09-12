function getAnswer(data) {
	var values = {};
	var answer = new Array(data.length);
	for (var i = 0; i < data.length; i++) {
		var color = data[i];
		if (values[color] != null) {
			answer[i] = values[color];
			answer[values[color]] = i;
		} else {
			values[color] = i;
		}
	}
	return answer;
}

var src = document.getElementsByTagName('script')[2].innerHTML;
var cardsStr = src.split('setup(')[1].split(');')[0];
var q = JSON.parse(cardsStr);

var answer = getAnswer(q);
$("#answer").val(answer.join(","));
$("#solve").submit();