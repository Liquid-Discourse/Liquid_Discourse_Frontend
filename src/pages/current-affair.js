import React, { useEffect, useState } from "react";
import Card from "../components/current-affair-card";
import styled from "styled-components";

const CurrentAffair = (props) => {
  const [affair, setAffair] = useState();
  useEffect(() => {
    const getCurrentAffair = async () => {
      const id = props.match.params.id;
      setAffair(id);
    };
    getCurrentAffair();
  }, []);

  return (
    <div>
      <div>Current affair {affair}</div>
    </div>
  );
};

export default CurrentAffair;
