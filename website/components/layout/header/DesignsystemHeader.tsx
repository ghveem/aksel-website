import { useRouter } from "next/router";
import NextLink from "next/link";
import * as React from "react";
import { useContext } from "react";
import { useMedia } from "react-use";
import {
  AmplitudeEvents,
  LayoutContext,
  PagePropsContext,
  Search,
  useAmplitude,
} from "../..";
import { DsNavigationHeadingT } from "../../../lib";
import MobileNavigation from "./menu/MobileNav";
import PortalNavigation from "./menu/PortalNav";
import cl from "classnames";
import { Header } from "@navikt/ds-react-internal";

const DesignsystemHeader = (): JSX.Element => {
  const { pageProps } = useContext(PagePropsContext);
  const context = useContext(LayoutContext);
  const useMobileHeader = useMedia("(max-width: 1023px)", false);
  const { logAmplitudeEvent } = useAmplitude();
  const { asPath } = useRouter();

  const logNavigation = (e) => {
    logAmplitudeEvent(AmplitudeEvents.navigasjon, {
      kilde: "header",
      fra: asPath,
      til: e.currentTarget.getAttribute("href"),
    });
  };

  const nonMobile = (
    <>
      <PortalNavigation title={"Designsystemet"} />
      <div className="z-[1050] mr-auto flex">
        {pageProps?.navigation?.headings.map(
          (heading: DsNavigationHeadingT) => (
            <NextLink
              href={`/${
                (heading.link_ref as { slug?: { current: string } })?.slug
                  ?.current
              }`}
              passHref
              key={heading.title + heading.link_ref}
            >
              <a
                onClick={(e) => logNavigation(e)}
                className={cl(
                  "index-heading flex min-w-[var(--header-height)] cursor-pointer items-center justify-center whitespace-nowrap py-0 px-2 pt-1 focus:outline-none 2xl:px-4",
                  {
                    "text-text-inverted focus:shadow-[inset_0_0_0_1px_var(--navds-global-color-gray-900),inset_0_0_0_3px_var(--navds-global-color-blue-200)]":
                      !(context?.activeHeading?.title === heading.title),
                    "index-heading--active bg-white text-text shadow-[inset_0_0_0_1px_var(--navds-global-color-gray-900)] hover:bg-canvas-background-light focus:shadow-[inset_0_0_0_1px_var(--navds-global-color-gray-900),inset_0_0_0_2px_var(--navds-global-color-white)_,inset_0_0_0_4px_var(--navds-global-color-gray-900)]":
                      context?.activeHeading?.title === heading.title,
                  }
                )}
              >
                {heading.title}
              </a>
            </NextLink>
          )
        )}
      </div>
      <Search />
    </>
  );

  const mobile = (
    <>
      <PortalNavigation title={"Designsystemet"} />
      <Search />
      <MobileNavigation />
    </>
  );

  return (
    <Header className="z-[1050] h-[var(--header-height)]">
      {useMobileHeader || context.isTablet ? mobile : nonMobile}
    </Header>
  );
};
export default DesignsystemHeader;
