import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Flex, Image, Text, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import Graph from "./custom/graph";
import logo from "/assets/svg/logo_Gotapes-svg.svg";
import "./Status.scss";

export default function Status() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);

  const fetchSummary = async () => {
    try {
      const response = await fetch(
        "https://qvbyy3xrlq32.statuspage.io/api/v2/summary.json"
      );
      const data = await response.json();
      setSummary(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  const fetchIncidents = async () => {
    try {
      const response = await fetch(
        "https://qvbyy3xrlq32.statuspage.io/api/v2/incidents.json"
      );
      const data = await response.json();
      setIncidents(data.incidents);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchIncidents();
  }, []);

  const formatDaysAgo = (dateString) => {
    try {
      const updatedDate = DateTime.fromISO(dateString);
      const currentDate = DateTime.now();
      const diff = updatedDate
        .until(currentDate)
        .toDuration(["days"])
        .toObject();
      const daysDiff = Math.floor(diff.days);
      return `${daysDiff} day${daysDiff !== 1 ? "s" : ""} ago`;
    } catch (error) {
      return "Unknown";
    }
  };

  const castTextStatus = (status) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "degraded_performance":
        return "Degraded Performance";
      case "partial_outage":
        return "Partial Outage";
      case "major_outage":
        return "Major Outage";
      case "maintenance":
        return "Under Maintenance";
      default:
        return "Unknown Status";
    }
  };

  let statusContent;

  if (loading) {
    statusContent = <p>Loading status...</p>;
  } else if (summary) {
    const { status, components } = summary;
    statusContent = (
      <Box className="layout-content status status-index starter">
        <Box className="masthead-container basic">
          <Box className="masthead has-logo">
            <Box className="logo-container" w="max-content" h="max-content">
              <Image alt="Page logo" src={logo} />
            </Box>
          </Box>
        </Box>
        <Box className="container">
          <Box
            className={`component-operation status-${status.indicator}`}
            p={4}
            w="max-content"
          >
            <Heading className="status font-large" fontWeight="bold">
              {status.description}
            </Heading>
            <Text className="last-updated-stamp font-small"></Text>
          </Box>
          <Box className="components-section font-regular">
            <Box style={{ color: "rgb(170, 170, 170)" }}>
              Uptime over the past{" "}
              <var data-var="num" data-pluralize="90">
                90
              </var>{" "}
              days.{" "}
            </Box>
            <Box className="components-container one-column">
              {components.map((component) => (
                <div
                  key={component.id}
                  style={{ borderColor: "rgb(224, 224, 224)" }}
                >
                  <div
                    data-component-id={component.id}
                    className={`component-inner-container status-${component.status} showcased`}
                    data-component-status={component.status}
                    data-js-hook=""
                  >
                    <span className="name">{component.name}</span>{" "}
                    <span title="" className={`${component.status}`}>
                      {castTextStatus(component.status)}
                    </span>{" "}
                    <div className="shared-partial uptime-90-days-wrapper">
                      <Graph component={component} />
                      <div className="legend">
                        <div
                          style={{
                            color: "rgb(170, 170, 170)",
                            opacity: "0.7",
                            textAlign: "center",
                            fontSize: "11px",
                            marginTop: "6px",
                          }}
                        >
                          {formatDaysAgo(component.updated_at)} updated
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    statusContent = <p>No status information available.</p>;
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Helmet>
        <title>Gotapes - Status</title>
        <meta
          name="description"
          content="Check the status of Gotapes and its services."
        />
      </Helmet>
      <Box position="absolute" top={4} right={4}>
        <Link to="/" className="menu_link">
          Home
        </Link>
      </Box>
      <Flex>
        <Box
          className="incidents"
          style={{ minWidth: "200px", maxHeight: "100vh", overflowY: "auto" }}
        >
          {incidents.map((incident) => (
            <Box
              key={incident.id}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              mt={4}
              mr={8}
            >
              <Heading as="h3" size="md">
                {incident.name}
              </Heading>
              <Text mt={2}>{incident.status}</Text>
              <Text mt={2}>{incident.created_at}</Text>
            </Box>
          ))}
        </Box>
        <Box>{statusContent}</Box>
      </Flex>
    </Flex>
  );
}
