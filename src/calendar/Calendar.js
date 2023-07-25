import React, { useEffect, useState } from "react";
import "./Calendar.css";
import WhiskApi from "../api/api";
import { useSelector } from "react-redux";
//component
import CalendarDay from "./CalendarDay";

/** Calendar Component:
 *
 * -> displays the user's calendar: Sunday-Friday
 *
 * handles editing calendar (clearing the day)
 *
 * -> Renders CalendarDay for each day
 */
const Calendar = () => {
  const [calendar, setCalendar] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useSelector((store) => store.auth);

  useEffect(() => {
    const getCalendar = async () => {
      if (userInfo && userInfo.username) {
        try {
          let cal = await WhiskApi.getCalendar(userInfo.username);
          setCalendar(() => ({ ...cal.calendar }));
          setIsLoading(() => false);
        } catch (e) {}
      }
    };
    getCalendar();
  }, [userInfo, isLoading]);

  const handleClear = async (day) => {
    let calendar = WhiskApi.updateCalendar({
      username: userInfo.username,
      day: day,
      uri: null,
    });
    setCalendar(() => ({ ...calendar }));
  };

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="Calendar">
      <CalendarDay
        day={"sunday"}
        key={"sunday"}
        uri={calendar.sunday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"monday"}
        key={"monday"}
        uri={calendar.monday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"tuesday"}
        key={"tuesday"}
        uri={calendar.tuesday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"wednesday"}
        key={"wednesday"}
        uri={calendar.wednesday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"thursday"}
        key={"thursday"}
        uri={calendar.thursday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"friday"}
        key={"friday"}
        uri={calendar.friday}
        handleClear={handleClear}
      />
      <CalendarDay
        day={"saturday"}
        key={"saturday"}
        uri={calendar.saturday}
        handleClear={handleClear}
      />
    </div>
  );
};

export default Calendar;
