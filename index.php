<!DOCTYPE html>
<html>
<head>
    <script src="jquery-3.3.1.min.js"></script>
    <script src="bootstrap.min.js"></script>
    <script src="moment.js"></script>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css">
</head>
<body>
<div class="row form-group">
    <div class="col-md-9">
        <table class="table table-dark">
            <thead>
            <tr>
                <th scope="col">Segunda</th>
                <th scope="col">Terca</th>
                <th scope="col">Quarta</th>
                <th scope="col">Quinta</th>
                <th scope="col">Sexta</th>
            </tr>
            </thead>
            <tbody class="main-tbody">
            <tr>
                <td class="seg"></td>
                <td class="ter"></td>
                <td class="qua"></td>
                <td class="qui"></td>
                <td class="sex"></td>
            </tr>
            <tr>
                <td class="seg"></td>
                <td class="ter"></td>
                <td class="qua"></td>
                <td class="qui"></td>
                <td class="sex"></td>
            </tr>
            <tr>
                <td class="seg"></td>
                <td class="ter"></td>
                <td class="qua"></td>
                <td class="qui"></td>
                <td class="sex"></td>
            </tr>
            <tr>
                <td class="seg"></td>
                <td class="ter"></td>
                <td class="qua"></td>
                <td class="qui"></td>
                <td class="sex"></td>
            </tr>
            <tr>
                <td class="seg"></td>
                <td class="ter"></td>
                <td class="qua"></td>
                <td class="qui"></td>
                <td class="sex"></td>
            </tr>
            <tr>
                <td class="seg"></td>
                <td class="ter"></td>
                <td class="qua"></td>
                <td class="qui"></td>
                <td class="sex"></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="col-md-3">
        <table class="table table-dark">
            <tbody>
                <tr>
                    <th scope="col">People WFH</th>
                    <td id="wfh-quantity">6</td>
                </tr>
                <tr>
                    <th scope="col">People in office</th>
                    <td id="office-quantity">5</td>
                </tr>
                <tr>
                    <th scope="col">Total seats</th>
                    <td id="total-seats">7</td>
                </tr>
                <tr>
                    <th scope="col">Seats available</th>
                    <td id="seats-available">2</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="row form-group">
    <div class="col-md-3">
        <button class="btn btn-dark" onclick="exportICS()">Export ICS</button>
        <button class="btn btn-dark" onclick="exportJSON()">Export JSON</button>
    </div>
</div>

    <div class="text-hide">
        <span id="pill" class="badge badge-pill badge-light" style="cursor: pointer">test</span>
    </div>
</div>
<script>
    var slots = $(".main-tbody").find("td");
    var pill = $("#pill");
    var pool = [
        "Andre Silva",
        "Andre Requejo",
        "Victor",
        "Rafael Ide",
        "Rafael Leal",
        "Romulo",
        "Spencer",
        "Nicholas",
        "Guilherme",
        "John",
        "Doe"
    ];
    var counter = Math.round(Math.random() * (pool.length-1));
    var pillHolder;

    $.each(slots, (idx, obj) => {
        pillHolder = pill.clone().removeAttr("id").text(pool[counter%pool.length]);
        addHover(pillHolder);
        pillHolder.appendTo($(obj));
        counter++;
    });

    function addHover($obj) {
        var $table = $(".main-tbody");

        $obj.hover(() => {
            $table
                .find(".badge:contains("+$obj.text()+")")
                .removeClass("badge-light")
                .addClass("badge-primary");
        }, () => {
            $table
                .find(".badge-primary")
                .removeClass("badge-primary")
                .addClass("badge-light");

            $table
                .find(".badge-danger")
                .removeClass("badge-light");

            $table
                .find(".badge-warning")
                .removeClass("badge-light");
        });

        $obj.click(() => {
            if ($obj.hasClass("badge-danger") || $obj.hasClass("badge-warning")) {
                $table.find(".badge-danger").removeClass("badge-danger").addClass("badge-light");
                $table.find(".badge-warning").removeClass("badge-warning").addClass("badge-light");
            } else {
                var $holding = $table.find(".badge-danger");
                if ($holding.length > 0) {
                    if(validateSwitch($holding, $obj)) {
                        var $aux = $holding.parent();
                        $holding.appendTo($obj.parent());
                        $holding.removeClass("badge-danger").addClass("badge-light");
                        $table.find(".badge-warning").removeClass("badge-warning").addClass("badge-light");
                        $obj.appendTo($aux);
                    }
                } else {
                    $obj.removeClass("badge-light").addClass("badge-danger");
                    $table.find(".badge-primary").removeClass("badge-light").addClass("badge-warning");
                }
            }
        })
    }

    function validateSwitch($objA, $target) {
        if ($objA.parent("td").prop("className") === $target.parent("td").prop("className")) {
            alert("Cannot switch to the same day");
            return false;
        }

        if($(".main-tbody").find("."+$target.parent("td").prop("className")+" :contains("+$objA.text()+")").length > 0) {
            alert("Target day already have " + $objA.text());
            return false;
        }

        return true;
    }

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
        var $slotting = $(".main-tbody").find("td");
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
        exportFile(file, ".txt");
    }

    function exportICS() {
        var file = new Blob([writeIcs(createJSON())], {type: ".ics"});
        exportFile(file, ".ics");
    }

    function exportFile(file, format) {
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


</script>
</body>
<footer>

</footer>
</html>

