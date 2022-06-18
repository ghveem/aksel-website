import { getActiveHeading, LayoutPicker, PagePropsContext } from "@/components";
import { DsHeader, DsSidebar, Footer } from "@/layout";
import {
  DsNavigation,
  dsSlugQuery,
  getDsPaths,
  usePreviewSubscription,
  validateDsPath,
} from "@/lib";
import { getClient } from "@/sanity-client";
import NotFotfund from "../404";

const Page = (props: {
  slug?: string[];
  page: any;
  navigation: DsNavigation;
  preview: boolean;
}): JSX.Element => {
  const {
    data: { page, navigation },
  } = usePreviewSubscription(dsSlugQuery, {
    params: { slug: `designsystem/${props.slug.slice(0, 2).join("/")}` },
    initialData: props,
    enabled: props?.preview,
  });

  if (!page) {
    return <NotFotfund />;
  }

  return (
    <PagePropsContext.Provider
      value={{
        pageProps: {
          ...props,
          page: page,
          navigation,
          activeHeading: getActiveHeading(navigation, page?.slug) ?? null,
        },
      }}
    >
      <DsHeader />
      <div className="flex w-full flex-col items-center bg-canvas-background-light">
        <div className="flex w-full max-w-screen-2xl">
          <DsSidebar />
          <div className="relative w-full">
            <main
              tabIndex={-1}
              id="hovedinnhold"
              className="relative min-h-screen-header w-full focus:outline-none md:max-w-screen-sidebar"
            >
              <LayoutPicker title="Designsystemet" data={page} />
              <div className="mt-auto" aria-hidden />
            </main>
          </div>
        </div>
        <Footer variant="ds" />
      </div>
    </PagePropsContext.Provider>
  );
};

export default Page;

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string[] } }[];
}> => {
  return {
    paths: await getDsPaths().then((paths) =>
      paths.map((slug) => ({
        params: {
          slug: slug.filter((x) => x !== "designsystem"),
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
  params: { slug: string[] };
  preview?: boolean;
}) => {
  const { page, navigation } = await getClient().fetch(dsSlugQuery, {
    slug: `designsystem/${slug.slice(0, 2).join("/")}`,
  });

  return {
    props: {
      page: page,
      slug,
      navigation: navigation,
      preview,
    },
    notFound: !(page && validateDsPath(page, slug)) && !preview,
    revalidate: 60,
  };
};
