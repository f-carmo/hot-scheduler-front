function mapNextWeek() {
    return {
        "seg": moment().add(1, 'weeks').isoWeekday(1).format("YYYYMMDD"),
        "ter": moment().add(1, 'weeks').isoWeekday(2).format("YYYYMMDD"),
        "qua": moment().add(1, 'weeks').isoWeekday(3).format("YYYYMMDD"),
        "qui": moment().add(1, 'weeks').isoWeekday(4).format("YYYYMMDD"),
        "sex": moment().add(1, 'weeks').isoWeekday(5).format("YYYYMMDD")
    };
}

function createJSON() {
    var $slotting = $getMainTBody().find("td");
    var json = [];
    var nextWeekDates = mapNextWeek();
    $.each($slotting, (idx, obj) => {
        json.push({
            'summary': $(obj).text(),
            'start': {
                'date': nextWeekDates[$(obj).prop("className")]
            },
            'end': {
                'date': nextWeekDates[$(obj).prop("className")]
            }
        })
    });

    return json;
}

function exportJSON() {
    var file = new Blob([JSON.stringify(createJSON())], {type: ".txt"});
    downloadFile(file, ".txt");
}

function exportICS() {
    var file = new Blob([writeIcs(createJSON())], {type: ".ics"});
    downloadFile(file, ".ics");
}

function downloadFile(file, format) {
    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = "day " + moment().add(1, 'weeks').isoWeekday(1).format("MM-DD") + " to " +moment().add(1, 'weeks').isoWeekday(5).format("MM-DD") + format;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function writeIcs(json) {
    var baseStart = "" +
        "BEGIN:VCALENDAR\n" +
        "PRODID:-//Google Inc//Google Calendar 70.9054//EN\n" +
        "VERSION:2.0\n" +
        "CALSCALE:GREGORIAN\n" +
        "METHOD:PUBLISH\n" +
        "X-WR-CALNAME:Hot Seats\n" +
        "X-WR-TIMEZONE:America/Sao_Paulo\n";
    var baseEnd = "END:VCALENDAR\n";

    $.each(json, (idx, obj) => {
        baseStart +=
            "BEGIN:VEVENT\n" +
            "DTSTART;VALUE=DATE:"+obj.start.date+"\n" +
            "DTEND;VALUE=DATE:"+obj.end.date+"\n" +
            "DTSTAMP:20190101T050000Z\n" +
            "CREATED:20190101T050000Z\n" +
            "DESCRIPTION:\n" +
            "LAST-MODIFIED:20190101T050000Z\n" +
            "LOCATION:\n" +
            "SEQUENCE:0\n" +
            "STATUS:CONFIRMED\n" +
            "SUMMARY:"+obj.summary+"\n" +
            "TRANSP:TRANSPARENT\n" +
            "END:VEVENT\n"
    })

    return baseStart + baseEnd;
}