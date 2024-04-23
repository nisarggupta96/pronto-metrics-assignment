import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { COLUMNS, DISPLAY_TOP_THRESHOLD } from "../utils/constants";

const MetricsTable = ({ metricsData }) => {
    return (
        <Box m={10}>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            {COLUMNS.map((col) => (
                                <Th
                                    key={col.accessor}
                                    isNumeric={col.isNumeric}
                                >
                                    {col.displayName}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {metricsData
                            .slice(0, DISPLAY_TOP_THRESHOLD)
                            .map((metricsRow) => {
                                return (
                                    <Tr key={metricsRow.name}>
                                        {COLUMNS.map((col) => (
                                            <Td
                                                key={col.accessor}
                                                isNumeric={col.isNumeric}
                                            >
                                                {metricsRow[col.accessor]}
                                            </Td>
                                        ))}
                                    </Tr>
                                );
                            })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

MetricsTable.propTypes = {
    metricsData: PropTypes.array,
};

export default MetricsTable;
