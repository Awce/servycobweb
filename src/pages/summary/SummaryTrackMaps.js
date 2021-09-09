import React from "react";
import { Card } from "antd";
import TrackerMaps from "../../components/TrackerMaps";

const SummaryTrackMaps = () => {
  return (
    <div style={{ marginTop: "3px" }}>
      <Card>
        <TrackerMaps />
      </Card>
    </div>
  );
};

export default SummaryTrackMaps;
