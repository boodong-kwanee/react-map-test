import React, { useState, useRef } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import styled from "styled-components";

export default function DanjiListBottomSheet() {
  const [expandOnContentDrag, setExpandOnContentDrag] = useState(true);

  const sheetRef = useRef();

  return (
    <>
      <BottomSheet
        style={{ zIndex: 10, top: 80 }}
        open
        // skipInitialTransition
        // sibling={<CloseExample className="z-10" />}
        ref={sheetRef}
        // initialFocusRef={focusRef}
        defaultSnap={({ maxHeight }) => maxHeight / 2}
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 10,
          maxHeight / 4,
          maxHeight * 0.6,
        ]}
        style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
        expandOnContentDrag={expandOnContentDrag}
      >
        <Container>바텀 싯</Container>
      </BottomSheet>
    </>
  );
}

const Container = styled.div`
  height: 200px;
  background-color: #fff;
`;

const SnapMarker = styled.div``;
