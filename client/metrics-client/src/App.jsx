import { ChakraProvider, Box } from "@chakra-ui/react";
import "./App.css";
import MetricsViewer from "./components/MetricsViewer";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";

const Header = () => (
    <Box
        p={2}
        textAlign={"center"}
        fontSize={"xl"}
        bg={"darkslategray"}
        color={"white"}
        fontWeight={"bold"}
    >
        METRICS TRACKER
    </Box>
);

const App = () => {
    return (
        <ChakraProvider>
            <Header />
            <MetricsViewer />
        </ChakraProvider>
    );
};

export default App;
