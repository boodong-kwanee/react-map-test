import React from "react";
import styled from "styled-components";
import { SearchInputIcon, HistoryMapIcon } from "../../assets";

export default function SearchInput({
  searchInputValue,
  setSearchInputValue,
  autoCompletedData,
  showAutoCompletedList,
  setShowAutoCompletedList,
  handleSearch,
}) {
  return (
    <Container>
      <InputBox>
        <input
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          placeholder="검색어를 입력해 주세요. [지역, 아파트이름, 가격]"
        />
        <SearchIconBox onClick={() => handleSearch(searchInputValue)}>
          <SearchInputIcon />
        </SearchIconBox>
      </InputBox>
      {showAutoCompletedList && (
        <AutoCompletedListBox>
          {searchInputValue &&
            autoCompletedData
              ?.slice(0, 8)
              .map(
                ({
                  _id,
                  sido,
                  gugun1,
                  gugun2,
                  bjdongGibon,
                  danjiName,
                  location: { coordinates },
                }) => {
                  const arr = [
                    sido,
                    gugun1,
                    gugun2,
                    bjdongGibon,
                    danjiName,
                  ].filter((v) => !!v);
                  const address = arr.join(" ");

                  return (
                    <AutoCompletedItemBox
                      key={_id}
                      onClick={() => handleSearch(address, coordinates)}
                    >
                      <AutoCompletedLeftBox>
                        <HistoryMapIcon />
                        <AutoCompletedTitle numberOfLines={1}>
                          {address}
                        </AutoCompletedTitle>
                      </AutoCompletedLeftBox>
                    </AutoCompletedItemBox>
                  );
                }
              )}
        </AutoCompletedListBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 27px;
  left: 0px;
  right: 0px;
  border-radius: 4px;
  z-index: 1000;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  margin: 0 16px;
  padding: 14px 16px;
  border: 0.2px solid #979797;
  border-radius: 4px;
  background-color: #fff;

  input {
    flex: 1;
    margin-left: 0;
    padding-left: 0;
    display: block;
    border: none;
    color: #333849;
    font-size: 14px;
    outline: none;

    &:placeholder {
      color: #b0b3c0;
    }

    &:focus {
      border: none;
    }
  }
`;

const SearchIconBox = styled.div``;

const AutoCompletedListBox = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  z-index: 100;
`;

const AutoCompletedItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  height: 48px;
  background-color: #ffffff;
`;

const AutoCompletedLeftBox = styled.div`
  display: flex;
  align-items: center;
`;

const AutoCompletedTitle = styled.span`
  margin-left: 8px;
  font-size: 16px;
  line-height: 19px;
  color: #202025;
`;
