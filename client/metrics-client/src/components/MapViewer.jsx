import { MapContainer, TileLayer } from "react-leaflet";
import LiveTracker from "./LiveTracker";
import { DISPLAY_TOP_THRESHOLD } from "../utils/constants";
import { Box, Checkbox, HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

const MapViewer = ({
    metricsData,
    namesToHide,
    hovered,
    setHovered,
    checkHandled,
}) => {
    return (
        <HStack m={10} w={"100%"}>
            <Box w={"85%"}>
                <MapContainer
                    style={{ height: "600px" }}
                    center={[38, -122]}
                    zoom={6}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {metricsData
                        .slice(0, DISPLAY_TOP_THRESHOLD)
                        .filter(
                            (metricsRow) =>
                                !namesToHide.includes(metricsRow["name"])
                        )
                        .map((metricsRow) => (
                            <LiveTracker
                                key={metricsRow["name"]}
                                data={{
                                    lat: metricsRow["lat"],
                                    lng: metricsRow["lng"],
                                    name: metricsRow["name"],
                                    hovered: hovered,
                                }}
                            />
                        ))}
                </MapContainer>
            </Box>
            <Box ml={2} p={2} display={"flex"} flexDirection={"column"}>
                {metricsData
                    .slice(0, DISPLAY_TOP_THRESHOLD)
                    .map((metricsRow) => (
                        <Checkbox
                            p={"5px"}
                            defaultChecked
                            key={metricsRow["name"]}
                            onMouseOver={() => {
                                setHovered(metricsRow["name"]);
                            }}
                            onMouseOut={() => setHovered(null)}
                            onChange={(event) =>
                                checkHandled(
                                    event.target.checked,
                                    metricsRow["name"]
                                )
                            }
                        >
                            {metricsRow["name"]}
                        </Checkbox>
                    ))}
            </Box>
        </HStack>
    );
};

MapViewer.propTypes = {
    metricsData: PropTypes.array,
    namesToHide: PropTypes.array,
    hovered: PropTypes.string,
    setHovered: PropTypes.func,
    checkHandled: PropTypes.func,
};

export default MapViewer;
