const moment = require('moment');

(function($) {
  'use strict';
  $.fn.dateTimePicker = function(options) {

    const settings = $.extend({
      selectData: 'now',
      dateFormat: 'DD-MM-YYYY HH:mm',
      showTime: true,
      locale: 'it',
      positionShift: { top: 20, left: 0 },
      title: 'Select Date and Time',
      buttonTitle: 'Select',
      isStartDate: true,
    }, options);
    moment.locale(settings.locale);
    const elem = this;
    const limitation = { hour: 23, minute: 59 };
    let mousedown = false;
    let timeout = 800;
    // eslint-disable-next-line eqeqeq
    let selectDate = settings.selectData == 'now' ? moment() : moment(settings.selectData, settings.dateFormat);
    // if (selectDate < moment()) {
    //     selectDate = moment();
    // }
    START_DATE = selectDate;

    const startDate = copyDate(moment());
    let lastSelected = copyDate(selectDate);
    return this.each(() => {
      // eslint-disable-next-line eqeqeq
      if (lastSelected != selectDate) {
        selectDate = copyDate(lastSelected);
      }
      elem.addClass('dtp_main');
      updateMainElemGlobal();
      //  elem.text(selectDate.format(settings.dateFormat));
      function updateMainElemGlobal() {
        const arrF = settings.dateFormat.split(' ');
        // eslint-disable-next-line eqeqeq
        if (settings.showTime && arrF.length != 2) {
          arrF.length = 2;
          arrF[0] = 'DD/MM/YY';
          arrF[1] = 'HH:mm';
        }
        let $s = $('<span>');
        $s.text(lastSelected.format(arrF[0]));

        elem.empty();
        elem.append($s);
        $s = $('<i>');
        $s.addClass('fa fa-calendar ico-size');
        elem.append($s);
        if (settings.showTime) {
          $s = $('<span>');
          $s.text(lastSelected.format(arrF[1]));
          elem.append($s);
          $s = $('<i>');
          $s.addClass('fa fa-clock-o ico-size');
          elem.append($s);
        }
      }
      elem.on('click', () => {
        const $win = $('<div>');
        $win.addClass('dtp_modal-win');
        const $body = $('body');
        $body.append($win);
        const $content = createContent();
        $body.append($content);
        const offset = elem.offset();
        $content.css({ top: (offset.top + settings.positionShift.top) + 'px', left: (offset.left + settings.positionShift.left) + 'px' });
        feelDates(selectDate);
        $win.on('click', () => {
          $content.remove();
          $win.remove();
        });
        if (settings.showTime) {
          attachChangeTime();
          const $fieldTime = $('#field-time');
          // eslint-disable-next-line no-unused-vars
          const $hour = $fieldTime.find('#d-hh');
          // eslint-disable-next-line no-unused-vars
          const $minute = $fieldTime.find('#d-mm');
        }

        function feelDates(selectM) {
          const $fDate = $content.find('#field-data');
          $fDate.empty();
          $fDate.append(createMonthPanel(selectM));
          $fDate.append(createCalendar(selectM));
        }

        function createCalendar(selectedMonth) {
          const $c = $('<div>');
          $c.addClass('dtp_modal-calendar');
          // eslint-disable-next-line no-const-assign
          for (const i = 0; i < 7; i++) {
            const $e = $('<div>');
            $e.addClass('dtp_modal-calendar-cell dtp_modal-colored');
            $e.text(moment().weekday(i).format('ddd'));
            $c.append($e);
          }
          const m = copyDate(selectedMonth);
          m.date(1);
          // console.log(m.format('DD--MM--YYYY'));
          // console.log(selectData.format('DD--MM--YYYY'));
          // console.log(m.weekday());
          const flagStart = totalMonths(selectedMonth) === totalMonths(startDate);
          const flagSelect = totalMonths(lastSelected) === totalMonths(selectedMonth);
          const cerDay = parseInt(selectedMonth.format('D'));
          const dayNow = parseInt(startDate.format('D'));
          // eslint-disable-next-line no-const-assign
          for (const i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
              const $b = $('<div>');
              $b.html('&nbsp;');
              $b.addClass('dtp_modal-calendar-cell');
              // eslint-disable-next-line eqeqeq
              if (m.month() == selectedMonth.month() && m.weekday() == j) {
                const day = parseInt(m.format('D'));
                $b.text(day);
                if (flagStart && day < dayNow) {
                  $b.addClass('dtp_modal-grey');
                }
                // eslint-disable-next-line eqeqeq
                else if (flagSelect && day == cerDay) {
                  $b.addClass('dtp_modal-cell-selected');
                }
                else {
                  $b.addClass('cursorily');
                  $b.bind('click', changeDate);
                }
                m.add(1, 'days');
              }
              $c.append($b);
            }
          }
          return $c;
        }

        function changeDate() {

          const $div = $(this);
          selectDate.date($div.text());
          lastSelected = copyDate(selectDate);

          START_DATE = moment(lastSelected);

          updateDate();
          const $fDate = $content.find('#field-data');
          const old = $fDate.find('.dtp_modal-cell-selected');
          old.removeClass('dtp_modal-cell-selected');
          old.addClass('cursorily');
          $div.addClass('dtp_modal-cell-selected');
          $div.removeClass('cursorily');
          old.bind('click', changeDate);
          $div.unbind('click');
          // console.log(selectDate.format('DD-MM-YYYY'));
        }

        function createMonthPanel(selectMonth) {
          const $d = $('<div>');
          $d.addClass('dtp_modal-months');
          let $s = $('<i></i>');
          $s.addClass('fa fa-angle-left cursorily ico-size-month hov');
          // $s.attr('data-fa-mask', 'fas fa-circle');
          $s.bind('click', prevMonth);
          $d.append($s);
          $s = $('<span>');
          $s.text(selectMonth.format('MMMM YYYY'));
          $d.append($s);
          $s = $('<i></i>');
          $s.addClass('fa fa-angle-right cursorily ico-size-month hov');
          $s.bind('click', nextMonth);
          $d.append($s);
          return $d;
        }

        function close() {
          if (settings.showTime) {
            lastSelected.hour(parseInt($hour.text()));
            lastSelected.minute(parseInt($minute.text()));
            selectDate.hour(parseInt($hour.text()));
            selectDate.minute(parseInt($minute.text()));
          }
          updateDate();
          $content.remove();
          $win.remove();
        }

        function nextMonth() {
          selectDate.add(1, 'month');
          feelDates(selectDate);
        }

        function prevMonth() {
          if (totalMonths(selectDate) > totalMonths(startDate)) {
            selectDate.add(-1, 'month');
            feelDates(selectDate);
          }
        }

        function attachChangeTime() {
          const $angles = $($content).find('i[id^="angle-"]');
          // $angles.bind('click', changeTime);
          $angles.bind('mouseup', () => {
            mousedown = false;
            timeout = 800;
          });
          $angles.bind('mousedown', function() {
            mousedown = true;
            changeTime(this);
          });
        }

        function changeTime(el) {
          let $el = this || el;
          $el = $($el);
          // /angle-up-hour angle-up-minute angle-down-hour angle-down-minute
          const arr = $el.attr('id').split('-');
          let increment = 1;
          // eslint-disable-next-line eqeqeq
          if (arr[1] == 'down') {
            increment = -1;
          }
          appendIncrement(arr[2], increment);
          setTimeout(() => {
            autoIncrement($el);
          }, timeout);
        }

        function autoIncrement(el) {
          if (mousedown) {
            if (timeout > 200) {
              timeout -= 200;
            }
            changeTime(el);
          }
        }

        function appendIncrement(typeDigits, increment) {

          // eslint-disable-next-line eqeqeq
          const $i = typeDigits == 'hour' ? $hour : $minute;
          let val = parseInt($i.text()) + increment;
          if (val < 0) {
            val = limitation[typeDigits];
          }
          else if (val > limitation[typeDigits]) {
            val = 0;
          }
          $i.text(formatDigits(val));
        }

        function formatDigits(val) {

          if (val < 10) {
            return '0' + val;
          }
          return val;
        }

        function createTimer() {
          const $div = $('<div>');
          $div.addClass('dtp_modal-time-mechanic');
          let $panel = $('<div>');
          $panel.addClass('dtp_modal-append');
          let $i = $('<i>');
          $i.attr('id', 'angle-up-hour');
          $i.addClass('fa fa-angle-up ico-size-large cursorily hov');
          $panel.append($i);
          let $m = $('<span>');
          $m.addClass('dtp_modal-midle');
          $panel.append($m);
          $i = $('<i>');
          $i.attr('id', 'angle-up-minute');
          $i.addClass('fa fa-angle-up ico-size-large cursorily hov');
          $panel.append($i);
          $div.append($panel);

          $panel = $('<div>');
          $panel.addClass('dtp_modal-digits');
          let $d = $('<span>');
          $d.addClass('dtp_modal-digit');
          $d.attr('id', 'd-hh');
          $d.text(lastSelected.format('HH'));
          $panel.append($d);
          $m = $('<span>');
          $m.addClass('dtp_modal-midle-dig');
          $m.html(':');
          $panel.append($m);
          $d = $('<span>');
          $d.addClass('dtp_modal-digit');
          $d.attr('id', 'd-mm');
          $d.text(lastSelected.format('mm'));
          $panel.append($d);
          $div.append($panel);

          $panel = $('<div>');
          $panel.addClass('dtp_modal-append');
          $i = $('<i>');
          $i.attr('id', 'angle-down-hour');
          $i.addClass('fa fa-angle-down ico-size-large cursorily hov');
          $panel.append($i);
          $m = $('<span>');
          $m.addClass('dtp_modal-midle');
          $panel.append($m);
          $i = $('<i>');
          $i.attr('id', 'angle-down-minute');
          $i.addClass('fa fa-angle-down ico-size-large cursorily hov');
          $panel.append($i);
          $div.append($panel);
          return $div;
        }

        function createContent() {
          const $c = $('<div>');
          if (settings.showTime) {
            $c.addClass('dtp_modal-content');
          }
          else {
            $c.addClass('dtp_modal-content-no-time');
          }
          let $el = $('<div>');
          $el.addClass('dtp_modal-title');
          $el.text(settings.title);
          $c.append($el);
          $el = $('<div>');
          $el.addClass('dtp_modal-cell-date');
          $el.attr('id', 'field-data');
          $c.append($el);
          if (settings.showTime) {
            $el = $('<div>');
            $el.addClass('dtp_modal-cell-time');
            const $a = $('<div>');
            $a.addClass('dtp_modal-time-block');
            $a.attr('id', 'field-time');
            $el.append($a);
            const $line = $('<div>');
            $line.attr('id', 'time-line');
            $line.addClass('dtp_modal-time-line');
            $line.text(lastSelected.format(settings.dateFormat));

            $a.append($line);
            $a.append(createTimer());
            const $but = $('<div>');
            $but.addClass('dpt_modal-button');
            $but.text(settings.buttonTitle);
            $but.bind('click', close);
            $el.append($but);
            $c.append($el);
          }
          return $c;
        }
        function updateDate() {
          if (settings.showTime) {
            $('#time-line').text(lastSelected.format(settings.dateFormat));
          }
          updateMainElem();
          elem.next().val(selectDate.format(settings.dateFormat));
          if (!settings.showTime) {
            $content.remove();
            $win.remove();
          }
        }

        function updateMainElem() {
          const arrF = settings.dateFormat.split(' ');
          // eslint-disable-next-line eqeqeq
          if (settings.showTime && arrF.length != 2) {
            arrF.length = 2;
            arrF[0] = 'DD/MM/YY';
            arrF[1] = 'HH:mm';
          }

          START_DATE = moment(lastSelected.format());

          let $s = $('<span>');
          $s.text(lastSelected.format(arrF[0]));
          elem.empty();
          elem.append($s);
          $s = $('<i>');
          $s.addClass('fa fa-calendar ico-size');
          elem.append($s);
          if (settings.showTime) {
            $s = $('<span>');
            $s.text(lastSelected.format(arrF[1]));
            elem.append($s);
            $s = $('<i>');
            $s.addClass('fa fa-clock-o ico-size');
            elem.append($s);
          }
        }

      });

    });

  };

  function copyDate(d) {
    return moment(d.toDate());
  }

  function totalMonths(m) {
    const r = m.format('YYYY') * 12 + parseInt(m.format('MM'));
    return r;
  }

// eslint-disable-next-line no-undef
}(jQuery));
// fa-caret-down
