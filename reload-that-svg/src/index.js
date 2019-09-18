const moment = require('moment');

moment.locale('it');

const GOOGLE_CLIENT_ID = '953923587361-l0hislojka0lp6osmgdllr0s0g7gs1vf.apps.googleusercontent.com';
const GOOGLE_API_KEY = 'AIzaSyCAHomCUKuMS48g2g8czmbOmQGpdZIubic';
const GOOGLE_DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const GOOGLE_SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const googleAuthButton = document.getElementById('authorize_button');

$('#main').css({
  border: '3px dashed red',
});

// setTimeout(() => {
//   $('#london text').text('No longer London');
// }, 1000);

// if we want to manipulate svg elements we gotta load https://github.com/kbwood/svg
setTimeout(() => {
  $('#paris').css({ border: '3px solid red' });
}, 2000);

function handleLoadGoogleApiScript() {
  gapi.load('client:auth2', initGoogleClient);
}

function initGoogleClient() {
  gapi.client.init({
    apiKey: GOOGLE_API_KEY,
    clientId: GOOGLE_CLIENT_ID,
    discoveryDocs: GOOGLE_DISCOVERY_DOCS,
    scope: GOOGLE_SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateGoogleAccountStatus);
    // Handle the initial sign-in state.
    updateGoogleAccountStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    googleAuthButton.onclick = handleGoogleAuthClick;
  }, function (error) {
    console.log(error);
  });
}

function updateGoogleAccountStatus(isSignedIn) {
  if (isSignedIn) {
    googleAuthButton.style.display = 'none';
    fetchTodayRoomStatus();
  } else {
    googleAuthButton.style.display = 'block';
  }
}

function handleGoogleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function fetchTodayRoomStatus() {
  const todayStartDateTime = moment().startOf('day');
  const todayEndDateTime = moment().endOf('day'); 

  gapi.client.calendar.freebusy.query({
    items: [
      { id: 'easywelfare.com_3435383934323433353736@resource.calendar.google.com' }, // sala londra
      { id: 'easywelfare.com_3839343236323032353433@resource.calendar.google.com' }, // sala tokio
      { id: 'easywelfare.com_373234383237382d373237@resource.calendar.google.com' }, // sala madrid
      { id: 'easywelfare.com_3438303832363031373735@resource.calendar.google.com' }, // sala a300
      { id: 'easywelfare.com_343630323636352d363735@resource.calendar.google.com' }, // sala berlino
      { id: 'easywelfare.com_3437363934393835393631@resource.calendar.google.com' }  // sala parigi
    ],
    timeMin: todayStartDateTime,
    timeMax: todayEndDateTime,
  }).then(function(response) {
    console.log('freebusy: ', response);

    const now = moment();

    if (response && response.result && response.result.calendars) {
      const { calendars } = response.result;
      const parisRoomBusyCalendar = calendars['easywelfare.com_3437363934393835393631@resource.calendar.google.com'];

      const isParisRoomBusy = parisRoomBusyCalendar.busy.filter(busy => (now.isSameOrAfter(moment(busy.start)) && now.isSameOrBefore(moment(busy.end))) );

      if (isParisRoomBusy.length > 0) {
        $('#paris').css({ fill: "#ff0000" });
      }

      const londonRoomBusyCalendar = calendars['easywelfare.com_3435383934323433353736@resource.calendar.google.com'];

      const isLondonRoomBusy = londonRoomBusyCalendar.busy.filter(busy => (now.isSameOrAfter(moment(busy.start)) && now.isSameOrBefore(moment(busy.end))) );

      if (isLondonRoomBusy.length > 0) {
        $('#london').css({ fill: "#ff0000" });
      }
    }
    
  });
}

$("#paris").on("click",function(){
  console.log('click');
  $("#paris").attr("background","#ff0000");   
});

window.handleLoadGoogleApiScript = handleLoadGoogleApiScript;
