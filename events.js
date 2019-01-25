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
                var $aux = $holding.parent();
                $holding.appendTo($obj.parent());
                $holding.removeClass("badge-danger").addClass("badge-light");
                $getMainTBody().find(".badge-warning").removeClass("badge-warning").addClass("badge-light");
                $obj.appendTo($aux);
            } else {
                $obj.removeClass("badge-light").addClass("badge-danger");
                $getMainTBody().find(".badge-primary").removeClass("badge-light").addClass("badge-warning");
            }
        }
    })
}

function addSwitchTableEvent($pill) {
    $pill.click(() => {
        var $holding = $getMainTBody().find(".badge-danger");
        if ($holding.length > 0) {
            $holding.text($pill.text());
            $holding.removeClass("badge-danger").addClass("badge-light");
            $getMainTBody().find(".badge-warning").removeClass("badge-warning").addClass("badge-light");
        }
    });

}

function switchCustom($saveBtn) {
    var $holding = $getMainTBody().find(".badge-danger");
    var $input = $saveBtn.parent().parent().find("input").first();
    if ($holding.length > 0) {
        $holding.text($input.val());
        $holding.removeClass("badge-danger").addClass("badge-light");
        $getMainTBody().find(".badge-warning").removeClass("badge-warning").addClass("badge-light");
    }
}

function validateNumberInput($input) {
    $input.off('change');

    $input.on('change', (e) => {
        const changedTo = $(e.target).val();

        if ($(e.target).attr("max") < changedTo) {
            $(e.target).val($(e.target).attr("max"));
        }

        if ($(e.target).attr("min") > changedTo) {
            $(e.target).val($(e.target).attr("min"));
        }
    });
}