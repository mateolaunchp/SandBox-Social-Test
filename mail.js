'use strict';


function appendSuccess() {
  $('#success').innerHTML(
    `<div class="col-12">
      <div class="details-box">
          <p class="paragraph-text-blue">Thank you! You will now remain up to date with SandBox Social.</p>
      </div>
  </div>`);
}

function appendSuccess2() {
  $('#email-form').append(
    `<div class="col-12">
      <div class="details-box">
          <p class="paragraph-text-blue">Thank you! You will now remain up to date with SandBox Social.</p>
      </div>
  </div>`);
}