'use strict';


function handleEarlyAccess() {
    // $('main').on('click', '#primary-btn', function(event) {
    //     event.preventDefault();
    //     $('html,body').animate({
    //         scrollTop: $('.card').offset().top -100
    //     }, 'slow');
    // })
}



function handleExitForm() {
    $('main').on('click', '#exit-btn', function(event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: 0}, 'slow');
    })
}

handleEarlyAccess();
handleExitForm();