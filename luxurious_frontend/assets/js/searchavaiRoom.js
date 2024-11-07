

$(document).ready(function () {
    $('.result-placeholder').click(function (e) {
        e.preventDefault();

        let checkIn = $('#checkIn').val();
        let checkOut = $('#checkOut').val();
        let adults = $('#adults').val();
        let children = $('#children').val();


        let parsedAdults = parseInt(adults) || 0;
        let parsedChildren = parseInt(children) || 0;
        let totalGuest = parsedAdults + parsedChildren;

        //  if (!checkIn || !checkOut || !adults || children === '') {
        //     alert("Please fill in all fields");
        //     return;
        // }

        let formattedCheckIn = new Date(checkIn).toISOString().split('T')[0];
        let formattedCheckOut = new Date(checkOut).toISOString().split('T')[0];


        // if (formattedCheckIn > formattedCheckOut) {
        //     alert("Invalid check-in date. Check-in date must be less than or equal to check-out date.");

        // } 



        let requestData = {
            "checkIn": formattedCheckIn,
            "checkOut": formattedCheckOut,
            "adultNumber": adults,
            "childrenNumber": children
        };

        console.log(requestData);

        $.ajax({
            url: 'http://localhost:9999/room',
            type: 'GET',
            data: requestData, // Send form-data
            success: function (response) {


                console.log("Response from API:", response.data);

                let totalAvailableRooms = 0;

                response.data.forEach(function (room) {
                    totalAvailableRooms += room.numberAvailable;
                });

                // Store the room data in localStorage
                localStorage.setItem('roomData', JSON.stringify(response.data));
                localStorage.setItem('totalRoom', totalGuest); totalAvailableRooms
                localStorage.setItem('totalAvaiRoom', totalAvailableRooms);
                localStorage.setItem('checkIn', formattedCheckIn)
                localStorage.setItem('checkOut', formattedCheckOut)
                localStorage.setItem('adult', adults)
                localStorage.setItem('children', children)

                // Redirect the user to the room-2.html page
                window.location.href = 'room-2.html';
            },
            error: function (error) {
                if (error.responseJSON && error.responseJSON.message.includes("Check-in date must be before")) {
                    alert('Check-in date must be before check-out date');
                }


                console.error(error);
                //alert("Error: Could not retrieve room data.");
            }
        });
    });
});

$(document).ready(function () {
    let roomData = JSON.parse(localStorage.getItem('roomData'));
    let savedTotalRoom = localStorage.getItem('totalRoom');
    let savedTotalAvaiRoom = localStorage.getItem('totalAvaiRoom');
    

    // if(savedTotalRoom> savedTotalAvaiRoom) {

    // }


    var savedTotalRoom1 = Number(savedTotalRoom);
    var savedTotalAvaiRoom1 = Number(savedTotalAvaiRoom);

    if (savedTotalRoom1 > savedTotalAvaiRoom1) {
        //$('#AvaiRoomMess').text('Số phòng hiện tại không đủ').show();
        //alert('Số phòng hiện tại không đủ')
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Số phòng hiện tại không đủ!',
            footer: '<a href="">Bạn cần hỗ trợ thêm?</a>'
        });
    } else {
        //$('#AvaiRoomMess').hide();
    }

    console.log(roomData);

    let roomsContainer = $('#roomTypeList');

    roomsContainer.empty();

    roomData.forEach(function (room) {
        let roomCard = `
            <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-duration="1500">
                <div class="rooms-card">
                    <img src="${room.image[0]}" alt="room">
                    <div class="details">
                    
                        <h3>${room.roomTypeName}</h3>
                        <h4 style="color:red">${room.numberAvailable} rooms available</h4>
                        <span>$${room.price} / Night</span>
                        <a href="#" class="view-more-btn lh-buttons-2" data-room-id="${room.id}">View More <i class="ri-arrow-right-line"></i></a>
                        <ul>
                            <li><i class="ri-group-line"></i> ${room.capacity} Persons</li>
                            <li><i class="ri-hotel-bed-line"></i> ${room.bedType.name}</li>
                            <li>
    <i class="ri-hotel-line"></i> <!-- Icon hình phòng từ Remix Icon -->
</li>

                            
                            <li><i class="mdi mdi-pool"></i> Swimming Pool</li>
                            <li><i class="ri-wifi-line"></i> Free Wifi</li>
                        </ul>
                        
                    </div>
                </div>
            </div>
        `;
        roomsContainer.append(roomCard);
    });



    $('.view-more-btn').on('click', function (e) {
        e.preventDefault();

        localStorage.removeItem('roomData');

        let checkIn = localStorage.getItem('checkIn')
        let checkOut = localStorage.getItem('checkOut')
        let adult = localStorage.getItem('adult')
        let children = localStorage.getItem('children')
    

        let roomTypeId = $(this).attr('data-room-id');


        console.log(roomTypeId)

        $.ajax({
            url: `http://localhost:9999/roomType/detail/${roomTypeId}`,
            type: 'GET',
            success: function (response) {
                console.log('Room details:', response);

                localStorage.setItem('roomDetails', JSON.stringify(response));

                window.location.href = `room-details.html?in=${checkIn}&out=${checkOut}&adult=${adult}&children=${children}`;
            },
            error: function (xhr, status, error) {

                alert('Failed to retrieve room details. Please try again.');
            }
        });
    });

});





