import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typography, useTheme, Box, Button } from "@mui/material";
import { tokens } from "../theme";

const LineChartComponent = ({ dataKey, timestamp, data, graphTitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [visibleData, setVisibleData] = useState(data);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setVisibleData(data);
  }, [data]);

  const zoomIn = () => {
    const newSize = Math.max(visibleData.length / 2, 1);
    const startIndex = Math.floor((visibleData.length - newSize) / 2);
    const newVisibleData = visibleData.slice(startIndex, startIndex + newSize);
    setVisibleData(newVisibleData);
    setZoomLevel(zoomLevel * 2);
  };

  const zoomOut = () => {
    if (zoomLevel > 1) {
      const newSize = Math.min(visibleData.length * 2, data.length);
      const startIndex = Math.max(Math.floor((data.length - newSize) / 2), 0);
      const newVisibleData = data.slice(startIndex, startIndex + newSize);
      setVisibleData(newVisibleData);
      setZoomLevel(zoomLevel / 2);
    }
  };

  const numericData = visibleData.map((item) => ({
    ...item,
    [dataKey]: parseFloat(item[dataKey]),
  }));

  return (
    <Box sx={{ mt: 0.5, mb: 0.5, boxShadow: 5 }}>
      <Typography
        variant="h4"
        color={colors.greenAccent[500]}
        sx={{ m: 0.5, p: 0.25 }}
        gutterBottom
      >
        {graphTitle}
      </Typography>
      <Box sx={{ mb: 1, textAlign: "center" }}>
        <Button
          onClick={zoomIn}
          variant="filled"
          color={colors.grey[100]}
          sx={{
            padding: "4px",
            margin: "4px",
            borderColor: "inherit",
            backgroundColor: colors.blueAccent[700],
          }}
          disabled={zoomLevel >= 5}
        >
          Zoom In
        </Button>
        <Button
          onClick={zoomOut}
          variant="filled"
          color={colors.grey[100]}
          sx={{
            padding: "4px",
            margin: "4px",
            borderColor: "inherit",
            backgroundColor: colors.blueAccent[700],
          }}
          disabled={zoomLevel <= 1}
        >
          Zoom Out
        </Button>
      </Box>
      <ResponsiveContainer width="90%" height={250}>
        <LineChart
          data={numericData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={colors.grey[100]}
            fill="rgba(255, 255, 255, 0.3)"
          />
          <CartesianGrid stroke={theme.palette.divider} strokeDasharray="3 3" />
          <XAxis dataKey={timestamp} stroke={theme.palette.text.secondary} />
          <YAxis
            dataKey={dataKey}
            stroke={theme.palette.text.secondary}
            tickFormatter={(value) => Number(value).toFixed(2)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.divider,
            }}
            cursor={{ stroke: theme.palette.primary.light, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChartComponent;
