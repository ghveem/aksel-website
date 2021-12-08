import { ExternalLink } from "@navikt/ds-icons";
import { BodyShort, Heading } from "@navikt/ds-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Changelog,
  CodeExample,
  LastUpdateTag,
  LayoutContext,
  LevelTwoHeading,
  slugger,
  StatusTag,
  TableOfContents,
  Tabs,
} from "../..";
import {
  DsChangelog,
  DsCodeExample,
  DsComponentPage,
} from "../../../lib/autogen-types";
import { PagePropsContext } from "../../../pages/_app";
import { SanityBlockContent } from "../../SanityBlockContent";
import * as S from "./page.styles";

const ScLinks = styled.div`
  display: flex;
  column-gap: 0.25rem;
  flex-wrap: wrap;

  margin-left: var(--navds-spacing-4);
  right: 0;
  top: 0;

  a {
    text-decoration: none;
    color: var(--navds-semantic-color-text);
    padding: calc(0.75rem + 2px) 0.25rem;
    transition: box-shadow 100ms;
    justify-content: center;
    display: flex;
    gap: 0.25rem;

    :hover {
      text-decoration: underline;
      background: var(--navds-global-color-blue-50);
    }

    :focus {
      outline: none;
      box-shadow: 0 0 0 3px var(--navds-semantic-color-focus);
    }

    :active {
      background-color: var(--navds-semantic-color-focus);
      color: var(--navds-semantic-color-text-inverted);
    }
  }
`;

const ScDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--navds-spacing-2);
  justify-content: flex-start;
`;

const MarginTop = styled.div`
  margin-top: 3rem;
`;

const ComponentPageTemplate = ({
  data,
  changelogs,
  title,
}: {
  data: DsComponentPage;
  changelogs: DsChangelog[];
  title: string;
}): JSX.Element => {
  const { query, asPath } = useRouter();
  const { pageProps } = useContext(PagePropsContext);
  const layout = useContext(LayoutContext);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = {
    bruk: "usage",
    design: "design",
    utvikling: "development",
    tilgjengelighet: "accessibility",
  };

  useEffect(() => {
    slugger.reset();
  });

  useEffect(() => {
    setActiveTab(Object.keys(tabs).indexOf(query.slug[2] ?? "bruk"));
  }, [query.slug]);

  // TODO: Simplify this atrocity
  const installSnippetTabs: DsCodeExample | undefined =
    data?.linked_packages && {
      _type: "ds_code_example",
      title: `Install-snippet for ${data.heading}`,
      _id: `Install-snippet-for-${data.heading}`,
      preview: null,
      autogenerated: false,
      infercode: false,
      _createdAt: new Date().toString(),
      _updatedAt: new Date().toString(),
      _rev: new Date().toString(),
      tabs: [
        {
          _key: "Install snippet yarn",
          _type: "code_example_example",
          title: "Yarn",
          example: {
            language: "bash",
            code: `yarn add ${((data as any)?.linked_packages)
              .map((x) => x.title)
              .join(" ")}`,
          },
        },
        {
          _key: "Install snippet npm",
          _type: "code_example_example",
          title: "Npm",
          example: {
            language: "bash",
            code: `npm i ${((data as any)?.linked_packages)
              .map((x) => x.title)
              .join(" ")}`,
          },
        },
      ],
    };

  const basePath = `/designsystem/${(query.slug as string[])
    .slice(0, 2)
    .join("/")}`;

  const value = Object.values(tabs)?.[activeTab];
  const tabKey = Object.keys(tabs)?.[activeTab];

  return (
    <>
      <Head>
        <>
          <title>
            {pageProps?.page?.heading
              ? `${pageProps?.page?.heading} ${tabKey} - ${title}`
              : title}
          </title>
          <meta
            property="og:title"
            content={`${data.heading} - Designsystemet`}
          />
        </>
      </Head>

      <S.MaxWidthContainer>
        <S.HeadingContainer>
          <Heading
            size={
              layout.isTablet
                ? layout.isMobile
                  ? "large"
                  : "xlarge"
                : "2xlarge"
            }
            level="1"
            spacing
          >
            {data.heading}
          </Heading>
          <ScDiv>
            <S.Inline>
              <StatusTag status={data.status} />
              <LastUpdateTag date={data?.metadata?.last_update} />
            </S.Inline>
            <ScLinks>
              {data.npm_link && (
                <BodyShort size="small" as="a" href={data.npm_link}>
                  NPM
                  <ExternalLink aria-label="Gå til NPM pakke" />
                </BodyShort>
              )}
              {data.github_link && (
                <BodyShort size="small" as="a" href={data.github_link}>
                  Github
                  <ExternalLink aria-label="Gå til github-kode" />
                </BodyShort>
              )}
              {data.figma_link && (
                <BodyShort size="small" as="a" href={data.figma_link}>
                  Figma
                  <ExternalLink aria-label="Åpne i Figma" />
                </BodyShort>
              )}
            </ScLinks>
          </ScDiv>
        </S.HeadingContainer>
        {data.ingress && <SanityBlockContent isIngress blocks={data.ingress} />}
      </S.MaxWidthContainer>
      <Tabs
        title={data.heading}
        tabs={[
          ...Object.entries(tabs)
            .map(([key, value], i) => {
              const [first, ...rest] = key;
              return data[value]
                ? {
                    name: first.toUpperCase() + rest.join(""),
                    path: `${basePath}${key === "bruk" ? "" : "/" + key}`,
                    active:
                      activeTab === i
                        ? activeTab === i
                        : `${basePath}${key === "bruk" ? "" : "/" + key}` ===
                          new URL(asPath, "http://example.com").pathname,
                  }
                : null;
            })
            .filter((x) => !!x),
        ]}
      />
      <S.SanityBlockContainer>
        <TableOfContents changedState={data[value]} />
        <S.MaxWidthContainer>
          {value === "development" && installSnippetTabs && (
            <MarginTop>
              <LevelTwoHeading>{["Installasjon"]}</LevelTwoHeading>
              <CodeExample node={installSnippetTabs} />
            </MarginTop>
          )}
          {data[value] && (
            <SanityBlockContent withMargin blocks={data[value]} />
          )}
          {value === "development" && (
            <Changelog changelogs={changelogs} id={data._id} />
          )}
        </S.MaxWidthContainer>
      </S.SanityBlockContainer>
    </>
  );
};

export default ComponentPageTemplate;
