// hooks
import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// react router
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy loaded components for login scenes
const Login = lazy(() => import("./login-scenes/login"));
const ForgottenPassword = lazy(() =>
  import("./login-scenes/forgotten-password")
);
const Support = lazy(() => import("./login-scenes/cards/support-card"));

// Lazy loaded components for dashboard scenes
const Topbar = lazy(() => import("./scenes/global/Topbar"));
const Sidebar = lazy(() => import("./scenes/global/Sidebar"));
const Dashboard = lazy(() => import("./scenes/dashboard"));
const ManageWorkgroup = lazy(() => import("./scenes/manage-workgroup"));
const Profile = lazy(() => import("./scenes/farm-administrator-profile"));
const Notifications = lazy(() => import("./scenes/notifications"));
const HarvestCalendar = lazy(() => import("./scenes/harvest-calendar"));
const AquaticSensorStatus = lazy(() =>
  import("./scenes/aquatic-sensor-status")
);
const TerrestrialSensorStatus = lazy(() =>
  import("./scenes/terrestrial-sensor-status")
);
const AdjustSystemThresholds = lazy(() =>
  import("./scenes/adjust-system-thresholds")
);
const Registration = lazy(() => import("./scenes/register-farmer"));
const TechnicalSupport = lazy(() => import("./scenes/technical-support"));
const About = lazy(() => import("./scenes/about-system"));
const Logout = lazy(() => import("./scenes/logout"));
const ApproveRegistrationRequests = lazy(() =>
  import("./scenes/register-farmer/approve-farmers-index")
);

export default function App() {
  const [theme, colorMode] = useMode();

  const [sessionIsActive, setSessionIsActive] = useState(
    localStorage.getItem("sessionIsActive") === true
  );

  useEffect(() => {
    localStorage.setItem("sessionIsActive", sessionIsActive);
  }, [sessionIsActive]);

  const dashboardRoutes = (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manage-workgroup" element={<ManageWorkgroup />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/register-farmer" element={<Registration />} />
          <Route
            path="/register-farmer/requests"
            element={<ApproveRegistrationRequests />}
          />
          <Route path="/harvest-calendar" element={<HarvestCalendar />} />
          <Route
            path="/aquatic-sensor-status"
            element={<AquaticSensorStatus />}
          />
          <Route
            path="/terrestrial-sensor-status"
            element={<TerrestrialSensorStatus />}
          />
          <Route
            path="/adjust-system-thresholds"
            element={<AdjustSystemThresholds />}
          />
          <Route path="/support" element={<TechnicalSupport />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/logout"
            element={<Logout setSessionIsActive={setSessionIsActive} />}
          />
        </Routes>
      </main>
    </div>
  );

  const loginRoutes = (
    <div className="app">
      <main className="content">
        <Routes>
          <Route
            path="/"
            element={<Login setSessionIsActive={setSessionIsActive} />}
          />
          <Route
            path="/login"
            element={<Login setSessionIsActive={setSessionIsActive} />}
          />
          <Route path="/forgotten-password" element={<ForgottenPassword />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </main>
    </div>
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<div>Loading...</div>}>
          {sessionIsActive ? dashboardRoutes : loginRoutes}
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
