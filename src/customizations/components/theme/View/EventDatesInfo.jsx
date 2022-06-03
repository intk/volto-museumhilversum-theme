import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import moment from 'moment';
import { useIntl } from 'react-intl';
import cx from 'classnames';
import { RRule, rrulestr } from 'rrule';

export const datesForDisplay = (start, end) => {
  const mStart = moment(start);
  const mEnd = moment(end);
  if (!mStart.isValid() || !mEnd.isValid()) {
    return null;
  }
  const sameDay = mStart.isSame(mEnd, 'day');
  const sameTime = mStart.isSame(mEnd, 'minute');
  return {
    sameDay,
    sameTime,
    startDate: mStart.format('ll'),
    startTime: mStart.format('LT'),
    endDate: mEnd.format('ll'),
    endTime: mEnd.format('LT'),
  };
};

export const When = ({ start, end, whole_day, open_end }) => {
  const intl = useIntl();
  moment.locale(intl.locale);

  const datesInfo = datesForDisplay(start, end);
  if (!datesInfo) {
    return;
  }
  // TODO I18N INTL
  return (
    <p
      className={cx('event-when', {
        'same-day': datesInfo.sameDay,
        'same-time': datesInfo.sameTime,
        'whole-day': whole_day,
        'open-end': open_end,
      })}
    >
      {!datesInfo.sameDay ? (
        <>
          <span className="start">
            <span className="start-date">{datesInfo.startDate}</span>
            {!whole_day && (
              <>
                {/* Plone has an optional word based on locale here */}
                <span> </span>
                <span className="start-time">{datesInfo.startTime}</span>
              </>
            )}
          </span>
          {!open_end && (
            <>
              &nbsp;&mdash;&nbsp;
              <span className="end">
                <span className="end-date">{datesInfo.endDate}</span>
                {!whole_day && (
                  <>
                    {/* Plone has an optional word based on locale here */}
                    <span> </span>
                    <span className="end-time">{datesInfo.endTime}</span>
                  </>
                )}
              </span>
            </>
          )}
        </>
      ) : (
        <>
          {whole_day && (
            <span className="start-date">{datesInfo.startDate}</span>
          )}
          {open_end && !whole_day && (
            <>
              <span className="start-date">{datesInfo.startDate}</span>
              ,&nbsp;
              <span className="start-time">{datesInfo.startTime}</span>
            </>
          )}
          {!(whole_day || open_end) && (
            <>
              <span className="start-date">{datesInfo.startDate}</span>
              ,&nbsp;
              <span className="start-time">{datesInfo.startTime}</span>
              &nbsp;&mdash;&nbsp;
              <span className="end-time">{datesInfo.endTime}</span>
            </>
          )}
        </>
      )}
    </p>
  );
};

When.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string,
  whole_day: PropTypes.bool,
  open_end: PropTypes.bool,
};

export const Recurrence = ({ recurrence, start }) => {
  if (recurrence.indexOf('DTSTART') < 0) {
    var dtstart = RRule.optionsToString({
      dtstart: new Date(start),
    });
    recurrence = dtstart + '\n' + recurrence;
  }
  const rrule = rrulestr(recurrence, { unfold: true, forceset: true });

  return (
    <List
      items={rrule
        .all()
        .map((date) => datesForDisplay(date))
        .map((date) => date.startDate)}
    />
  );
};

Recurrence.propTypes = {
  recurrence: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
};
