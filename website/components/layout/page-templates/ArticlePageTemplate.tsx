import { Heading, useClientLayoutEffect } from "@navikt/ds-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { flattenBlocks } from "sanity-algolia";
import {
  AmplitudeEvents,
  Feedback,
  LastUpdateTag,
  PagePropsContext,
  RelatedNavigation,
  slugger,
  TableOfContents,
  useAmplitude,
} from "../..";
import { DsArticlePage } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";

const ActiclePageTemplate = ({
  data,
  title,
}: {
  data: DsArticlePage;
  title: string;
}): JSX.Element => {
  const { asPath } = useRouter();
  const { pageProps } = useContext(PagePropsContext);
  const { logAmplitudeEvent } = useAmplitude();

  useClientLayoutEffect(() => {
    slugger.reset();
  });

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: asPath,
    });
  }, [asPath]);

  if (!data.body || !data.heading) {
    return null;
  }

  return (
    <>
      <Head>
        {data.heading && (
          <>
            <title>{`${data.heading} - ${title}`}</title>
            <meta property="og:title" content={`${data.heading} - ${title}`} />
            {data.ingress && (
              <meta name="description" content={flattenBlocks(data.ingress)} />
            )}
          </>
        )}
      </Head>
      <div className="content-box">
        <div className="pt-8 pb-6">
          <Heading size="xlarge" level="1" spacing className="index-lvl1">
            {data.heading}
          </Heading>
          <LastUpdateTag date={data._updatedAt} />
        </div>
        {data.ingress && <SanityBlockContent isIngress blocks={data.ingress} />}
      </div>
      <div className="relative flex max-w-full lg:max-w-7xl">
        <TableOfContents changedState={data.body} />
        <div className="content-box">
          <SanityBlockContent className="mt-12" blocks={data.body} />
          {!data?.metadata_feedback?.hide_feedback && (
            <Feedback
              docId={pageProps?.page?._id}
              docType={pageProps?.page?._type}
            />
          )}
          <RelatedNavigation />
        </div>
      </div>
    </>
  );
};

export default ActiclePageTemplate;
