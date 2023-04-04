import styled from "styled-components";
import AdSense from "react-adsense";
import { NavLink } from "react-router-dom";

const IndexWrapper = styled.div`
  padding: 6rem 0 0 10rem;
  font-size: 2rem;
  text-align: left;

  @media only screen and (max-width: 768px) {
    padding: 2rem;
  }
`;

const CoffeeButton = styled.a`
  margin: 2rem 0;
  display: block;
`;

const AdsenseWrapper = styled.div`
  display: block;
  width: 100%;
  height: 50rem;
`;

const Ins = styled.ins`
  display: block;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2rem;
  padding-bottom: 5rem;
`;

const NavButton = styled(NavLink)`
  border: none;
  background: ${(props) => (props.background ? props.background : "teal")};
  color: #fff;
  padding: 1rem 0.5rem;
  display: block;
  width: 30rem;
  border-radius: 8px;
  text-align: center;
`;

export default function Home() {
  return (
    <IndexWrapper>
      <p>Hi, I collect some useful websites from Internet.</p>
      <p>Contact me if you wish me put some website here.</p>
      <p>javaspringtea@gmail.com</p>
      <ButtonWrapper>
        <NavButton to="general">See Tutorial Page</NavButton>
        <NavButton to="job" background="#3548d3">
          See Job Hunting Page
        </NavButton>
      </ButtonWrapper>
      <CoffeeButton
        href="https://www.buymeacoffee.com/lunaCute"
        target="_blank"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          style={{ height: "60px", width: "217px" }}
        />
      </CoffeeButton>
      <AdsenseWrapper>
        <Ins
          className="adsbygoogle"
          data-ad-client="ca-pub-2367606842074628"
          data-ad-slot="9259816228"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <AdSense.Google client="ca-pub-2367606842074628" slot="9259816228" />
      </AdsenseWrapper>
    </IndexWrapper>
  );
}
