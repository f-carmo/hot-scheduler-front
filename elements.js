function $getTableRow() {
    var $dayHtml = $("#day").clone();
    $dayHtml.removeProp("id");
    return $dayHtml;
}

function $getPill() {
    var $pill = $("#pill").clone();
    $pill.removeProp("id");
    return $pill;
}