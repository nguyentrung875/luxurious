$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');

    // Lấy danh sách role từ API và đổ vào dropdown
    function loadRoles(selectedRoleId) {
        $.ajax({
            url: 'http://localhost:9999/role/allrole',  // API lấy danh sách các role
            method: 'GET',
            success: function(response) {
                if (response.statusCode === 200) {
                    let roles = response.data;
                    let roleDropdown = $('#employee-role');
                    roleDropdown.empty();  // Xóa các option cũ
                    roleDropdown.append(`<option value="">-- Select Role --</option>`);

                    $.each(roles, function(index, role) {
                        let selected = role.id === selectedRoleId ? 'selected' : '';
                        roleDropdown.append(`<option value="${role.id}" ${selected}>${role.name}</option>`);
                    });
                } else {
                    console.error('Failed to fetch roles');
                }
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }

    // Gọi API để lấy thông tin hiện tại của nhân viên
    if (employeeId) {
        $.ajax({
            url: `http://localhost:9999/employee/${employeeId}`,  // API lấy thông tin nhân viên
            method: 'GET',
            success: function(response) {
                if (response.statusCode === 200) {
                    let employee = response.data;

                    // Đổ dữ liệu vào form
                    $('#employee-firstname').val(employee.firstname);
                    $('#employee-lastname').val(employee.lastname);
                    $('#employee-dob').val(employee.dob);
                    $('#employee-phone').val(employee.phone);
                    $('#employee-email').val(employee.email);
                    $('#employee-address').val(employee.address);
                    $('#employee-summary').val(employee.summary);

                    // Gọi hàm loadRoles và đổ dữ liệu role vào dropdown (với role hiện tại của nhân viên)
                    loadRoles(employee.roleId);  // Đổ role hiện tại của nhân viên
                } else {
                    console.error('Failed to fetch employee details');
                }
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }

    $('#userUpdate').click(function(e) {
        e.preventDefault();  // Ngăn chặn form submit mặc định
    
            // Kiểm tra dữ liệu
    var isValid = true;
    var message = "";

    // Kiểm tra first name last name (không chứa số hoặc ký tự đặc biệt)
    var nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!$('#employee-firstname').val().match(nameRegex)) {
        message += "Họ không được chứa số hoặc ký tự đặc biệt.\n";
        isValid = false;
    }

    if (!$('#employee-lastname').val().match(nameRegex)) {
        message += "Tên không được chứa số hoặc ký tự đặc biệt.\n";
        isValid = false;
    }

    // Kiểm tra phone (chỉ chứa số)
    var phoneRegex = /^\d+$/;
    if (!$('#employee-phone').val().match(phoneRegex)) {
        message += "Số điện thoại chỉ được chứa số.\n";
        isValid = false;
    }

    // Kiểm tra định dạng dob (yyyy-mm-dd)
    var dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!$('#employee-dob').val().match(dobRegex)) {
        message += "Định dạng ngày sinh phải là yyyy-mm-dd.\n";
        isValid = false;
    }

    // Kiểm tra định dạng email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!$('#employee-email').val().match(emailRegex)) {
        message += "Email chưa đúng định dạng.\n";
        isValid = false;
    }

    // Kiểm tra nếu roleId chưa được chọn
    if (!$('#employee-role').val()) {
        message += "Vui lòng chọn một vai trò.\n";
        isValid = false;
    }

    // Hiển thị thông báo lỗi nếu có
    if (!isValid) {
        alert(message);
        return;
    }


    
        // Tạo đối tượng FormData để upload file hình ảnh cùng các dữ liệu khác
        let formData = new FormData();  // Use FormData for file upload
        formData.append('id', employeeId);
        formData.append('firstname', $('#employee-firstname').val());
        formData.append('lastname', $('#employee-lastname').val());
        formData.append('dob', $('#employee-dob').val());
        formData.append('phone', $('#employee-phone').val());
        formData.append('email', $('#employee-email').val());
        formData.append('address', $('#employee-address').val());
        formData.append('summary', $('#employee-summary').val());
        formData.append('IdRole', $('#employee-role').val());
    
        // Add the image file from the file input (ensure your HTML has an input with id='employee-image')
        let imageFile = $('#imageUpload')[0].files[0];
        if (imageFile) {
            formData.append('image', imageFile);  // Append the image file to FormData
        }else{
            alert('bạn chưa thêm ảnh')
        }
    
        console.log([...formData]);  // Log formData content for debugging
    
        // Gửi yêu cầu cập nhật thông tin và hình ảnh của nhân viên
        $.ajax({
            url: 'http://localhost:9999/employee',  // API cập nhật thông tin nhân viên
            method: 'PUT',
            processData: false,  // Ngăn jQuery xử lý dữ liệu
            contentType: false,  // Ngăn jQuery tự động thiết lập Content-Type
            data: formData,  // Gửi FormData bao gồm cả hình ảnh
            success: function(response) {
                if (response.statusCode === 200) {
                    alert('Employee updated successfully');
                    window.location.href = 'team-list.html';  // Chuyển hướng sau khi cập nhật thành công
                } else {
                    alert('Failed to update employee');
                }
            },
        });
    });
    
});
