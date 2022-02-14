/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import styled from "styled-components";
import DanjiItem from "./DanjiItem";
import "react-spring-bottom-sheet/dist/style.css";
import "./DanjiListBottomSheet.css";

const LIMIT = 10;

export default function DanjiListBottomSheet({
  searchMapData,
  showBottomSheet,
}) {
  const sheetRef = useRef();

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (sheetRef.current) {
      const header = document.querySelectorAll('[data-rsbs-header="true"]')[0];
      if (!header.children) {
        return;
      }

      const listModeIcon = document.createElement("div");
      listModeIcon.addEventListener("click", () => {
        window.postMessage(
          JSON.stringify({ type: "MESSAGE", data: "LIST_MODE_ICON_CLICKED" })
        );
      });

      listModeIcon.innerHTML = `
        <div class="list-mode-icon">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_298_4040)">
              <path d="M2 24C2 10.7452 12.7452 0 26 0C39.2548 0 50 10.7452 50 24C50 37.2548 39.2548 48 26 48C12.7452 48 2 37.2548 2 24Z" fill="#0F76EE" />
            </g>
            <path d="M36.7745 15.5588H20.3137C20.1897 15.5588 20.0882 15.6594 20.0882 15.7824V17.3471C20.0882 17.47 20.1897 17.5706 20.3137 17.5706H36.7745C36.8985 17.5706 37 17.47 37 17.3471V15.7824C37 15.6594 36.8985 15.5588 36.7745 15.5588ZM36.7745 23.4941H20.3137C20.1897 23.4941 20.0882 23.5947 20.0882 23.7176V25.2824C20.0882 25.4053 20.1897 25.5059 20.3137 25.5059H36.7745C36.8985 25.5059 37 25.4053 37 25.2824V23.7176C37 23.5947 36.8985 23.4941 36.7745 23.4941ZM36.7745 31.4294H20.3137C20.1897 31.4294 20.0882 31.53 20.0882 31.6529V33.2176C20.0882 33.3406 20.1897 33.4412 20.3137 33.4412H36.7745C36.8985 33.4412 37 33.3406 37 33.2176V31.6529C37 31.53 36.8985 31.4294 36.7745 31.4294ZM14 16.5647C14 16.7702 14.0408 16.9737 14.1202 17.1635C14.1995 17.3533 14.3157 17.5258 14.4623 17.6711C14.6089 17.8164 14.7829 17.9317 14.9744 18.0103C15.1659 18.0889 15.3711 18.1294 15.5784 18.1294C15.7857 18.1294 15.991 18.0889 16.1825 18.0103C16.374 17.9317 16.548 17.8164 16.6946 17.6711C16.8411 17.5258 16.9574 17.3533 17.0367 17.1635C17.116 16.9737 17.1569 16.7702 17.1569 16.5647C17.1569 16.3592 17.116 16.1558 17.0367 15.9659C16.9574 15.7761 16.8411 15.6036 16.6946 15.4583C16.548 15.313 16.374 15.1977 16.1825 15.1191C15.991 15.0405 15.7857 15 15.5784 15C15.3711 15 15.1659 15.0405 14.9744 15.1191C14.7829 15.1977 14.6089 15.313 14.4623 15.4583C14.3157 15.6036 14.1995 15.7761 14.1202 15.9659C14.0408 16.1558 14 16.3592 14 16.5647ZM14 24.5C14 24.7055 14.0408 24.9089 14.1202 25.0988C14.1995 25.2886 14.3157 25.4611 14.4623 25.6064C14.6089 25.7517 14.7829 25.867 14.9744 25.9456C15.1659 26.0242 15.3711 26.0647 15.5784 26.0647C15.7857 26.0647 15.991 26.0242 16.1825 25.9456C16.374 25.867 16.548 25.7517 16.6946 25.6064C16.8411 25.4611 16.9574 25.2886 17.0367 25.0988C17.116 24.9089 17.1569 24.7055 17.1569 24.5C17.1569 24.2945 17.116 24.0911 17.0367 23.9012C16.9574 23.7114 16.8411 23.5389 16.6946 23.3936C16.548 23.2483 16.374 23.133 16.1825 23.0544C15.991 22.9758 15.7857 22.9353 15.5784 22.9353C15.3711 22.9353 15.1659 22.9758 14.9744 23.0544C14.7829 23.133 14.6089 23.2483 14.4623 23.3936C14.3157 23.5389 14.1995 23.7114 14.1202 23.9012C14.0408 24.0911 14 24.2945 14 24.5ZM14 32.4353C14 32.6408 14.0408 32.8442 14.1202 33.0341C14.1995 33.2239 14.3157 33.3964 14.4623 33.5417C14.6089 33.687 14.7829 33.8023 14.9744 33.8809C15.1659 33.9595 15.3711 34 15.5784 34C15.7857 34 15.991 33.9595 16.1825 33.8809C16.374 33.8023 16.548 33.687 16.6946 33.5417C16.8411 33.3964 16.9574 33.2239 17.0367 33.0341C17.116 32.8442 17.1569 32.6408 17.1569 32.4353C17.1569 32.2298 17.116 32.0263 17.0367 31.8365C16.9574 31.6467 16.8411 31.4742 16.6946 31.3289C16.548 31.1836 16.374 31.0683 16.1825 30.9897C15.991 30.9111 15.7857 30.8706 15.5784 30.8706C15.3711 30.8706 15.1659 30.9111 14.9744 30.9897C14.7829 31.0683 14.6089 31.1836 14.4623 31.3289C14.3157 31.4742 14.1995 31.6467 14.1202 31.8365C14.0408 32.0263 14 32.2298 14 32.4353Z" fill="white" />
            <defs>
              <filter id="filter0_d_298_4040" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_298_4040" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_298_4040" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      `;

      header.appendChild(listModeIcon);
    }
  }, [sheetRef.current, showBottomSheet]);

  return (
    <>
      <BottomSheet
        open={showBottomSheet}
        ref={sheetRef}
        defaultSnap={({ maxHeight }) => maxHeight / 4}
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 10,
          maxHeight / 4,
          maxHeight * 0.6,
        ]}
        expandOnContentDrag
        blocking={false}
      >
        <Container>
          {searchMapData?.slice(0, LIMIT + offset).map((v) => (
            <React.Fragment key={v._id}>
              <DanjiItem {...v} />
              <Seperator />
            </React.Fragment>
          ))}
        </Container>
      </BottomSheet>
    </>
  );
}

const Container = styled.div`
  background-color: #fff;
`;

const Seperator = styled.div`
  height: 1px;
  background-color: #e9ebee;
`;
