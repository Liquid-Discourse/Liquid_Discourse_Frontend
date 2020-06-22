import React from "react";
import styled from "styled-components";
import { useHistory, withRouter } from "react-router-dom";
import { HorizontalSpacer, VerticalSpacer } from "components/reusable/spacer";

const Border = styled.div`
  background: #f5f2ef;
  box-shadow: 5px 5px 14px #d0cecb, -5px -5px 14px #ffffff;
  border-radius: 10px;
  height: 250px;
  position: relative;
  padding: 20px 10px;
  &:hover {
    background-color: #ff9e80;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-family: Montaga;
  word-wrap: break-word;
  text-align: center;
  width: 100%;
`;

const SubTitle = styled.div`
  padding-top: 10px;
  font-size: 1.7vh;
  font-family: Poppins;
  text-align: center;
  width: 100%;
`;

const Inset = styled.div`
  font-size: 12px;
  background: #f5f2ef;
  box-shadow: inset 6px 6px 12px #e6e3e1, inset -6px -6px 12px #fffffd;
  border-radius: 5px;
  padding: 7px;
  box-sizing: border-box;
  font-family: Poppins;
  word-wrap: break-word;
  width: 100%;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const HStack = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const BookCard = ({ id, name, authors, topics, recommenders, rating }) => {
  const history = useHistory();

  const redirectCurrentAffair = (id) => {
    history.push({ pathname: "/books/" + id });
  };

  return (
    <Border onClick={() => redirectCurrentAffair(id)}>
      <VStack>
        {/* Top */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <HorizontalSpacer size={20} />
            <Title>{name}</Title>
            <SubTitle>
              {authors?.map((a, i) => (
                <div key={i}>{a}</div>
              ))}
            </SubTitle>
          </div>
        </div>
        {/* Bottom */}
        <div style={{ width: "100%" }}>
          {topics ? <Inset>{topics}</Inset> : null}
          <HorizontalSpacer size={10} />
          <HStack>
            <Inset>{recommenders} reviews</Inset>
            <VerticalSpacer size={15} />
            <Inset>{rating}/5 stars</Inset>
          </HStack>
        </div>
      </VStack>
    </Border>
  );
};

export default withRouter(BookCard);
