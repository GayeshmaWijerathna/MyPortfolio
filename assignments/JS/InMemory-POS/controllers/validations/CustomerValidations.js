const CUS_ID_REGEX = /^(C00-)[0-9]{3,}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z0-9 ]{5,}$/;
const CUS_CONTACT_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

let c_vArray = [];
c_vArray.push({field: $("#CusID"), regEx: CUS_ID_REGEX});
c_vArray.push({field: $("#CusName"), regEx: CUS_NAME_REGEX});
c_vArray.push({field: $("#Address"), regEx: CUS_ADDRESS_REGEX});
c_vArray.push({field: $("#Contact"), regEx: CUS_CONTACT_REGEX});

function clearCustomerInputFields() {
    $("#CusID,#CusName,#Address,#Contact").val("");
    $("#CusID,#CusName,#Address,#Contact").css("border", "1px solid #ced4da");
    $("#CusID").focus();
    setBtn();
}

setBtn();

//disable tab
$("#CusID,#CusName,#Address,#Contact").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = c_vArray.indexOf(c_vArray.find((c) => c.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }


    checkValidations(c_vArray[indexNo]);

    setBtn();


    if (e.key == "Enter") {

        if (e.target.id != c_vArray[c_vArray.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidations(c_vArray[indexNo])) {
                c_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(c_vArray[indexNo])) {
                AddCustomer();
            }
        }
    }
});


function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}

function checkAll() {
    for (let i = 0; i < c_vArray.length; i++) {
        if (!checkValidations(c_vArray[i])) return false;
    }
    return true;
}

function setBtn() {
    $("#remove").prop("disabled", true);
    $("#update").prop("disabled", true);

    if (checkAll()) {
        $("#add").prop("disabled", false);
    } else {
        $("#add").prop("disabled", true);
    }

    let id = $("#CusID").val();
    if (checkAll(id) == undefined) {
        $("#remove").prop("disabled", true);
        $("#update").prop("disabled", true);
    } else {
        $("#remove").prop("disabled", false);
        $("#update").prop("disabled", false);
    }

}

