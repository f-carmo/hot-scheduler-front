function validateParameters() {
    const $wfhQtd = $("#wfh-quantity");

    if (
        $wfhQtd.val() > getTotalPeople() ||
        $wfhQtd.val() < getMinWfh() ||
        $wfhQtd.val() > getMaxWfh()
    ) return false;

    return true;
}

function validateSwitch($objA, $target) {
    if ($objA.parent("td").prop("className") === $target.parent("td").prop("className")) {
        alert("Cannot switch to the same day");
        return false;
    }

    if($getMainTBody().find("."+$target.parent("td").prop("className")+" :contains("+$objA.text()+")").length > 0) {
        alert($objA.text() + " is already set in the target day ");
        return false;
    }

    if($getMainTBody().find("."+$objA.parent("td").prop("className")+" :contains("+$target.text()+")").length > 0) {
        alert($target.text() + " already exists on " + $objA.text() + "'s original day");
        return false;
    }

    return true;
}