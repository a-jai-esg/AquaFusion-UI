import { useState, useEffect } from "react";
import { Button, Typography, Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const AdjustThresholds = () => {
  useEffect(() => {
    document.title = "Adjust System Thresholds";
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // hooks for holding values for aquatic sensors
  const [pHLevel, setpHLevel] = useState(6.5);
  const [TDS, setTDSLevel] = useState(300.0);
  const [waterTemperature, setWaterTemperature] = useState(27.0);
  const [waterVolume, setWaterVolume] = useState(30.0);

  // hooks for holding values for terrestrial sensors
  const [airTemperature, setAirTemperature] = useState(26.0);
  const [airHumidity, setAirHumidity] = useState(20.0);
  const [plantHeight, setPlantHeight] = useState(20.0);

  // changes aquatic sensors
  const handleChangepH = (event) => {
    setpHLevel(event.target.value);
  };

  const handleChangeTDS = (event) => {
    setTDSLevel(event.target.value);
  };

  const handleChangeWaterTemperature = (event) => {
    setWaterTemperature(event.target.value);
  };

  const handleChangeWaterVolume = (event) => {
    setWaterVolume(event.target.value);
  };

  // changes terrestrial sensors
  const handleChangeAirTemperature = (event) => {
    setAirTemperature(event.target.value);
  };

  const handleChangeAirHumidity = (event) => {
    setAirHumidity(event.target.value);
  };

  const handleChangePlantHeight = (event) => {
    setPlantHeight(event.target.value);
  };

  return (
    <Box m="20px">
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
              <FormControl
                sx={{ m: 1, minWidth: 150, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="demo-select-small-label">pH Level</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={pHLevel}
                  label="pH Level"
                  onChange={handleChangepH}
                >
                  <MenuItem value={null}>
                    <em>Negligible</em>
                  </MenuItem>
                  <MenuItem value={5.5}>5.5</MenuItem>
                  <MenuItem value={6.5}>6.5</MenuItem>
                  <MenuItem value={7.0}>7.0</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* TDS Levels */}
            <Box p="20px">
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="demo-select-small-label">
                  Total Dissolved Solids
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={TDS}
                  label="Total Dissolved Solids (ppm)"
                  onChange={handleChangeTDS}
                >
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value={200}>200</MenuItem>
                  <MenuItem value={300}>300</MenuItem>
                  <MenuItem value={400}>400</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Water Temperature */}
            <Box p="20px">
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="demo-select-small-label">
                  Water Temperature (°C)
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={waterTemperature}
                  label="Water Temperature (°C)"
                  onChange={handleChangeWaterTemperature}
                >
                  <MenuItem value={22.0}>22</MenuItem>
                  <MenuItem value={23.0}>23</MenuItem>
                  <MenuItem value={24.0}>24</MenuItem>
                  <MenuItem value={25.0}>25</MenuItem>
                  <MenuItem value={26.0}>26</MenuItem>
                  <MenuItem value={27.0}>27</MenuItem>
                  <MenuItem value={28.0}>28</MenuItem>
                  <MenuItem value={29.0}>29</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Water Volume */}
            <Box p="20px">
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="demo-select-small-label">
                  Water Volume (L)
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={waterVolume}
                  label="Water Volume (L)"
                  onChange={handleChangeWaterVolume}
                >
                  <MenuItem value={27.0}>30</MenuItem>
                  <MenuItem value={28.0}>40</MenuItem>
                  <MenuItem value={29.0}>50</MenuItem>
                  <MenuItem value={30.0}>60</MenuItem>
                  <MenuItem value={30.0}>90</MenuItem>
                  <MenuItem value={30.0}>100</MenuItem>
                  <MenuItem value={30.0}>110</MenuItem>
                  <MenuItem value={30.0}>120</MenuItem>
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

            {/* Air Temperature */}
            <Box p="20px">
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="demo-select-small-label">
                  Air Temperature (°C)
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={airTemperature}
                  label="Air Temperature (°C)"
                  onChange={handleChangeAirTemperature}
                >
                  <MenuItem value={22.0}>22</MenuItem>
                  <MenuItem value={23.0}>23</MenuItem>
                  <MenuItem value={24.0}>24</MenuItem>
                  <MenuItem value={25.0}>25</MenuItem>
                  <MenuItem value={26.0}>26</MenuItem>
                  <MenuItem value={27.0}>27</MenuItem>
                  <MenuItem value={28.0}>28</MenuItem>
                  <MenuItem value={29.0}>29</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Air Humidity*/}
            <Box p="20px">
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="demo-select-small-label">
                  Air Humidity (g/m3)
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={airHumidity}
                  label="Air Humidity (g/m3)"
                  onChange={handleChangeAirHumidity}
                >
                  <MenuItem value={20.0}>20</MenuItem>
                  <MenuItem value={30.0}>30</MenuItem>
                  <MenuItem value={40.0}>40</MenuItem>
                  <MenuItem value={50.0}>50</MenuItem>
                  <MenuItem value={60.0}>60</MenuItem>
                  <MenuItem value={70.0}>70</MenuItem>
                  <MenuItem value={80.0}>80</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Plant Height */}
            <Box p="20px">
              <FormControl
                sx={{ m: 1, minWidth: 250, padding: "10px" }}
                size="medium"
              >
                <InputLabel id="demo-select-small-label">
                  Plant Height (cm)
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={plantHeight}
                  label="Plant Height (cm)"
                  onChange={handleChangePlantHeight}
                >
                  <MenuItem value={5.0}>5</MenuItem>
                  <MenuItem value={10.0}>10</MenuItem>
                  <MenuItem value={15.0}>15</MenuItem>
                  <MenuItem value={20.0}>20</MenuItem>
                  <MenuItem value={25.0}>25</MenuItem>
                  <MenuItem value={30.0}>30</MenuItem>
                  <MenuItem value={40.0}>40</MenuItem>
                  <MenuItem value={45.0}>45</MenuItem>
                  <MenuItem value={50.0}>50</MenuItem>
                  <MenuItem value={55.0}>55</MenuItem>
                </Select>
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
