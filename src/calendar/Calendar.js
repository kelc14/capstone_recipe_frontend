import React, { useEffect, useState } from "react";
import "./Calendar.css";
import WhiskApi from "../api/api";
import { useSelector } from "react-redux";
import CalendarDay from "./CalendarDay";

const Calendar = () => {
  const [calendar, setCalendar] = useState({});
  const { userInfo, userToken } = useSelector((store) => store.auth);

  useEffect(() => {
    let username = userInfo.username;
    const getCalendar = async () => {
      try {
        // WhiskApi.token = localStorage.userToken;

        let cal = await WhiskApi.getCalendar(username);

        setCalendar(() => ({ ...cal.calendar }));
        console.log(calendar);
      } catch (e) {}
    };
    getCalendar();
  }, []);

  const handleClear = (day) => {
    console.log("this ran");
    calendar[day] = null;
  };

  return (
    <div className="Calendar">
      <CalendarDay
        day={"sunday"}
        uri={calendar.sunday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"monday"}
        uri={calendar.monday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"tuesday"}
        uri={calendar.tuesday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"wednesday"}
        uri={calendar.wednesday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"thursday"}
        uri={calendar.thursday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"friday"}
        uri={calendar.friday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"saturday"}
        uri={calendar.saturday}
        handleClear={handleClear}
      />
    </div>
  );
};

export default Calendar;
