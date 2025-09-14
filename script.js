function loadProducts(keyword = "") {
    $.ajax({
        url: "https://web.bisx.app/_webservice/getProductList.php",
        type: "POST",
        data: JSON.stringify({ keyProductName: keyword }),
        contentType: "application/json",
        success: function (response) {
            // เคลียร์ตารางก่อน
            $("#productTable tbody").empty();

            // นับจำนวนสินค้า 
            let count = response.datalist ? response.datalist.length : 0;
            $("#productCount").text("พบสินค้า " + count + " รายการ");

            // เช็คว่ามี datalist กลับมาไหม
            if (response.datalist && response.datalist.length > 0) {
                response.datalist.forEach(function (item) {
                    let row = `
            <tr>
              <td><img src="https://web.bisx.app/image_product/${item.pro_image}"></td>
              <td class="num">${item.pro_id}</td>
              <td>${item.pro_name}</td>
              <td>${item.protype_name}</td>
              <td class="num">${item.pro_price}</td>
              <td>${item.pro_num}</td>
            </tr>
          `;
                    $("#productTable tbody").append(row);
                });
            } else {
                $("#productTable tbody").append("<tr><td colspan='6'>ไม่พบข้อมูล</td></tr>");
            }
        },
        error: function () {
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
        }
    });
}

// โหลดสินค้าทั้งหมดตอนเปิดเว็บ
$(document).ready(function () {
    loadProducts();

    // เมื่อกดปุ่มค้นหา
    $("#btnSearch").click(function () {
        let keyword = $("#searchBox").val();
        loadProducts(keyword);
    });

    // เมื่อกดปุ่มล้าง
    $("#btnClear").click(function () {
        $("#searchBox").val("");
        loadProducts();
    });

    // กด Enter เพื่อค้นหา
    $("#searchBox").keypress(function (e) {
        if (e.which === 13) {
            $("#btnSearch").click();
        }
    });
});
