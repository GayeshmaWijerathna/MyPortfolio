//-------------Item Table----------------------------------


$("#iAdd").click(function () {
    AddItem();
    GetAllItems();
    loadAllItemsForOption();
});

$("#iGetAll").click(function () {
    GetAllItems();
    loadAllItemsForOption();
});

function GetAllItems(){
    $("#Itemcode").val(generateItemID());

    $("#iTBody").empty();

    for (let i = 0; i < itemListDB.length; i++) {
        let itemCode = itemListDB[i].code;
        let description = itemListDB[i].description;
        let qty = itemListDB[i].qty;
        let unitPrice = itemListDB[i].unitPrice;

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

// function clearItemFields2(){
//     $("#Desc,#qty,#Up").val("");
//     $("#Desc").focus();
// }

function bindItemTrEvents() {
    $("#iTBody").on('click', 'tr', function () {

        let itemCode = $(this).children(":eq(0)").text();
        let description = $(this).children(":eq(1)").text();
        let qty = $(this).children(":eq(2)").text();
        let unitPrice = $(this).children(":eq(3)").text();

        $("#Itemcode").val(itemCode);
        $("#Desc").val(description);
        $("#qty").val(qty);
        $("#Up").val(unitPrice);
    });

}

function AddItem() {

    let itemCode = $("#Itemcode").val();
    let description = $("#Desc").val();
    let qtyOnHand = $("#qty").val();
    let unitPrice = $("#Up").val();


   /* var item = {
        ic: itemCode,
        descript: description,
        qtyoh: qtyOnHand,
        uniPrice: unitPrice
    }

    itemListDB.push(item);
*/

    let newItems=Object.assign({},item);
    newItems.code=itemCode;
    newItems.description=description;
    newItems.qty=qtyOnHand;
    newItems.unitPrice=unitPrice;


    itemListDB.push(newItems);

    clearItemFields();
    GetAllItems();
}

/*----------Remove Item------------------*/
$('#iRemove').click(function () {
    let id = $('#Itemcode').val();

    if (confirm("Are you Sure??")) {
        let response = DeleteItems(id);
        if (response) {
            alert("Delete this Item?");
            GetAllItems();
            clearItemFields();
        }else {
            alert("Something went wrong...!!");
        }
    }else {

    }
});

function DeleteItems(id) {
    for (let i = 0; i < itemListDB.length; i++) {
        if (itemListDB[i].code == id){
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
        clearItemFields();
    }else {
        alert("Something went wrong...!!")
    }
});

function updateItem(id) {
    for (let i=0;i<itemListDB.length;i++){
        if(itemListDB[i].code==id){


            let description=$("#Desc").val();
            let qty=$("#qty").val();
            let uniPrice=$("#Up").val();


            itemListDB[i].description=description;
            itemListDB[i].qty=qty;
            itemListDB[i].unitPrice=uniPrice;


            GetAllItems();

            return true;
        }

    }

}
function generateItemID() {
    if (itemListDB.length > 0) {
        let lastId = itemListDB[itemListDB.length - 1].code;
        let digit = lastId.substring(6);
        let number = parseInt(digit) + 1;
        return lastId.replace(digit, number);
    } else {
        return "I00-001";
    }
}

