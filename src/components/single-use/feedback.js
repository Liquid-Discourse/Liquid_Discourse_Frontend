import React from "react";
import styled from "styled-components";

import { HorizontalSpacer } from "components/reusable/spacer";

const Cover = styled.div`
  /* width: 100%; */
  margin-top: 5%;
  padding-top: 6%;
  padding-bottom: 6%;
  padding-left: 10%;
  padding-right: 10%;
  background: #f5f2ef;
  box-shadow: inset 21px 21px 34px #e6e3e1, inset -21px -21px 34px #fffffd;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 3.5vh;
  font-family: Montaga;
`;

const Subtitle = styled.div`
  font-size: 2vh;
  font-family: Poppins;
`;

const Created = styled.div`
  font-size: 1.6vh;
  font-family: Poppins;
`;

const Button = styled.a`
  border: none;
  font-family: Poppins;
  font-size: 2vh;
  cursor: pointer;
  color: black;
`;

const Feedback = () => {
  return (
    <Cover>
      <div>
        <Subtitle>Want to make this website better?</Subtitle>
        <HorizontalSpacer size={20} />
        <Button href="https://admin.typeform.com/form/apgWrLfV/share#/">
          Send us some feedback
        </Button>
      </div>
    </Cover>
  );
};

export default Feedback;
