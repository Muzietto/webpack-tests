const moment = require('moment');

const {
  GOOGLE_SCOPES,
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_DISCOVERY_DOCS,
} = require('./constants');

const { COPERNICO_MEETING_ROOMS } = require('./meetingRooms');

require('./datetimepicker/datetimepicker');
require('./datetimepicker/datetimepicker.css');

moment.locale('it');

const googleAuthButton = document.getElementById('authorize_button');

const busyColor = '#bf3e2f';
const freeColor = '#20825b'
const bookedColor = '#ddaa73';

function handleLoadGoogleApiScript() {

  $('#startDate').dateTimePicker({ selectData: moment() });
  //$('#endDate').dateTimePicker({ selectData: moment().endOf('day').subtract(4, 'hours').add(1, 'minute'), isStartDate: false });

  $('#free').css({ fill: freeColor });
  $('#busy').css({ fill: busyColor });
  $('#booked').css({ fill: bookedColor });

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
    fetchRoomStatus();
  } else {
    googleAuthButton.style.display = 'block';
  }
}

function handleGoogleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

function fetchRoomStatus() {
  const todayStartDateTime = START_DATE;
  const todayEndDateTime = moment(START_DATE).endOf('day'); 

  console.log('cerco con parametri: ', todayStartDateTime.format());

  gapi.client.calendar.freebusy.query({
    items: COPERNICO_MEETING_ROOMS.map(room => ({ id: room.id })),
    timeMin: todayStartDateTime,
    timeMax: todayEndDateTime,
  }).then(function(response) {
    const now = moment();

    if (response && response.result && response.result.calendars) {
      const { calendars } = response.result;

      $('#report').html('');

      Object.keys(calendars).forEach(key => {
        const roomCalendar = calendars[key];
        const isRoomBusy = roomCalendar.busy.filter(busy => (todayStartDateTime.isSameOrAfter(moment(busy.start)) && todayStartDateTime.isSameOrBefore(moment(busy.end))) );
        
        const copernicoMeetingRoom = COPERNICO_MEETING_ROOMS.filter(room => room.id === key)[0];
        const { name, domId } = copernicoMeetingRoom;

        if (isRoomBusy.length > 0) {
          $(`#${domId}`).css({ fill: busyColor });
        } else if (roomCalendar.busy.length > 0) {
          $(`#${domId}`).css({ fill: bookedColor });
        } else {
          $(`#${domId}`).css({ fill: freeColor });
          $(`#${domId}_text > text`).html('');
        }
        console.log(roomCalendar);

        let html = '';
        roomCalendar.busy.forEach(busy => {
          html += `<tspan x="0" dy="1.2em">${moment(busy.start).isSameOrBefore(todayStartDateTime) ? 'fino alle' : `${moment(busy.start).format('LT')} -`} ${moment(busy.end).format('LT')}</tspan>`;
        });
        $(`#${domId}_text > text`).html(html);

      });
    }
    
  });
}

$('#searchBtn').on('click', function() {
  fetchRoomStatus();
});

window.handleLoadGoogleApiScript = handleLoadGoogleApiScript;
