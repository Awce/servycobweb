import React, { useState, useEffect } from "react";
import { Timeline } from "antd";
import { getDictations } from "../../services/firebase";

const DictationsContactsPrevList = () => {
  const [dictations, setDictations] = useState([]);

  useEffect(() => {
    const getDictationsFirebase = () => {
      getDictations()
        .then((res) => {
          console.log(res);
          setDictations(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getDictationsFirebase();
  }, []);

  return (
    <Timeline>
      {dictations.map((dictation, key) => (
        <Timeline.Item key={key}>
          {dictation.dictation} / {dictation.subdictation} / {dictation.reason}{" "}
          {dictation.date} | {dictation.comment}
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default DictationsContactsPrevList;
