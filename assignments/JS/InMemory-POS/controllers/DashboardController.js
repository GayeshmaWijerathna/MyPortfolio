$("DOMContentLoaded", function () {
    $("#home").css("display", 'inline-block');
    $("#customer").css("display", 'none');
    $("#item").css("display", 'none');
    $("#order").css("display", 'none');
    GetAllCustomers();
    GetAllItems();
    $("#CusID").val(generateCustomerID());
    $("#Itemcode").val(generateItemID());
    $("#orderId").val(generateOrderID());
});

$("#homeform").click(function () {
    $("#home").css("display", 'inline-block');
    $("#customer").css("display", 'none');
    $("#item").css("display", 'none');
    $("#order").css("display", 'none');
});

$("#customerform").click(function () {
    $("#home").css("display", 'none');
    $("#customer").css("display", 'inline-block');
    $("#item").css("display", 'none');
    $("#order").css("display", 'none');
});

$("#itemform").click(function () {
    $("#home").css("display", 'none');
    $("#customer").css("display", 'none');
    $("#item").css("display", 'inline-block');
    $("#order").css("display", 'none');

});

$("#orderform").click(function () {
    $("#home").css("display", 'none');
    $("#customer").css("display", 'none');
    $("#item").css("display", 'none');
    $("#order").css("display", 'inline-block');
    setCurrentDate();

});

$("#orderform2").click(function () {
    $("#home").css("display", 'none');
    $("#customer").css("display", 'none');
    $("#item").css("display", 'none');
    $("#order").css("display", 'inline-block');
    setCurrentDate();

});

$("#customerform2").click(function () {
    $("#home").css("display", 'none');
    $("#customer").css("display", 'inline-block');
    $("#item").css("display", 'none');
    $("#order").css("display", 'none');
});

$("#itemform2").click(function () {
    $("#home").css("display", 'none');
    $("#customer").css("display", 'none');
    $("#item").css("display", 'inline-block');
    $("#order").css("display", 'none');
});