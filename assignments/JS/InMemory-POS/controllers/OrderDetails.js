function loadAllOrderDetails() {

    $("#TbodyPlaceOrderDetail").empty();

    for (let orderDetail of orderDetails) {

        let row = `<tr><td>${orderDetail.orderId}</td><td>${orderDetail.cusId}</td><td>${orderDetail.itemId}</td>
        <td>${orderDetail.qty}</td><td>${orderDetail.total}</td></tr>`;
        $("#TbodyPlaceOrderDetail").append(row);
    }


}