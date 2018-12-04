const TOTAL_DAYS = "24";

function populateTree() {
    let $root = $(".tree ul");
    for (let i = 0; i < SHOWS_SELECTED.length; i++) {
        let show = SHOWS_SELECTED[i];
        let $showli = $("<li>").append($("<label>").text(show.show));
        let $showul = $("<ul>").attr("name",show.show);
        for (let j = 0; j < show.episodes.length; j++) {
            let episodeText = getBottomText(show.episodes[j]) + " " + show.episodes[j].name;
            let episodeName = show.episodes[j].name;
            let episodeNumber = show.episodes[j].episode;
            let episodeSeason = show.episodes[j].season;
            $showul.append($("<li>").text(episodeText).attr({
                "name": episodeName,
                "number": episodeNumber,
                "season": episodeSeason
            }));
        }
        if (show.episodes.length > 0) {
            $root.append($showli.append($showul));
        }
    }
}

function generate(seed) {
    let shows = deepCopy(SHOWS_SELECTED);
    let result = {
        "advent": [],
        "remaining": [],
        "passed": []
    };
    seed = stringTo32BitHash(seed);
    for (let i = 0; i < TOTAL_DAYS; i++) {
        let showCount = shows.length;
        let showNum = Math.floor(randomSeeded(seed, i) * showCount);
        let epCount = shows[showNum].episodes.length;
        let epNum = Math.floor(randomSeeded(seed, i) * epCount);
        let show = shows[showNum];
        let episode = shows[showNum].episodes[epNum];

        result.advent.push(
            {
                "showName": show.show,
                "episodeName": episode.name,
                "season": episode.season,
                "episode": episode.episode,
            }
        );
        show.episodes.splice(epNum, 1);
        if (epCount - 1 === 0) {
            shows.splice(showNum, 1);
        }
    }

    for (let i = 0; i < shows.length; i++) {
        for (let j = 0; j < shows[i].episodes.length; j++) {
            result.remaining.push(
                {
                    "showName": shows[i].show,
                    "episodeName": shows[i].episodes[j].name,
                    "season": shows[i].episodes[j].season,
                    "episode": shows[i].episodes[j].episode,
                }
            );
        }
    }

    return result;
}

function getBottomText(day) {
    let result = "";
    if (day.season !== undefined) {
        result += "s" + day.season;
    }
    if (day.episode !== undefined) {
        result += "e" + day.episode;
    }
    if (day.note !== undefined) {
        result += " " + day.note;
    }
    return result;
}

function pass(calender, dayNo) {
    let randomNo = Math.floor(Math.random() * calender.remaining.length);
    calender.advent[dayNo] = calender.remaining[randomNo];
    calender.remaining.splice(randomNo, 1);
}

function stringTo32BitHash(str){
    const a = 14827;  // Use a prime
    let v = 0;
    for(let i = 0; i < str.length; i += 1){
        v = ((v*a) + str.charCodeAt(i))%0xFFFFFFFF;
    }
    return v;
}

function randomSeeded(seed, position) {
    let x = Math.sin(seed - position) * 10000;
    return x - Math.floor(x);
}

function deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
}
