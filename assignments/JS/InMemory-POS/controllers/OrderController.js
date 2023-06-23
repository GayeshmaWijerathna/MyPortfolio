/*========================SAVE ORDER=============================*/

$("#btnPurchase").attr('disabled', true);
$("#btnAddToCart").attr('disabled', true);

/*------------Generate new order id---------------*/
function generateOrderID() {
    if (orderList.length > 0) {
        let lastId = orderList[orderList.length - 1].oId;
        let digit = lastId.substring(6);
        let number = parseInt(digit) + 1;
        return lastId.replace(digit, number);
    } else {
        return "ODI-001";
    }
}

/*----------Set date----------------*/
function setCurrentDate() {
    let orderDate = $("#orderDate");
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    orderDate.val(today);
}

/*---------------Customer to combo-------------------*/
function loadAllCustomersForOption() {
    $("#cmbCustomerId").empty();
    for (let cus of customerDB) {
        $("#cmbCustomerId").append(`<option>${cus.id}</option>`);
    }
}

$("#cmbCustomerId").click(function () {
    let rCmbC = customerDB.find(({id}) => id === $("#cmbCustomerId").val());
    $("#customerName").val(rCmbC.name);
    $("#customerAddress").val(rCmbC.address);
    $("#customerContact").val(rCmbC.contact);
});


/*------------Item details-------------*/

let itemCode;
let itemName;
let itemPrice;
let itemQty;
let itemOrderQty;

let total = 0;
let discount = 0;
let subTotal = 0;


/*------------Items to combo-------------*/
function loadAllItemsForOption() {
    $("#cmbItemCode").empty();
    for (let item of itemListDB) {
        $("#cmbItemCode").append(`<option>${item.code}</option>`);
    }
}

$("#cmbItemCode").click(function () {
    let rCmbI = itemListDB.find(({code}) => code === $("#cmbItemCode").val());
    $("#itemName").val(rCmbI.description);
    $("#itemPrice").val(rCmbI.unitPrice);
    $("#qtyOnHand").val(rCmbI.qty);
});


/*------------Place holder-------------*/

let tableRow = [];

$("#btnAddToCart").click(function () {

    let duplicate = false;

    for (let i = 0; i < $("#tblAddToCart tr").length; i++) {
        if ($("#cmbItemCode option:selected").text() === $("#tblAddToCart tr").children(':nth-child(1)')[i].innerText) {
            duplicate = true;

        }
    }
    if (duplicate !== true) {

        loadCartTableDetail();
        reduceQty($("#buyQty").val());
        calcTotal($("#buyQty").val() * $("#itemPrice").val());

    } else if (duplicate === true) {

        manageQtyOnHand(tableRow.children(':nth-child(4)').text(), $("#buyQty").val());
        $(tableRow).children(':nth-child(4)').text($("#buyQty").val());

        manageTotal(tableRow.children(':nth-child(5)').text(), $("#buyQty").val() * $("#itemPrice").val());
        $(tableRow).children(':nth-child(5)').text($("#buyQty").val() * $("#itemPrice").val());

    }

    /*------------table to Place holder ------------*/

    $("#tblAddToCart>tr").click(function () {

        tableRow = $(this);
        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let unitPrice = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();
        let total = $(this).children(":eq(4)").text();

        $("#cmbItemCode").val(itemCode);
        $("#itemName").val(itemName);
        $("#itemPrice").val(unitPrice);
        $("#buyQty").val(qty);
        $("#txtTotal").val(total);

        $("#orderId").val(generateOrderID());

    });

});

/*------------Place holder table load-------------*/

$("#tblAddToCart").empty();

