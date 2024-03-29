import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { routeList } from "./config/routeList";
import SiteList from "./components/SiteList";
import { BiSearchAlt } from "react-icons/bi";
import { MobileMenu } from "./MobileMenu";
import { Hamburger } from "./Hamburger";
import {
  ContentWrapper,
  Content,
  Header,
  LeftMenu,
} from "./styles/components/styled";
import { GrFormClose } from "react-icons/gr";
import Home from "./Home";
import "./App.css";
import { LeftMenuContainer } from "./LeftMenuContainer";

export const SearchIcon = styled.div`
  position: absolute;
  right: 3vw;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const WrapSearchBox = styled.div`
  width: 30%;
  right: 0;
  height: 8vh;
  position: fixed;
`;
export const BigSearchBox = styled.input`
  width: 100%;
  height: 100%;
  //left: 50%;
  //transform: translate(-50%, 0);
  outline: none;
  text-indent: 1rem;
  font-size: 3rem;
`;
export const CloseIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 3rem;
  right: 1rem;
  line-height: 0;
  cursor: pointer;
`;
function App() {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const allList = useMemo(
    () =>
      routeList.reduce((a, c) => {
        if (c.importList) {
          return a.concat(c.importList);
        }
        return a;
      }, []),
    []
  );
  const [filteredList, setFilteredList] = useState(allList);
  const sortedList = useMemo(
    () =>
      routeList.sort((a, b) => {
        const nameA = a.path.toUpperCase();
        const nameB = b.path.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }),
    []
  );

  useEffect(() => {
    if (showSearch) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const findSameText = (site) => {
      const newSearchString = searchValue.toUpperCase();

      if (site?.description) {
        return site.description.toUpperCase().indexOf(newSearchString) !== -1;
      }
      if (site.title) {
        return site.title.toUpperCase().indexOf(newSearchString) !== -1;
      }
      if (site.link) {
        return site.link.toUpperCase().indexOf(newSearchString) !== -1;
      }
      return false;
    };

    if (searchValue !== "" && searchValue.length >= 2) {
      setFilteredList(allList.filter(findSameText));
    }
  }, [searchValue, allList]);

  return (
    <Router>
      <div className="App">
        <MobileMenu />
        <Header className="App-header">
          <h2>Developer Links</h2>
          <Hamburger />
          <SearchIcon onClick={() => setShowSearch((prev) => !prev)}>
            <BiSearchAlt color="#fff" />
          </SearchIcon>
        </Header>

        {showSearch && (
          <WrapSearchBox>
            <BigSearchBox
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <CloseIconWrapper onClick={() => setShowSearch(false)}>
              <GrFormClose color="#ddd" />
            </CloseIconWrapper>
          </WrapSearchBox>
        )}
        <ContentWrapper>
          <LeftMenuContainer
            sortedList={sortedList}
            setShowSearch={setShowSearch}
            setSearchValue={setSearchValue}
          />
          {showSearch && searchValue.length >= 2 && (
            <Content>
              <SiteList list={filteredList} />
            </Content>
          )}
          {!showSearch && (
            <Switch>
              {routeList.map((item) => {
                const { path, importList } = item;
                return (
                  <Route path={`/${path}`} key={path}>
                    {importList ? (
                      <Content>
                        <SiteList
                          list={importList}
                          video={path === "youtube"}
                        />
                      </Content>
                    ) : (
                      <Content>
                        <Home />
                      </Content>
                    )}
                  </Route>
                );
              })}

              <Route path="/index.html" key="home">
                <Content>
                  <Home />
                </Content>
              </Route>
            </Switch>
          )}
        </ContentWrapper>
      </div>
    </Router>
  );
}

export default App;
