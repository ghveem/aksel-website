/* Frontpage */

import { Facilitet, Search } from "@navikt/ds-icons";
import { Heading, Ingress, BodyLong, Label } from "@navikt/ds-react";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { NAVLogoDark } from "../../components";
import { PagePropsContext } from "../_app";

const ScIntro = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 650px;
  text-align: center;
`;

const ScLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  > * {
    justify-self: center;
    font-size: 2rem;
  }
`;

const ScNav = styled.nav`
  margin: 4rem auto 0 auto;
`;

const ScOl = styled.ol`
  margin: 0;
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0;
  list-style: none;

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ScCard = styled.a`
  height: 20rem;
  width: 18rem;
  text-decoration: none;
  color: var(--navds-color-darkgray);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3rem 2rem 2rem 2rem;
  border-radius: 8px;
  border: 2px solid var(--navds-color-gray-20);
  background-color: white;
  position: relative;

  :hover {
    box-shadow: 0 16px 18px -13px rgba(0, 0, 0, 0.1),
      0 17px 36px -14px rgba(0, 0, 0, 0.17);
  }

  :focus {
    border-color: var(--navds-color-text-focus);
    outline: none;
  }
`;

const ScBeta = styled(Label)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem 0.5rem;
  background-color: var(--navds-color-lightblue-10);
  border-bottom-left-radius: 4px;
  border-top-right-radius: 6px;
`;

const ScIcon = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  flex-shrink: 0;
  background: linear-gradient(
    -52deg,
    rgba(153, 195, 255, 1) 0%,
    rgba(153, 195, 255, 1) 50%,
    rgba(204, 225, 255, 1) 50%,
    rgba(204, 225, 255, 1) 100%
  );

  svg {
    font-size: 1.5rem;
    margin-top: 0.25rem;
    margin-left: 0.25rem;
  }
`;

const ScBodyLong = styled(BodyLong)`
  text-align: center;
`;

const ScFrontpage = styled.div`
  padding: 3rem;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Page = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPageData] = useContext(PagePropsContext);
  useEffect(() => {
    setPageData({});
  }, []);

  return (
    <ScFrontpage>
      <ScIntro>
        <ScLogoWrapper>
          <NAVLogoDark />
        </ScLogoWrapper>
        <Heading spacing level="1" size="2xlarge">
          Designsystemet v2 BETA
        </Heading>
        <Ingress>
          Dokumentasjon for komponenter, ressurser, guider og alt som skal til
          for å komme i gang med design og utvikling av frontend-løsninger i
          NAV.
        </Ingress>
      </ScIntro>

      <ScNav aria-label="Side navigasjon">
        <ScOl>
          <li>
            <NextLink passHref href="/designsystem/side/oversikt-komponenter">
              <ScCard>
                <ScBeta>BETA</ScBeta>
                <ScIcon className="card__icon">
                  <Facilitet aria-label="pusslebrikke ikon" />
                </ScIcon>
                <Heading spacing level="2" size="medium">
                  Komponenter
                </Heading>
                <ScBodyLong>Dokumentasjon for nye komponenter</ScBodyLong>
              </ScCard>
            </NextLink>
          </li>
          <li>
            <NextLink passHref href="/designsystem/side/ikoner/ikonsøk">
              <ScCard>
                <ScBeta>BETA</ScBeta>
                <ScIcon className="card__icon">
                  <Search aria-label="søk-ikon" />
                </ScIcon>
                <Heading spacing level="2" size="medium">
                  Ikonsøk
                </Heading>
                <ScBodyLong>
                  Se gjennom alle NAV sine publiserte ikoner
                </ScBodyLong>
              </ScCard>
            </NextLink>
          </li>
        </ScOl>
      </ScNav>
    </ScFrontpage>
  );
};

export const getStaticProps = async () => {
  return {
    props: { slug: "/designsystem" },
  };
};

export default Page;
