import { useEffect, useState } from "react";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import L from "leaflet";
import PropTypes from "prop-types";
import trackerIcon from "./icon.svg";
import trackerIconActive from "./icon_active.svg";
import { Popup } from "react-leaflet";

const icon = L.icon({
    iconSize: [30, 30],
    popupAnchor: [2, -20],
    iconUrl: trackerIcon,
});

const icon_active = L.icon({
    iconSize: [30, 30],
    popupAnchor: [2, -20],
    iconUrl: trackerIconActive,
});

const LiveTracker = ({ data }) => {
    const { lat, lng, name, hovered } = data;
    const [prevPos, setPrevPos] = useState([lat, lng]);

    useEffect(() => {
        if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
    }, [lat, lng, prevPos]);

    return (
        <LeafletTrackingMarker
            icon={name === hovered ? icon_active : icon}
            position={[lat, lng]}
            previousPosition={prevPos}
            duration={1000}
        >
            <Popup>{name}</Popup>
        </LeafletTrackingMarker>
    );
};

LiveTracker.propTypes = {
    data: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
        name: PropTypes.string,
        hovered: PropTypes.string,
    }),
};

export default LiveTracker;
