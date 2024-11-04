$(document).ready(function () {
    
});


function showStatus() {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://localhost:9999/status",
        headers: {
            "Authorization": "Bearer " + token  // Truyền token vào header
        },
        success: function (response) {
            
        }
    });
}