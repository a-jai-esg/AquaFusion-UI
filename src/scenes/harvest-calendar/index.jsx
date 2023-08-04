import { useState, useEffect } from "react";
import FullCalendar, { formalDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    document.title = "Harvest Calendar";
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Enter a planned event. ");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
  };

  return (
    <>
      <Box m="20px">
        <Header
          title="Harvest Calendar"
          subtitle="View the system's harvest calendar and schedules"
        />
        <Box display="flex" justifyContent="space-between">
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              headerToolbar={{
                left: "prev, next today",
                center: "title",
                right: "dayGridMonth, timeGridWeek, timeGridDay",
              }}
            ></FullCalendar>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Calendar;
