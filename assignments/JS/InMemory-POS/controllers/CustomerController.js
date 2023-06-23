
/*----------Add Customer------------------*/
$("#add").click(function () {
    AddCustomer();

    GetAllCustomers();
    loadAllCustomersForOption();
    // console.log(customerDB);

    // ------- Add Table ------------
    // let table = $("#table");
    //
    // let tr = $('<tr>');
    // let td1 = $('<td>');
    // let td2 = $('<td>');
    // let td3 = $('<td>');
    // let td4 = $('<td>');
    //
    // td1.text(cusDBlist[0]);
    // td2.text(cusDBlist[1]);
    // td3.text(cusDBlist[2]);
    // td4.text(cusDBlist[3]);
    //
    // tr.append(td1);
    // tr.append(td2);
    // tr.append(td3);
    // tr.append(td4);
    //
    // table.append(tr);
});

function GetAllCustomers() {
    $("#CusID").val(generateCustomerID());
    $("#table").empty();
    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;
        let name = customerDB[i].name;
        let address = customerDB[i].address;
        let contact = customerDB[i].contact;

        let flow = ` <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${address}</td>
                <td>${contact}</td>
            </tr>`;


        $("#table").append(flow);
        bindTrEvents();


    }
}


function AddCustomer() {


    let CusId = $("#CusID").val();
    let CusName = $("#CusName").val();
    let cusAddress = $("#Address").val();
    let cusContact = $("#Contact").val();


    /*var customer = {
        id: CusId,
        name: CusName,
        address: cusAddress,
        contact: cusContact
    }*/
    let customer= Object.assign({},customers);
    customer.id=CusId;
    customer.name=CusName;
    customer.address=cusAddress;
    customer.contact=cusContact;

    customerDB.push(customer);

    clearCustomerFields();
    loadAllCustomersForOption();
    GetAllCustomers();
}
//GetAll-----------------


$("#GetAll").click(function () {
    GetAllCustomers();
    clearCustomerFields();
    loadAllCustomersForOption();
});


function bindTrEvents() {
    $("#table").on('click', 'tr', function () {

        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let contact = $(this).children(":eq(3)").text();

        $("#CusID").val(id);
        $("#CusName").val(name);
        $("#Address").val(address);
        $("#Contact").val(contact);
    });
}


/*----------Remove Customer------------------*/
$('#remove').click(function () {
    let id = $('#CusID').val();

    if (confirm("Are you Sure??")) {
        let response = DeleteCustomers(id);
        if (response) {
            alert("Customer Delete?");
            GetAllCustomers();
            clearCustomerFields();
        }else {
            alert("Something went wrong...!!");
        }
    }else {

    }
});

function DeleteCustomers(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id){
            customerDB.splice(i,1);
            return true;
        }
    }
    return false;
}

/*----------Update Customer------------------*/

$("#update").click(function () {

    let id = $("#CusID").val();

    confirm("Do you want update this customer ?")
    let response = updateCustomer(id);

    if(response){
        alert("Customer update success !")
        GetAllCustomers();
        clearCustomerFields();
    }else {
        alert("Something went wrong...!!")
    }
});

function updateCustomer(id) {
    for (let i=0;i<customerDB.length;i++){
        if(customerDB[i].id==id){

            let cusName=$("#CusName").val();
            let address=$("#Address").val();
            let contact=$("#Contact").val();

            customerDB[i].name=cusName;
            customerDB[i].address=address;
            customerDB[i].contact=contact;

            GetAllCustomers();

            return true;
        }

    }

}


function clearCustomerFields(){
    $('#CusName , #Address , #Contact').val(" ");
    $('#CusName').focus();
}


function generateCustomerID() {
    if (customerDB.length > 0) {
        let lastId = customerDB[customerDB.length - 1].id;
        let digit = lastId.substring(6);
        let number = parseInt(digit) + 1;
        return lastId.replace(digit, number);
    } else {
        return "C00-001";
    }
}