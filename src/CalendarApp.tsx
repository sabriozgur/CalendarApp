import React, { useState, setState } from "react";
import "./styles.css";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function CalendarDay(props) {
  function isSameDay(firstDate, secondDate) {
    if (firstDate.getDate() !== secondDate.getDate()) {
      return false;
    } else if (firstDate.getMonth() !== secondDate.getMonth()) {
      return false;
    } else if (firstDate.getYear() !== secondDate.getYear()) {
      return false;
    }
    return true;
  }

  const namesOfDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let dayIndexOfWeek = props.date.getDay();
  const dayName = namesOfDay[dayIndexOfWeek];
  const dayOfMonth = props.date.getDate();

  const isToday = isSameDay(new Date(), props.date);

  if (isToday) {
    return (
      <div className="CalendarDay" style={{ backgroundColor: "#508080" }}>
        <p>{dayName}</p>
        <p>{dayOfMonth}</p>
      </div>
    );
  } else {
    return (
      <div className="CalendarDay">
        <p>{dayName}</p>
        <p>{dayOfMonth}</p>
      </div>
    );
  }
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.goToNextWeek = this.goToNextWeek.bind(this);
    this.goToPreviousWeek = this.goToPreviousWeek.bind(this);
    this.state = { date: props.date };
  }

  goToNextWeek() {
    this.setState({ date: this.state.date.addDays(7) });
  }
  goToPreviousWeek() {
    this.setState({ date: this.state.date.addDays(-7) });
  }

  render() {
    const namesOfMonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let dayOfWeek = this.state.date.getDay();
    let monthIndex = this.state.date.getMonth();
    let mondayOfWeek = this.state.date.addDays(-(dayOfWeek - 1));
    console.log(this.state.date);
    const DAYS_IN_WEEK = 7;
    const days = [];
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
      let day_of_component = mondayOfWeek.addDays(i);
      days.push(<CalendarDay date={day_of_component} />);
    }
    return (
      <div className="Calendar">
        <h1>{namesOfMonth[monthIndex]}</h1>
        <tbody>{days}</tbody>
        <button className="NextWeekButton" onClick={this.goToNextWeek}>
          Next
        </button>
        <button className="PreviousWeekButton" onClick={this.goToPreviousWeek}>
          Prev
        </button>
      </div>
    );
  }
}

export default function CalendarApp() {
  var self = this;
  let date = new Date();
  this.date = date;
  return (
    <div>
      <Calendar date={self.date} />
    </div>
  );
}
