$(document).ready(function () {

    getGuest()

	

});

function getGuest(){
    $.ajax({
        url: "http://localhost:9999/user/guests",
        method: "GET"
    }).done(function( response){
        if(response.data){
            var html = ""
            for(i=0;i<response.data.length;i++){

                var item = response.data[i]
                html += `<tr>
													<td class="token">${item.id}</td>
													<td><img class="cat-thumb" src="${item.linkImage}"
															alt="clients Image"><span class="name">${item.fullName}</span>
													</td>
													<td>${item.phone}</td>
													<td>${item.email}</td>
													<td>${item.address}</td>
													<td>${item.summary}</td>
													<td>
														<div class="d-flex justify-content-center">
															<button type="button" class="btn-info btn btn-outline-success" onclick="goToDetails(${item.id})"><i
																	class="ri-information-line"></i></button>
															
															<button type="button"
																class="btn btn-outline-success dropdown-toggle" dropdown-toggle-split"
																data-bs-toggle="dropdown" aria-haspopup="true"
																aria-expanded="false" data-display="static">
																<span class="sr-only"><i
																		class="ri-settings-3-line"></i></span>
															</button>
															<div class="dropdown-menu">
																<a class="dropdown-item" href="guest-update.html?id=${item.id}">Update</a>
																<a class="delete-btn dropdown-item" href="#?id=${item.id}">Delete</a>
															</div>
														</div>
													</td>
												</tr>`

            }

			
            $('#list-guests').html(html);

			// // Khởi tạo DataTable
			// $('#guest_table').DataTable({
			// 	data: this.products, // Dữ liệu dùng để hiển thị cho bảng, có thể là array, object ...
			// 	columns: [
			// 		{ data: 'product_category.name' },
			// 		{ data: 'name' },
			// 		{ data: 'slug' },
			// 		{ data: 'quantity' },
			// 		{ data: 'price' },
			// 	], // Các thuộc tính của product sẽ  match với từng collumn
			// 	searching: false, // Mặc định là true, set false để tắt chức năng search
			// 	ordering:  false, // Mặc định là true, set false để tắt chức năng sắp xếp theo collumn
			// 	paging: false, // Mặc định là true, set false để tắt chức năng phân trang
			// 	scrollX: 400, // Nội dụng của table sẽ hiện thị với with 400px, Nếu quá thì sẽ có thanh scroll
			// 	scrollY: 400, // Nội dụng của table sẽ hiện thị với hieght 400px, Nếu quá thì sẽ có thanh scroll
			// 	processing: true,
			// 	info: false, // Tắt thông tin về table VD: Showing 1 to 14 of 14 entries	
			// });

        }

    })
}
function goToDetails(id) {
    window.location.href = `guest-details.html?id=${id}`
}
															