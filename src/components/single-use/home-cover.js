import React from "react";
import styled from "styled-components";

import { HorizontalSpacer } from "components/reusable/spacer";
import scribble from "assets/scribbles-scribbles-73.png";
import scribble2 from "assets/scribbles-scribbles-7.png";

const Cover = styled.div`
  width: 100%;
  padding-top: 6%;
  padding-bottom: 9%;
  padding-left: 10%;
  padding-right: 10%;
  background: #f5f2ef;
  box-shadow: inset 21px 21px 34px #e6e3e1, inset -21px -21px 34px #fffffd;
`;

const Title = styled.div`
  font-size: 3.5vh;
  font-family: Montaga;
`;

const Subtitle = styled.div`
  font-size: 1.7vh;
  font-family: Poppins;
  width: 70%;
  line-height: 20px;
`;

const HomeCover = () => {
  return (
    <Cover>
      <Title>Find Books</Title>
      <HorizontalSpacer size={30} />
      <Subtitle>
        With the recent Black Lives Matter protests, books on anti-racism and
        Black history were circulated widely to provide context. We hope that
        this website can help promote the practice of gathering books around
        important societal issues. Currently, we are focusing on the Black Lives
        Matter movement, and eventually hope to source books from thoughtful
        community members around a selection of important issues.
      </Subtitle>
    </Cover>
  );
};

export default HomeCover;

{
  /* <div
style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}}
>
<div
  style={{
    width: "130px",
    height: "auto",
    marginRight: "20px",
  }}
>
  <img
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: " scaleX(-1) rotate(-20deg)",
    }}
    alt="squiggle"
    src={scribble}
  />
</div>
<Title>Find and review books on the issues that matter.</Title>
<p>
  We've been amazed by the resources shared on social media on
  anti-racism. We hope this website can be a long-lasting space for
  books on issues that matter. Currently, we are focusing on the Black
  Lives Matter movement, and eventually hope to source books from
  thoughtful community members around a selection of important issues.
</p>
<div
  style={{
    width: "160px",
    height: "auto",
    marginRight: "10px",
  }}
>
  <img
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
    alt="line"
    src={scribble2}
  />
</div>
</div> */
}