function loadCartTableDetail() {
    itemCode = $("#cmbItemCode").val();
    itemName = $("#itemName").val();
    itemPrice = $("#itemPrice").val();
    itemQty = $("#qtyOnHand").val();
    itemOrderQty = $("#buyQty").val();

    let total = itemPrice * itemOrderQty;
    let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemPrice}</td><td>${itemOrderQty}</td><td>${total}</td></tr>`;

    $("#tblAddToCart").append(row);

}

/*------------Place holder reduce qty-------------*/
function reduceQty(orderQty) {
    let minQty = parseInt(orderQty);
    let reduceQty = parseInt($("#qtyOnHand").val());
    reduceQty = reduceQty - minQty;
    $("#qtyOnHand").val(reduceQty);
}

/*------------Place holder generate total-------------*/

function calcTotal(amount) {
    total += amount;
    $("#txtTotal").val(total);
}

/*------------Place holder manage qty-------------*/
function manageQtyOnHand(preQty, nowQty) {
    var preQty = parseInt(preQty);
    var nowQty = parseInt(nowQty);
    let avaQty = parseInt($("#qtyOnHand").val());

    avaQty = avaQty + preQty;
    avaQty = avaQty - nowQty;

    $("#qtyOnHand").val(avaQty);
}


/*------------Place holder manage total-------------*/

function manageTotal(preTotal, nowTotal) {
    total -= preTotal;
    total += nowTotal;

    $("#txtTotal").val(total);
}

/*------------Place holder generate discount-------------*/

$(document).on("change keyup blur", "#txtDiscount", function () {

    discount = $("#txtDiscount").val();
    discount = (total / 100) * discount;
    subTotal = total - discount;

    $("#txtSubTotal").val(subTotal);
});


/*------------Place holder Cash & balance-------------*/

$(document).on("change keyup blur", "#txtCash", function () {
    let cash = $("#txtCash").val();
    let balance = cash - subTotal;
    $("#txtBalance").val(balance);
    if (balance < 0) {
        $("#lblCheckSubtotal").parent().children('strong').text(balance + " : plz enter valid Balance");
        $("#btnPurchase").attr('disabled', true);
    } else {
        $("#lblCheckSubtotal").parent().children('strong').text("");
        $("#btnPurchase").attr('disabled', false);
    }
});

/*-------place order to array for table 01------------*/
function placeOrder() {
    //create object

    let orderID = $("#orderId").val();
    let customerId = $("#cmbCustomerId").val();
    let orderDate = $("#orderDate").val();
    let subTotal = $("#txtSubTotal").val();
    let discount = $("#txtDiscount").val();

    let newOrder = Object.assign({}, orderObject);
    newOrder.oId = orderID;
    newOrder.cId = customerId;
    newOrder.oDate = orderDate;
    newOrder.subTotal = subTotal;
    newOrder.discount = discount;

    orderList.push(newOrder);

}


/*-------place order to array for table 02------------*/
function pushOrderDetails() {
    for (let i = 0; i < $("#tblAddToCart tr").length; i++) {
        let orderId = $("#orderId").val();
        let cusId = $("#cmbCustomerId").val();

        /*------------get values form cart table--------------------*/
        let itemId = $("#tblAddToCart tr").children(':nth-child(1)')[i].innerText;
        let qty = $("#tblAddToCart tr").children(':nth-child(4)')[i].innerText;
        let total = $("#tblAddToCart tr").children(':nth-child(5)')[i].innerText;

        let newOrder = Object.assign({}, placeOrderObject);
        newOrder.orderId = orderId;
        newOrder.cusId = cusId;
        newOrder.itemId = itemId;
        newOrder.qty = qty;
        newOrder.total = total;

        orderDetails.push(newOrder);

    }
}

/*----------purchase order action------------*/

$("#btnPurchase").click(function () {
    placeOrder();
    pushOrderDetails();
    // $("#orderId").val(generateOrderID());
    clearDetails();
    $("#tblAddToCart").empty();
    setCurrentDate();
    loadAllOrderDetails();

});

/*----------clear rows------------------*/
function clearDetails() {
    $('#cmbCustomerId,#customerName,#customerAddress,#customerContact,#cmbItemCode,#itemName,#itemPrice,#qtyOnHand,#buyQty,#txtDiscount,#txtTotal,#txtDiscount,#txtSubTotal,#txtCash,#txtBalance').val("");

}

/*----------Check qty allows------------------*/
$("#btnClearAll").click(function () {
    clearDetails();
});

$("#btnAddToCart").click(function () {
    $("#orderId").val(generateOrderID());
    let itemIdQ = $("#cmbItemCode").val();
    let response = updateItemQty(itemIdQ);
    if (response) {
    }
});

function updateItemQty(itemIdQ) {
    let itemQ = searchItemQty(itemIdQ);
    if (itemQ != null) {
        itemQ.qty = $("#qtyOnHand").val();
        GetAllItems();
        return true;
    } else {
        return false;
    }
}

function searchItemQty(itemIdQ) {
    for (let itemQ of itemListDB) {
        if (itemQ.code === itemIdQ) {
            return itemQ;
        }
    }
    return null;
}

/*------------Check qty allow------------*/

$(document).on("change keyup blur", "#buyQty", function () {
    let qtyOnHand = $("#qtyOnHand").val();
    let buyQty = $("#buyQty").val();
    let buyOnHand = qtyOnHand - buyQty;
    if (buyOnHand < 0) {
        $("#lblCheckQty").parent().children('strong').text(qtyOnHand + " : Empty Stock..!!");
        $("#btnAddToCart").attr('disabled', true);
    } else {
        $("#lblCheckQty").parent().children('strong').text("");
        $("#btnAddToCart").attr('disabled', false);
    }
});