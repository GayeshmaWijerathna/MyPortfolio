//-------------Item Table----------------------------------


$("#iAdd").click(function () {
    let itemCode = $("#Itemcode").val();
    let description = $("#Desc").val();
    let qty = $("#qty").val();
    let unitPrice = $("#Up").val();
    // console.log(itemCode,CusName,address,contact);

    var item = {
        iCode: itemCode,
        desc: description,
        qty1: qty,
        uPrice: unitPrice
    }

    itemList.push(item);
    GetAllItems();
    // let itemTable = $("#iTBody");
    //
    // let tr = $('<tr>');
    // let td1 = $('<td>');
    // let td2 = $('<td>');
    // let td3 = $('<td>');
    // let td4 = $('<td>');
    //
    // td1.text(itemCode);
    // td2.text(description);
    // td3.text(qty);
    // td4.text(unitPrice);
    //
    // tr.append(td1);
    // tr.append(td2);
    // tr.append(td3);
    // tr.append(td4);
    //
    // itemTable.append(tr);
});

$("#iGetAll").click(function () {
    GetAllItems();
});

function GetAllItems(){
    $("#iTBody").empty();

    for (let i = 0; i < itemList.length; i++) {
        let itemCode = itemList[i].iCode;
        let description = itemList[i].desc;
        let qty = itemList[i].qty1;
        let unitPrice = itemList[i].uPrice;

        let list = ` <tr>
                <td>${itemCode}</td>
                <td>${description}</td>
                <td>${qty}</td>
                <td>${unitPrice}</td>
            </tr>`;


        $("#iTBody").append(list);

        bindItemTrEvents();
    }

}

function bindItemTrEvents() {
    $("#iTBody").on('click', 'tr', function () {

        let itemCode = $(this).children(":eq(0)").text();
        let description = $(this).children(":eq(1)").text();
        let qty = $(this).children(":eq(2)").text();
        let contact = $(this).children(":eq(3)").text();

        $("#Itemcode").val(itemCode);
        $("#Desc").val(description);
        $("#qty").val(qty);
        $("#Up").val(contact);
    });

}


function AddItem() {
    let itemCode = $("#Itemcode").val();
    let description = $("#Desc").val();
    let qtyOnHand = $("#qty").val();
    let unitPrice = $("#Up").val();


    var item = {
        ic: itemCode,
        descript: description,
        qtyoh: qtyOnHand,
        uniPrice: unitPrice
    }

    itemListDB.push(item);

    clearItemInputFields();

    GetAllItems();

}

/*----------Remove Item------------------*/
$('#iRemove').click(function () {
    let id = $('#Itemcode').val();

    if (confirm("Are you Sure??")) {
        let response = DeleteCustomers(id);
        if (response) {
            alert("Delete this Item?");
            GetAllItems();
            clearItemInputFields();
        }else {
            alert("Something went wrong...!!");
        }
    }else {

    }
});

function DeleteItems(id) {
    for (let i = 0; i < itemListDB.length; i++) {
        if (itemListDB[i].id == id){
            itemListDB.splice(i,1);
            return true;
        }
    }
    return false;
}

/*----------Update Item------------------*/

$("#iUpdate").click(function () {

    let id = $("#Itemcode").val();

    confirm("Do you want update this Item ?")
    let response = updateItem(id);

    if(response){
        alert("Item update success !")
        GetAllItems();
        clearItemInputFields();
    }else {
        alert("Something went wrong...!!")
    }
});

function updateItem(id) {
    for (let i=0;i<itemListDB.length;i++){
        if(itemListDB[i].id==id){

            let itemCode=$("#Itemcode").val();
            let description=$("#Desc").val();
            let uniPrice=$("#Up").val();

            itemListDB[i].name=itemCode;
            itemListDB[i].address=description;
            itemListDB[i].contact=uniPrice;

            GetAllItems();

            return true;
        }

    }

}

