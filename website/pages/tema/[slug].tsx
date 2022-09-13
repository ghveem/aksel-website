import { abbrName, ArtikkelCard, BreadCrumbs } from "@/components";
import { AkselHeader, Footer } from "@/layout";
import {
  AkselArtikkel,
  akselTemaDocs,
  getAkselTema,
  getTemaSlug,
  SanityT,
  usePreviewSubscription,
} from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { Heading, Label } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import NotFotfund from "../404";
import cl from "classnames";

type ArtiklerT = Partial<
  AkselArtikkel & {
    slug: string;
    tema: string[];
    contributors?: { title?: string }[];
  }
>;

export interface AkselTemaPage
  extends Omit<SanityT.Schema.aksel_tema, "ansvarlig"> {
  artikler: ArtiklerT[];
  ansvarlig?: { title?: string; roller: string[] };
}

interface PageProps {
  page: AkselTemaPage[];
  slug: string;
  preview: boolean;
}

const Page = (props: PageProps): JSX.Element => {
  const { data } = usePreviewSubscription(akselTemaDocs, {
    initialData: props.page,
    enabled: props?.preview,
  });

  const page = data.find((tema) => getTemaSlug(tema?.title) === props.slug);

  if (!page) {
    return <NotFotfund />;
  }

  const hasAnsvarlig = !!page?.ansvarlig?.title;

  return (
    <>
      <Head>
        <title>{`${page.title} - Aksel`}</title>
        <meta property="og:title" content={`${page.title} - Aksel`} />
      </Head>
      <div className="bg-gray-100">
        <AkselHeader variant="tema" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] bg-gray-100 focus:outline-none"
        >
          <div className="relative bg-white pt-12">
            <div className="dynamic-wrapper px-4 pb-6">
              <BreadCrumbs href="/tema" text="Temaer" />
              <Heading
                level="1"
                size="xlarge"
                className="algolia-index-lvl1 hidden text-5xl text-deepblue-700 md:block"
              >
                {page.title}
              </Heading>
              <Heading
                level="1"
                size="large"
                className="algolia-index-lvl1 block text-deepblue-700 md:hidden"
              >
                {page.title}
              </Heading>

              <div className="mt-4 flex flex-col justify-between gap-4 xl:flex-row">
                <SanityBlockContent
                  blocks={page.beskrivelse}
                  noLastMargin
                  className="override-text-700 max-w-prose xl:mb-8"
                  isIngress
                />
                <div
                  className={cl(
                    "max-w relative z-10 h-fit rounded-lg bg-deepblue-700 xs:w-96 lg:mt-[10px]",
                    { invisible: !hasAnsvarlig }
                  )}
                  aria-hidden={!hasAnsvarlig}
                >
                  <div className="absolute top-12 -z-10 -ml-4 block h-28 w-screen bg-gray-100 xs:hidden" />
                  <Label
                    as="div"
                    size="small"
                    className="flex rounded-t-lg bg-deepblue-700 px-4 pt-4 pb-3 uppercase text-text-inverted md:px-6 md:pt-6 md:pb-4"
                  >
                    Ansvarlig for tema
                  </Label>
                  <div className="grid gap-2 rounded-b-lg bg-deepblue-100 px-4 py-3 md:px-6 md:py-4">
                    <div>
                      <Label as="div">
                        {page?.ansvarlig?.title
                          ? abbrName(page?.ansvarlig?.title)
                          : "placeholder"}
                      </Label>
                      {page?.ansvarlig?.roller?.length > 0 ? (
                        <div className="mt-[2px]">
                          {page?.ansvarlig?.roller.join(", ")}
                        </div>
                      ) : (
                        "placeholder"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <svg
              className="-mt-48 hidden h-44 w-full rotate-180 bg-transparent xs:block lg:h-auto xl:-mt-36"
              viewBox="0 0 100 16"
              focusable="false"
              aria-hidden="true"
            >
              <polygon
                points="0,0 100,0 0,16"
                className="fill-gray-100 "
              ></polygon>
              <polygon
                points="-14,-16 1000,1 0,0"
                className="fill-gray-100"
              ></polygon>
            </svg>
          </div>

          {/* <div className="relative bg-white pt-8 xl:pt-0">
            <div className="triangle relative bg-gray-50 px-4 pt-16 pb-8" />
          </div> */}

          {/* <div className="relative mx-auto max-w-aksel px-4 xs:w-[90%]">
            <div className="max-w z-10 mr-auto  -mt-16 rounded-lg bg-deepblue-700  xs:w-96 xl:mr-0 xl:ml-auto">
              <Label
                as="div"
                size="small"
                className="flex rounded-t-lg bg-deepblue-700 px-4 pt-4 pb-3 uppercase text-text-inverted md:px-6 md:pt-6 md:pb-4"
              >
                Ansvarlig for tema
              </Label>
              <div className="grid gap-2 rounded-b-lg bg-deepblue-100 px-4 py-3 md:px-6 md:py-4">
                <div>
                  <Label as="div">Placeholder</Label>
                  <div className="mt-[2px]">Placeholder</div>
                </div>
              </div>
            </div>
          </div> */}
          {/* Ansvarlig-card */}

          {!page?.bruk_seksjoner || page?.seksjoner?.length === 0 ? (
            <div className="relative bg-gray-100 px-4 pt-8 pb-24 md:pt-16 xl:pt-8 ">
              <div className="dynamic-wrapper">
                <div className="grid gap-3 sm:grid-cols-2 md:gap-6">
                  {page.artikler.map((x) => (
                    <ArtikkelCard {...x} source={page.title} key={x._id} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="relative bg-gray-100 px-4 pt-8 pb-24 md:pt-16 xl:pt-8 ">
                <div className="dynamic-wrapper grid gap-16">
                  {page.seksjoner.map((seksjon) => (
                    <div key={seksjon._key}>
                      <Heading
                        level="2"
                        size="large"
                        spacing
                        className="hidden md:block"
                      >
                        {seksjon.title}
                      </Heading>
                      <Heading
                        level="2"
                        size="medium"
                        spacing
                        className="block md:hidden"
                      >
                        {seksjon.title}
                      </Heading>
                      {seksjon.beskrivelse && (
                        <div className="mt-2 mb-5 max-w-prose">
                          <SanityBlockContent
                            blocks={seksjon.beskrivelse}
                            noLastMargin
                          />
                        </div>
                      )}
                      <div className="grid gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                        {(seksjon.sider as unknown as ArtiklerT[]).map(
                          (x: ArtiklerT) => (
                            <ArtikkelCard
                              {...x}
                              source={page.title}
                              key={x._id}
                            />
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
        <Footer variant="aksel" />
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: await getAkselTema().then((paths) =>
      paths.map((slug) => ({
        params: {
          slug,
        },
      }))
    ),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string };
  preview?: boolean;
}) => {
  const temas = await getClient().fetch(akselTemaDocs);
  const filtered = temas.filter(
    (x) => x.artikler.length !== 0 || x.seksjoner.length !== 0
  );
  const doc = filtered.find((tema) => getTemaSlug(tema?.title) === slug);

  return {
    props: {
      page: filtered,
      slug,
      preview,
      id: doc?._id ?? null,
    },
    notFound: !doc && !preview,
    revalidate: 60,
  };
};

export default Page;
