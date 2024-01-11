import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  useTheme,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdjustThresholds = () => {
  // State variables for holding values for aquatic sensors
  const [phLevelUpperLimit, setPhLevelUpperLimit] = useState(0);
  const [phLevelLowerLimit, setPhLevelLowerLimit] = useState(0);
  const [tdsLevelUpperLimit, setTdsLevelUpperLimit] = useState(0);
  const [tdsLevelLowerLimit, setTdsLevelLowerLimit] = useState(0);
  const [ultrasonicWaterLevelUpperLimit, setUltrasonicWaterLevelUpperLimit] =
    useState(0); // Set default value
  const [ultrasonicWaterLevelLowerLimit, setUltrasonicWaterLevelLowerLimit] =
    useState(0);
  const [ds18b20UpperLimit, setDs18b20UpperLimit] = useState(0);
  const [ds18b20LowerLimit, setDs18b20LowerLimit] = useState(0);

  // State variables for holding values for terrestrial sensors
  const [ultrasonicPlantLevelUpperLimit, setUltrasonicPlantLevelUpperLimit] =
    useState(0);
  const [dht22TemperatureLevelUpperLimit, setDht22TemperatureLevelUpperLimit] =
    useState(0);
  const [dht22TemperatureLevelLowerLimit, setDht22TemperatureLevelLowerLimit] =
    useState(0);
  const [dht22HumidityLevelUpperLimit, setDht22HumidityLevelUpperLimit] =
    useState(0);
  const [dht22HumidityLevelLowerLimit, setDht22HumidityLevelLowerLimit] =
    useState(0);

  useEffect(() => {
    document.title = "Adjust System Thresholds";

    const fetchThresholds = async () => {
      try {
        const response = await axios.post(
          "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/system/administrative/get_sensor_thresholds",
          {
            emailAddress: localStorage.getItem("emailAddress"),
            password: localStorage.getItem("password"),
          }
        );

        const thresholds = response.data;

        // Update state variables with fetched threshold values
        setPhLevelUpperLimit(thresholds.phLevelUpperLimit);
        setPhLevelLowerLimit(thresholds.phLevelLowerLimit);
        setTdsLevelUpperLimit(thresholds.tdsLevelUpperLimit);
        setTdsLevelLowerLimit(thresholds.tdsLevelLowerLimit);
        setUltrasonicWaterLevelUpperLimit(
          thresholds.ultrasonicWaterLevelUpperLimit
        );
        setUltrasonicWaterLevelLowerLimit(
          thresholds.ultrasonicWaterLevelLowerLimit
        );
        setDs18b20UpperLimit(thresholds.ds18b20UpperLimit);
        setDs18b20LowerLimit(thresholds.ds18b20LowerLimit);
        setUltrasonicPlantLevelUpperLimit(
          thresholds.ultrasonicPlantLevelUpperLimit
        );
        setDht22TemperatureLevelUpperLimit(
          thresholds.dht22TemperatureLevelUpperLimit
        );
        setDht22TemperatureLevelLowerLimit(
          thresholds.dht22TemperatureLevelLowerLimit
        );
        setDht22HumidityLevelUpperLimit(
          thresholds.dht22HumidityLevelUpperLimit
        );
        setDht22HumidityLevelLowerLimit(
          thresholds.dht22HumidityLevelLowerLimit
        );
      } catch (error) {
        toast.error("Failed to fetch threshold values.", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      }
    };

    fetchThresholds();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Options for dropdown lists
  const dropdownOptions = {
    phLevel: [5.5, 6.5, 7.0, 7.5, 8.0],
    tdsLevel: [
      100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
      1500, 1600, 1700, 1800, 1900, 2000,
    ],
    waterTemperatureLevel: [22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0],
    dht22TemperatureLevel: [
      22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, 31.0, 32.0,
    ],
    dht22HumidityLevel: [
      10.0, 20.0, 30.0, 40.0, 50.0, 60.0, 70.0, 80.0, 90.0, 100.0,
    ],
  };

  const handleChangePhUpperLimit = (event) => {
    setPhLevelUpperLimit(event.target.value);
  };

  const handleChangePhLowerLimit = (event) => {
    setPhLevelLowerLimit(event.target.value);
  };

  const handleChangeTdsUpperLimit = (event) => {
    setTdsLevelUpperLimit(event.target.value);
  };

  const handleChangeTdsLowerLimit = (event) => {
    setTdsLevelLowerLimit(event.target.value);
  };

  const handleChangeUltrasonicWaterLevelUpperLimit = (event) => {
    setUltrasonicWaterLevelUpperLimit(event.target.value);
  };

  const handleChangeUltrasonicWaterLevelLowerLimit = (event) => {
    setUltrasonicWaterLevelLowerLimit(event.target.value);
  };

  const handleChangeDs18b20UpperLimit = (event) => {
    setDs18b20UpperLimit(event.target.value);
  };

  const handleChangeDs18b20LowerLimit = (event) => {
    setDs18b20LowerLimit(event.target.value);
  };

  const handleChangeUltrasonicPlantUpperLimit = (event) => {
    setUltrasonicPlantLevelUpperLimit(event.target.value);
  };

  const handleChangeDht22TemperatureUpperLimit = (event) => {
    setDht22TemperatureLevelUpperLimit(event.target.value);
  };

  const handleChangeDht22TemperatureLowerLimit = (event) => {
    setDht22TemperatureLevelLowerLimit(event.target.value);
  };

  const handleChangeDht22HumidityUpperLimit = (event) => {
    setDht22HumidityLevelUpperLimit(event.target.value);
  };

  const handleChangeDht22HumidityLowerLimit = (event) => {
    setDht22HumidityLevelLowerLimit(event.target.value);
  };

  const handleChangeParameters = () => {
    // Validation: Check if the upper limit is greater than or equal to the lower limit
    let validation = true;
    if (
      phLevelUpperLimit < phLevelLowerLimit ||
      tdsLevelUpperLimit < tdsLevelLowerLimit
    ) {
      validation = false;
      toast.error(
        "Upper limit should be greater than or equal to lower limit for pH Level and TDS Levels.",
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }

    // Validation: Check if the ultrasonic water level upper limit is greater than the lower limit
    if (ultrasonicWaterLevelUpperLimit < ultrasonicWaterLevelLowerLimit) {
      validation = false;
      toast.error(
        "Ultrasonic Water Level Upper Limit should be greater than or equal to the lower limit.",
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }

    // Validation: Check if the water temperature upper limit is greater than or equal to the lower limit
    if (ds18b20UpperLimit < ds18b20LowerLimit) {
      validation = false;
      toast.error(
        "Water Temperature Upper Limit should be greater than or equal to the lower limit.",
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }

    // Validation: Check if the DHT22 temperature upper limit is greater than or equal to the lower limit
    if (dht22TemperatureLevelUpperLimit < dht22TemperatureLevelLowerLimit) {
      validation = false;
      toast.error(
        "DHT22 Temperature Upper Limit should be greater than or equal to the lower limit.",
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }

    // Validation: Check if the DHT22 humidity upper limit is greater than or equal to the lower limit
    if (dht22HumidityLevelUpperLimit < dht22HumidityLevelLowerLimit) {
      validation = false;
      toast.error(
        "DHT22 Humidity Upper Limit should be greater than or equal to the lower limit.",
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }

    // Validation: Check if the ultrasonic plant level limit is greater than or equal to the system height
    if (ultrasonicPlantLevelUpperLimit <= 0) {
      validation = false;
      toast.error("Plant height must not be negative or equal to zero.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // If all validations pass, you can proceed with making changes
    // Add logic to handle parameter changes

    if (validation) {
      try {
        const changeSystemParameterURL =
          "https://us-central1-aquafusion-b8744.cloudfunctions.net/api/system/administrative/set_sensor_thresholds";
        axios
          .post(changeSystemParameterURL, {
            emailAddress: localStorage.getItem("emailAddress"),
            password: localStorage.getItem("password"),
            phLevelUpperLimit: phLevelUpperLimit,
            phLevelLowerLimit: phLevelLowerLimit,
            tdsLevelUpperLimit: tdsLevelUpperLimit,
            tdsLevelLowerLimit: tdsLevelLowerLimit,
            ds18b20UpperLimit: ds18b20UpperLimit,
            ds18b20LowerLimit: ds18b20LowerLimit,
            ultrasonicWaterLevelUpperLimit: ultrasonicWaterLevelUpperLimit,
            ultrasonicWaterLevelLowerLimit: ultrasonicWaterLevelLowerLimit,
            ultrasonicPlantLevelUpperLimit: ultrasonicPlantLevelUpperLimit,
            dht22TemperatureLevelUpperLimit: dht22TemperatureLevelUpperLimit,
            dht22TemperatureLevelLowerLimit: dht22TemperatureLevelLowerLimit,
            dht22HumidityLevelUpperLimit: dht22HumidityLevelUpperLimit,
            dht22HumidityLevelLowerLimit: dht22HumidityLevelLowerLimit,
          })
          .then((response) => {
            toast.success(`${response.data.message}`, {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
          })
          .catch((exception) => {
            toast.error(`${exception}`, {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
          });
      } catch (Exception) {
        toast.error(`${Exception}`, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Adjust System Thresholds"
          subtitle="Adjust system's pH Level, TDS Levels, etc."
        />
      </Box>
      {/* Aquatic Sensors Fields */}
      <Box>
        <Box pt="20px" display="flex" justifyContent="space-between">
          <Box
            flex="1 1 50%"
            backgroundColor={colors.primary[400]}
            p="15px"
            ml="auto"
            mr="auto"
            borderRadius="4px"
          >
            <Typography variant="h4" color={colors.greenAccent[500]}>
              Aquatic Sensors Thresholds
            </Typography>

            {/* pH Level */}
            <Box p="20px">
              {/*
                Upper Limit
              */}
              <FormControl
                sx={{ m: 1, minWidth: 250, maxWidth: 300, padding: "10px" }}
                size="large"
              >
                <InputLabel id="phLevelUpperLimit-label">
                  pH Level Upper Limit
                </InputLabel>
                <Select
                  labelId="phLevelUpperLimit-label"
                  id="phLevelUpperLimit"
                  value={phLevelUpperLimit}
                  label="pH Level Upper Limit"
                  onChange={handleChangePhUpperLimit}
                >
                  {dropdownOptions.phLevel.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/*
                Lower Limit
              */}
              <FormControl
                sx={{ m: 1, minWidth: 250, maxWidth: 300, padding: "10px" }}
                size="large"
              >
                <InputLabel id="phLevelLowerLimit-label">
                  pH Level Lower Limit
                </InputLabel>
                <Select
                  labelId="phLevelLowerLimit-label"
                  id="phLevelLowerLimit"
                  value={phLevelLowerLimit}
                  label="pH Level Upper Limit"
                  onChange={handleChangePhLowerLimit}
                >
                  {dropdownOptions.phLevel.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* TDS Levels */}
            <Box p="20px">
              {/*
                Upper Limit
              */}
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="tdsLevelUpperLimit-label">
                  Total Dissolved Solids Upper Limit
                </InputLabel>
                <Select
                  labelId="tdsLevelUpperLimit-label"
                  id="tdsLevelUpperLimit"
                  value={tdsLevelUpperLimit}
                  label="Total Dissolved Solids Upper Limit"
                  onChange={handleChangeTdsUpperLimit}
                >
                  {dropdownOptions.tdsLevel.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/*
                Lower Limit
              */}
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="tdsLevelLowerLimit-label">
                  Total Dissolved Solids Lower Limit
                </InputLabel>
                <Select
                  labelId="tdsLevelLowerLimit-label"
                  id="tdsLevelLowerLimit"
                  value={tdsLevelLowerLimit}
                  label="Total Dissolved Solids Lower Limit"
                  onChange={handleChangeTdsLowerLimit}
                >
                  {dropdownOptions.tdsLevel.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Ultrasonic Water Level */}
            <Box p="20px">
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <TextField
                  type="number"
                  inputProps={{
                    pattern: "[0-9]*", // Allow only decimal digits
                  }}
                  labelId="ultrasonicPlantLevelUpperLimit-label"
                  id="ultrasonicPlantLevelUpperLimit"
                  value={ultrasonicWaterLevelUpperLimit}
                  label="Ultrasonic Water Level Upper Limit (cm)"
                  onChange={handleChangeUltrasonicWaterLevelUpperLimit}
                />
              </FormControl>
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <TextField
                  type="number"
                  inputProps={{
                    pattern: "[0-9]*", // Allow only decimal digits
                  }}
                  labelId="ultrasonicWaterLevelLowerLimit-label"
                  id="ultrasonicWaterLevelLowerLimit"
                  value={ultrasonicWaterLevelLowerLimit}
                  label="Ultrasonic Water Level Lower Limit"
                  onChange={handleChangeUltrasonicWaterLevelLowerLimit}
                />
              </FormControl>
            </Box>

            {/* Water Temperature */}
            <Box p="20px">
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="waterTemperatureLevelUpperLimit-label">
                  Water Temperature Upper Limit (°C)
                </InputLabel>
                <Select
                  labelId="waterTemperatureLevelUpperLimit-label"
                  id="waterTemperatureLevelUpperLimit"
                  value={ds18b20UpperLimit}
                  label="Water Temperature Upper Limit (°C)"
                  onChange={handleChangeDs18b20UpperLimit}
                >
                  {dropdownOptions.waterTemperatureLevel.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="waterTemperatureLevelUpperLimit-label">
                  Water Temperature Lower Limit (°C)
                </InputLabel>
                <Select
                  labelId="waterTemperatureLevelLowerLimit-label"
                  id="waterTemperatureLevelLowerLimit"
                  value={ds18b20LowerLimit}
                  label="Water Temperature Lower Limit (°C)"
                  onChange={handleChangeDs18b20LowerLimit}
                >
                  {dropdownOptions.waterTemperatureLevel.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Terrestrial Sensors Fields */}
          <Box
            flex="1 1 50%"
            backgroundColor={colors.primary[400]}
            p="15px"
            ml="15px"
            mr="auto"
            borderRadius="4px"
          >
            <Typography variant="h4" color={colors.greenAccent[500]}>
              Terrestrial Sensors Thresholds
            </Typography>

            {/* DHT22 Temperature */}
            <Box p="20px">
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="dht22TemperatureLevelUpperLimit-label">
                  DHT22 Temperature Upper Limit (°C)
                </InputLabel>
                <Select
                  labelId="dht22TemperatureLevelUpperLimit-label"
                  id="dht22TemperatureLevelUpperLimit"
                  value={dht22TemperatureLevelUpperLimit}
                  label="DHT22 Temperature Upper Limit (°C)"
                  onChange={handleChangeDht22TemperatureUpperLimit}
                >
                  {dropdownOptions.dht22TemperatureLevel.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="dht22TemperatureLevelLowerLimit-label">
                  DHT22 Temperature Lower Limit (°C)
                </InputLabel>
                <Select
                  labelId="dht22TemperatureLevelLowerLimit-label"
                  id="dht22TemperatureLevelLowerLimit"
                  value={dht22TemperatureLevelLowerLimit}
                  label="DHT22 Temperature Lower Limit (°C)"
                  onChange={handleChangeDht22TemperatureLowerLimit}
                >
                  {dropdownOptions.dht22TemperatureLevel.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* DHT22 Humidity */}
            <Box p="20px">
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="dht22HumidityLevelUpperLimit-label">
                  DHT22 Humidity Upper Limit (%)
                </InputLabel>
                <Select
                  labelId="dht22HumidityLevelUpperLimit-label"
                  id="dht22HumidityLevelUpperLimit"
                  value={dht22HumidityLevelUpperLimit}
                  label="DHT22 Humidity Upper Limit (g/m3)"
                  onChange={handleChangeDht22HumidityUpperLimit}
                >
                  {dropdownOptions.dht22HumidityLevel.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="dht22HumidityLevelLowerLimit-label">
                  DHT22 Humidity Lower Limit (%)
                </InputLabel>
                <Select
                  labelId="dht22HumidityLevelLowerLimit-label"
                  id="dht22HumidityLevelUpperLimit"
                  value={dht22HumidityLevelLowerLimit}
                  label="DHT22 Humidity Lower Limit (g/m3)"
                  onChange={handleChangeDht22HumidityLowerLimit}
                >
                  {dropdownOptions.dht22HumidityLevel.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Ultrasonic Plant Level */}
            <Box p="20px">
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <TextField
                  type="number"
                  inputProps={{
                    pattern: "[0-9]*", // Allow only decimal digits
                  }}
                  labelId="ultrasonicPlantLevelUpperLimit-label"
                  id="ultrasonicPlantUpperLimit"
                  value={ultrasonicPlantLevelUpperLimit}
                  label="Ultrasonic Plant Height Limit (cm)"
                  onChange={handleChangeUltrasonicPlantUpperLimit}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          display="flex"
          justifyContent="center"
          marginTop="45px"
          sx={{
            "& .MuiButton-contained": {
              fontSize: 16,
              fontWeight: 400,
              gridColumn: "span 4",
            },
          }}
        >
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleChangeParameters}
            sx={{
              gridColumn: "span 2",
              height: 60,
              width: 256,
            }}
          >
            Save Configuration
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdjustThresholds;
