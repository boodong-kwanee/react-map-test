import React from "react";
import styled from "styled-components";
import { SmallArrowRightIcon } from "../../assets";

export default function DanjiItem({ _id, danjiName, prices }) {
  return (
    <Container onClick={() => console.log(_id)}>
      <DanjiName>{danjiName}</DanjiName>
      <InnerContainer>
        <InfoContainer>
          <Title>평균매매가</Title>
          <Price>
            {prices[0]?.silgeoraega
              ? `${(prices[0]?.silgeoraega / 10000).toFixed(1)}억`
              : ""}
          </Price>
          <Seperator />
          <Rating>
            {prices[0]?.prediction.twoYears}%{" "}
            {prices[0]?.prediction.twoYears >= 0 ? "상승" : "하락"}
          </Rating>
          {/* <TagContainer>
        {tags.map(t => (
          <TagBox key={`${name}-${t.id}`}>
            <TagName>{t.name}</TagName>
          </TagBox>
        ))}
      </TagContainer> */}
        </InfoContainer>
        <SmallArrowRightIcon />
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100px;
  padding: 24px 16px;
  background-color: #fff;
`;

const DanjiName = styled.div`
  margin-bottom: 10px;
  color: #333849;
  font-size: 18px;
  font-weight: 700;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  margin-right: 8px;
  font-size: 13px;
  color: #777e97;
`;

const Price = styled.span`
  font-size: 13px;
  color: #333849;
`;

const Seperator = styled.div`
  width: 1px;
  height: 12px;
  margin: 0 8px;
  background-color: #dddee5;
`;

const Rating = styled(Title)``;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const TagBox = styled.div`
  padding: 4px 8px;
  margin-right: 8px;
  background-color: #f3f8fd;
  border-radius: 4px;
`;

const TagName = styled.div`
  font-size: 11px;
  color: #0f76ee;
`;
