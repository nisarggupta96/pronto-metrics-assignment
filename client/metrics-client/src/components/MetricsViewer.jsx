import { useEffect, useState } from "react";
import MetricsTable from "./MetricsTable";
import { Box, Spinner } from "@chakra-ui/react";
import MapViewer from "./MapViewer";

const MetricsViewer = () => {
    const [metricsData, setMetricsData] = useState([]);
    const [namesToHide, setNamesToHide] = useState([]);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        // opening a connection to the server to begin receiving events from it
        const eventSource = new EventSource("http://127.0.0.1:8000/metrics");

        // attaching a handler to receive message events
        eventSource.addEventListener("message", (event) => {
            const updatedData = JSON.parse(event.data);
            // console.log(["[EVENTSOURCE UPDATE]"]);
            setMetricsData([...updatedData]);
        });

        // terminating the connection on component unmount
        return () => eventSource.close();
    }, []);

    const checkHandled = (checked, nameToHide) => {
        // buggy implementation -> need to handle the case where a previously
        // hidden name is not in top 10 list
        if (!checked) {
            setNamesToHide([...namesToHide, nameToHide]);
        } else {
            const newNamesToHide = namesToHide.filter(
                (name) => name != nameToHide
            );
            setNamesToHide(newNamesToHide);
        }
    };

    if (metricsData.length === 0) {
        return (
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                h={"calc(100vh - 46px)"}
            >
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="darkslategray"
                    size="xl"
                />
            </Box>
        );
    }

    return (
        <Box w={"70%"} m={"auto"}>
            <MetricsTable metricsData={metricsData} />
            <MapViewer
                metricsData={metricsData}
                checkHandled={checkHandled}
                hovered={hovered}
                setHovered={setHovered}
                namesToHide={namesToHide}
            />
        </Box>
    );
};

export default MetricsViewer;
