$(document).ready( function(){
    loadFunctions();
    loadSwiper();
    disableSeats();
});

//DISABLE RESERVED SEATS
function disableSeats() {
    var seats = $("#selected_seats").val(); //get selected_seat input
    var perSeat = seats.split(','); //store value one by one in an array
    for(var i = 0; i < perSeat.length; i++){ //loop through the array
        $("#"+perSeat[i].trim()).prop( "disabled", true); //disable selected seat
    }
}

//LOAD SWIPER FUNCTION
function loadSwiper() {
    var swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
}

//CONFIRM RESERVATION
$('#confirm').on("click", function(e){
    e.preventDefault();
    window.$("#modalConfirm").modal("hide");
    Swal.fire({
        title: 'SUCCESS!',
        text: "Your ticket has been successfully saved!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.value) {
            $("#form").submit();
        } else {
            $('#form').on('submit',function(){
                return false;
            });
        }
    });
});

//global variables to be used by various functions
var selected = [];

// load functionalities of inputs
function loadFunctions(){
    //seat checkboxes
    $('input[type=checkbox]').click( function(){

        if (!this.checked){
          selected.pop($(this).val());
        }else{
           selected.push($(this).val());
        }
        //modify element content
        $('#selectedseat').val(selected.toString().replace(/,/g,", "));
        $('#modalselectedseat').val(selected.toString().replace(/,/g,", "));
        var count = selected.length;
        $('#count').text(count);
        $('#modalcount').text(count);
        $('#inputmodalcount').val(count);
        var price = $('#price').text();
        var totalPayment = price * count;
        $('#payment').text(totalPayment);
        $('#inputpayment').val(totalPayment);
    });
    //reserve button
    $("#reserveMe").on("click", function(){
        //if no seat selected, do not proceed
        if(selected.length == 0){
            Swal.fire({
                title: "Ooops!",
                text: "There are no seats selected!",
                icon: "warning",
                dangerMode: true,
                button: true,
            }).then(function () {});
        }else{
            window.$("#modalConfirm").modal("show");
        }
    });
}