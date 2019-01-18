$(document).ready(function() {
    updateVariables();

    $(window).bind("beforeunload",function(event) {
        return ".";
    });
});

function updateVariables() {
    $("#total-quantity").text(getTotalPeople() + " people");
    $("#wfh-quantity").prop("max", getTotalPeople());
}

function onChangeVariables() {
    var $wfhQuantity = $("#wfh-quantity");
    setTimeout(() => {
        $("#min-wfh").text(getMinWfh() + " people");
        $("#min-on-site").text(Math.ceil(getTotalSeats()/2) + " people");
        $wfhQuantity.prop("min", getMinWfh()).prop("max", getMaxWfh());

        if ($wfhQuantity.val() < getMinWfh()) {
            $wfhQuantity.val(getMinWfh());
        }

        if ($wfhQuantity.val() > getMaxWfh()) {
            $wfhQuantity.val(getMaxWfh());
        }
    }, 10)
}

function generate() {
    if (!validateParameters()) {
        alert("Parameters are invalid");
        return false;
    }

    $getMainTBody().empty();

    for (var x = 0; x < $("#wfh-quantity").val(); x++) {
        $getTableRow().appendTo($getMainTBody());
    }

    var slots = $getMainTBody().find("td");
    var counter = Math.round(Math.random() * (getPool().length-1));
    var pillHolder;

    $.each(slots, (idx, obj) => {
        pillHolder = $getPill().text(getPool()[counter%getTotalPeople()]);
        addHover(pillHolder);
        pillHolder.appendTo($(obj));
        counter++;
    });
}

function addHover($obj) {
    $obj.hover(() => {
        $getMainTBody()
            .find(".badge:contains("+$obj.text()+")")
            .removeClass("badge-light")
            .addClass("badge-primary");
    }, () => {
        $getMainTBody()
            .find(".badge-primary")
            .removeClass("badge-primary")
            .addClass("badge-light");

        $getMainTBody()
            .find(".badge-danger")
            .removeClass("badge-light");

        $getMainTBody()
            .find(".badge-warning")
            .removeClass("badge-light");
    });

    $obj.click(() => {
        if ($obj.hasClass("badge-danger") || $obj.hasClass("badge-warning")) {
            $getMainTBody().find(".badge-danger").removeClass("badge-danger").addClass("badge-light");
            $getMainTBody().find(".badge-warning").removeClass("badge-warning").addClass("badge-light");
        } else {
            var $holding = $getMainTBody().find(".badge-danger");
            if ($holding.length > 0) {
                if(validateSwitch($holding, $obj)) {
                    var $aux = $holding.parent();
                    $holding.appendTo($obj.parent());
                    $holding.removeClass("badge-danger").addClass("badge-light");
                    $getMainTBody().find(".badge-warning").removeClass("badge-warning").addClass("badge-light");
                    $obj.appendTo($aux);
                }
            } else {
                $obj.removeClass("badge-light").addClass("badge-danger");
                $getMainTBody().find(".badge-primary").removeClass("badge-light").addClass("badge-warning");
            }
        }
    })
}
