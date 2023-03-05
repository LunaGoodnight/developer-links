import React from "react";
import { NavLink } from "react-router-dom";
import { LeftMenu } from "./styles/components/styled";

export const LeftMenuContainer = ({
  sortedList,
  setSearchValue,
  setShowSearch,
}) => {
  const handleClearSearch = () => {
    setShowSearch(false);
    setSearchValue("");
  };
  return (
    <LeftMenu>
      <ul>
        {sortedList.map((item) => {
          const { path, text } = item;
          return (
            <li key={path} onClick={handleClearSearch}>
              <NavLink to={path}>{text}</NavLink>
            </li>
          );
        })}
      </ul>
    </LeftMenu>
  );
};
