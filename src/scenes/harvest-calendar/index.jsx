import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { tokens } from "../../theme";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { Box, useTheme, CircularProgress, Typography } from "@mui/material";
import Header from "../../components/Header";
import SetHarvestCalendarModal from "../../components/modals/SetHarvestCalendarModal";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(true);
  const [loadingDates, setLoadingDates] = useState(true);
  const [events, setEvents] = useState([]);
  const [harvestCalendarModalOpen, setHarvestCalendarModalOpen] =
    useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reloadCalendar, setReloadCalendar] = useState(false); // State to trigger calendar reload

  useEffect(() => {
    document.title = "Harvest Calendar";
    retrieveHarvestSchedule();
  }, [reloadCalendar]); // Trigger reload when reloadCalendar state changes

  const retrieveHarvestSchedule = async () => {
    setLoadingDates(true);
    const retrieveHarvestCalendarScheduleURL =
      "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/farmadmin/administrative/get_harvest_schedule";
    try {
      const response = await axios.post(retrieveHarvestCalendarScheduleURL, {
        emailAddress: localStorage.getItem("emailAddress"),
        password: localStorage.getItem("password"),
      });

      const events = [
        {
          title: response.data.harvestName,
          start: new Date(response.data.plantedDate),
          end: new Date(response.data.harvestDate),
          description: response.data.harvestDescription,
        },
      ];
      setEvents(events);
    } catch (error) {
      console.error("Error retrieving harvest schedule:", error);
    } finally {
      setLoadingDates(false);
      setLoading(false);
    }
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setHarvestCalendarModalOpen(true);
  };

  const handleDateClick = (clickInfo) => {
    setSelectedEvent({
      title: "New Harvest",
      start: clickInfo.dateStr,
      end: clickInfo.dateStr,
      extendedProps: {
        description: "",
      },
    });
    setHarvestCalendarModalOpen(true);
  };

  const handleCloseSetHarvestCalendarModal = () => {
    setSelectedEvent(null);
    setHarvestCalendarModalOpen(false);
  };

  const handleSaveHarvestDetails = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event === selectedEvent ? updatedEvent : event
    );
    setEvents(updatedEvents);
    handleCloseSetHarvestCalendarModal();
    setReloadCalendar(!reloadCalendar); // Trigger calendar reload by toggling reloadCalendar state
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <strong>{eventInfo.event.title}</strong>
        <br />
        <span>{eventInfo.event.extendedProps.description}</span>
      </div>
    );
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
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <CircularProgress sx={{ color: colors.primary[200] }} />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  Loading Harvest Calendar...
                </Typography>
              </Box>
            ) : (
              <FullCalendar
                height="75vh"
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                editable={true}
                events={events}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
                eventContent={renderEventContent}
                weekends={true}
                headerToolbar={{
                  left: "prev, next today",
                  center: "title",
                  right: "dayGridMonth, timeGridWeek, timeGridDay",
                }}
                loading={loadingDates}
              />
            )}
          </Box>
        </Box>
      </Box>
      <SetHarvestCalendarModal
        isOpen={harvestCalendarModalOpen}
        onRequestClose={handleCloseSetHarvestCalendarModal}
        selectedEvent={selectedEvent}
        onSave={handleSaveHarvestDetails}
        onReloadCalendar={() => setReloadCalendar(!reloadCalendar)} // Pass function to trigger calendar reload
      />
    </>
  );
};

export default Calendar;
