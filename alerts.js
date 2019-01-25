function addExcessAllocationMessage(weekDayClass) {

    $("<span style='color: red'>Too many people allocated to " + translateWeekDayClass(weekDayClass) +"</span><br/>").appendTo("#alert-box")
}

function translateWeekDayClass(weekDayClass) {
    switch (weekDayClass) {
        case '.seg':
            return "Monday";
        case '.ter':
            return "Tuesday";
        case '.qua':
            return "Wednesday";
        case '.qui':
            return "Thursday";
        case '.sex':
            return "Friday";
    }
}