// hooks
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// react router
import { Routes, Route } from "react-router-dom";

// scenes
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import ManageWorkgroup from "./scenes/manage-workgroup";
import Profile from "./scenes/Profile";
import Notifications from "./scenes/notifications";
import HarvestCalendar from "./scenes/harvest-calendar";
import AquaticSensorStatus from "./scenes/aquatic-sensor-status";
import TerrestrialSensorStatus from "./scenes/terrestrial-sensor-status";
import AdjustSystemThresholds from "./scenes/adjust-system-thresholds";
import Registration from "./scenes/register-farmer";
import TechnicalSupport from "./scenes/TechnicalSupport";

// data
import { mockCalendarDates as dates } from "./data/mockData";

export default function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manage-workgroup" element={<ManageWorkgroup />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/register-farmer" element={<Registration />} />
              <Route path="/support" element={<TechnicalSupport />} />
              <Route path="/harvest-calendar" element={<HarvestCalendar />} date={dates} />
              <Route path="/terrestrial-sensor-status" element={<TerrestrialSensorStatus />} />
              <Route path="/aquatic-sensor-status" element={<AquaticSensorStatus />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/adjust-system-thresholds"
                element={<AdjustSystemThresholds />}
              /> 
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
