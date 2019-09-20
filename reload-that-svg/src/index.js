const moment = require('moment');

const {
  GOOGLE_SCOPES,
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_DISCOVERY_DOCS,
} = require('./constants');

const { COPERNICO_MEETING_ROOMS } = require('./meetingRooms');

moment.locale('it');

const googleAuthButton = document.getElementById('authorize_button');

$('#main').css({
  border: '3px dashed red',
});

// setTimeout(() => {
//   $('#london text').text('No longer London');
// }, 1000);
// if we want to manipulate svg elements we gotta load https://github.com/kbwood/svg

function handleLoadGoogleApiScript() {

  moment().startOf('day');
  
  $("#startDate").val(moment().startOf('day').add(8, 'hours').format("YYYY-MM-DD[T]HH:mm"));
  $("#endDate").val(moment().endOf('day').subtract(4, 'hours').add(1, 'minute').format("YYYY-MM-DD[T]HH:mm"));

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

function handleGoogleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

function fetchTodayRoomStatus() {
  const todayStartDateTime = moment($("#startDate").val());
  const todayEndDateTime = moment($("#endDate").val()); 

  console.log('cerco con parametri: ', todayStartDateTime, todayEndDateTime);

  gapi.client.calendar.freebusy.query({
    items: COPERNICO_MEETING_ROOMS.map(room => ({ id: room.id })),
    timeMin: todayStartDateTime,
    timeMax: todayEndDateTime,
  }).then(function(response) {
    const now = moment();

    if (response && response.result && response.result.calendars) {
      const { calendars } = response.result;

      console.log('calendars: ', calendars);

      $('#report').html('');

      Object.keys(calendars).forEach(key => {
        const roomCalendar = calendars[key];
        const isRoomBusy = roomCalendar.busy.filter(busy => (now.isSameOrAfter(moment(busy.start)) && now.isSameOrBefore(moment(busy.end))) );
        
        const copernicoMeetingRoom = COPERNICO_MEETING_ROOMS.filter(room => room.id === key)[0];
        const { name, domId } = copernicoMeetingRoom;

        if (isRoomBusy.length > 0) {
          console.log(isRoomBusy);
          moment(isRoomBusy[0].start).format('lll');
          $(`#${domId}`).css({ fill: "#ff0000" });
          
          $('#report').append(`
            <b>${name.charAt(0).toUpperCase() + name.substring(1, name.length)}</b> -> Libera dalle ore ${moment(isRoomBusy[0].end).format('LT')}<br>
          `);
        } else {
          $(`#${domId}`).css({ fill: "#000000" });
        }

      });
    }
    
  });
}

$("#paris").on("click",function(){
  console.log('click');
  $("#paris").attr("background","#ff0000");   
});

$('#searchBtn').on('click', function() {
  fetchTodayRoomStatus();
});

window.handleLoadGoogleApiScript = handleLoadGoogleApiScript;
