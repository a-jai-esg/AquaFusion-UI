import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// react router
import { Routes, Route } from "react-router-dom";

// scenes
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/teams";
import Profile from "./scenes/Profile";
// import Invoice from "./scenes/global/Sidebar";
import Notifications from "./scenes/notifications";
import Calendar from "./scenes/calendar";
// import Bar from "./scenes/global/Sidebar";
import AdminApprovedRegistration from "./scenes/admin-profile-registration";
import TechnicalSupport from "./scenes/TechnicalSupport";

// data 
import { mockCalendarDates as dates} from "./data/mockData";

export default function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app"> 
          <Sidebar/>
          <main className="content"> 
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/team" element={<Team/>} />
              <Route path="/notifications" element={<Notifications />} /> 
              <Route path="/register" element={<AdminApprovedRegistration/>} />
              <Route path="/support" element={<TechnicalSupport />} />
              <Route path="/calendar" element={<Calendar/>} date={dates}/>
              <Route path="/profile" element={<Profile/>}/>
              {/* 
              <Route path="/invoices" element={<Team />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} /> 
              <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
