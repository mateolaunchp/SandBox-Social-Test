(function (a, s, y, n, c, h, i, d, e) {
  s.className += ' ' + y; h.start = 1 * new Date;
  h.end = i = function () {
    s.className = s.className.replace(RegExp(' ?' + y), '');
  };
  (a[n] = a[n] || []).hide = h;
  setTimeout(function () {
    i(); h.end = null
  }, c);
  h.timeout = c;
})(window, document.documentElement, 'async-hide', 'dataLayer', 4000, { 'GTM-K3F7JLQ': true });

// Google Tag Manager
(function (w, d, s, l, i) {
  w[l] = w[l] || []; w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-MRGNC76');

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'UA-97380656-5');

/**
  * Function that registers a click on an outbound link in Analytics.
  * This function takes a valid URL string as an argument, and uses that URL string
  * as the event label. Setting the transport method to 'beacon' lets the hit be sent
  * using 'navigator.sendBeacon' in browser that support it.
  */
var getOutboundLink = function (url) {
  gtag('event', 'click', {
    'event_category': 'outbound',
    'event_label': url,
    'transport_type': 'beacon',
    'event_callback': function () { document.location = url; }
  });
}

var userClickedCTA = function (which) {
  gtag('event', 'ctaClick', {
    'event_category': 'Homepage CTA Click',
    'event_label': which
    // 'transport_type': 'beacon',
    // 'event_callback': function(){document.location = url;}
  });
}

var hamburgerOpen = false;
var myFunction = function () {
  var links = document.getElementById("myLinks");
  var hamburgerBlue = document.getElementById("hamburger-contain");
  var hamburgerIcon = document.getElementById("hamburger");
  var xButton = document.getElementById("x-button");
  if (hamburgerOpen) {
    hamburgerOpen = false;
    links.style.display = "none";
    hamburgerIcon.style.display = "block";
    xButton.style.display = "none";
    hamburgerBlue.className = 'min-blue';
  } else {
    hamburgerOpen = true;
    links.style.display = "block";
    hamburgerIcon.style.display = "none";
    xButton.style.display = "block";
    hamburgerBlue.className = 'max-blue';
  }
}

var canCheck = true;
var handleScroll = function () {
  if (canCheck) {
    console.log('scrolling!');
    var windowCenter = $(window).width() / 2;
    var errorRange = $(window).width() / 6;
    var quote1 = document.getElementById("quote1");
    var quote2 = document.getElementById("quote2");
    var quote3 = document.getElementById("quote3");
    var quote4 = document.getElementById("quote4");
    var offset1 = $('#quote1').offset().left;
    var offset2 = $('#quote2').offset().left;
    var offset3 = $('#quote3').offset().left;
    var offset4 = $('#quote4').offset().left;
    if (Number(offset1 - errorRange) <= windowCenter && Number(offset1 + errorRange) >= windowCenter) {
      console.log('quote 1 is in center');
      quote1.className = 'quote-box-large';
    } else {
      quote1.className = 'quote-box';
    }
  }
}
//      setInterval(function() {
//        // handleScroll();
//      }, 500);
var handleLink = function (link) {
  window.open(link);
}
var mailchimp = function() {
  var email = $("#email4").val();
  if (email && email.indexOf('@') > -1) {
    var data = {
      data: {
        "email_address": email,
        "status": "subscribed"
      }
    };
    var url = 'https://webbackend.sandboxcommerce.com/api/mailchimp/sandboxHomepage';
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(response => {
        // alert(JSON.stringify(response));
        if (response) {
          swal("Thank you! You will now remain up to date with SandBox Social.");
        }
      })
      .catch((err) => {
        throw (err);
      });
  } else {
    swal("Please enter a valid email address.");
  }
};

setTimeout(function () {
  var barrier1 = document.getElementById("barrier1");
  if (barrier1) {
    barrier1.className = 'slide-up';
  }
  var barrier2 = document.getElementById("barrier2");
  if (barrier2) {
    barrier2.className = 'slide-up';
  }
  var barrier3 = document.getElementById("barrier3");
  if (barrier3) {
    barrier3.className = 'slide-up';
  }
  var barrier4 = document.getElementById("barrier4");
  if (barrier4) {
    barrier4.className = 'slide-right';
  }
}, 500);

// Service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('service-worker.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    }).catch(function (err) {
      // console.log(err)
    });
  });
} else {
  // console.log('service worker is not supported');
}