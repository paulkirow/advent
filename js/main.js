var CALENDER;

$(document).ready ( function(){
    CALENDER = generate("Christmas 2018");

    let $calender = $(".flex-container");
    let $dayOriginal = $(".day-template li");
    for (let i = 0; i < CALENDER.advent.length; i++) {
        let $day = $dayOriginal.clone();
        $day.find(".flex-item-closed").text(i + 1);
        $day.find("h4").text(CALENDER.advent[i].showName);
        $day.find("h5").text(CALENDER.advent[i].episodeName);
        $day.find("h6").text(getBottomText(CALENDER.advent[i]));
        $day.find(".flipper").addClass("color" + (Math.floor(Math.random() * 5) + 1));
        $calender.append($day);
    }

    $('.calender li').click(function() {
        $(this).toggleClass("flip")
    });
});