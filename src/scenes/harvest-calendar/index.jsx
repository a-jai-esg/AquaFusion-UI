import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import SetHarvestCalendarModal from "../../components/modals/SetHarvestCalendarModal";

import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { date } from "yup";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    document.title = "Harvest Calendar";
  }, []);

  // useStates for the event and set harvest calendar modal
  const [harvestCalendarModalOpen, setHarvestCalendarModalOpen] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const handleDateClick = (info) => {
    setSelectedDate(info.date);
    setHarvestCalendarModalOpen(true);
  };

  const handleCloseSetHarvestCalendarModal = () => {
    setSelectedDate(null);
    setHarvestCalendarModalOpen(false);
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
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              editable={true}
              dateClick={handleDateClick}
              weekends={true}
              headerToolbar={{
                left: "prev, next today",
                center: "title",
                right: "dayGridMonth, timeGridWeek, timeGridDay",
              }}
            />
            <SetHarvestCalendarModal
              isOpen={harvestCalendarModalOpen}
              onRequestClose={handleCloseSetHarvestCalendarModal}
              selectedDate={selectedDate}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Calendar;
