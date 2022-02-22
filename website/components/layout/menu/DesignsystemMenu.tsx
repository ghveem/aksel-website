import { BodyShort, Detail } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { AmplitudeEvents, PagePropsContext, useAmplitude } from "../..";
import { DsNavigationHeadingMenuT, DsNavigationHeadingT } from "../../../lib";

const Menu = ({
  heading,
  onClick,
  inCategory,
  mobileNavigation,
  className,
}: {
  heading?: DsNavigationHeadingT;
  onClick?: () => void;
  inCategory?: boolean;
  mobileNavigation?: boolean;
  className?: string;
}): JSX.Element => {
  const { pageProps } = useContext<any>(PagePropsContext);
  const { logAmplitudeEvent } = useAmplitude();

  const { asPath } = useRouter();
  const [sidebarMenu, setSidebarMenu] = useState<DsNavigationHeadingMenuT[]>(
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (!heading || !heading?.menu) return;
    setSidebarMenu([...heading.menu]);
  }, [heading]);

  const logNavigation = (e) => {
    logAmplitudeEvent(AmplitudeEvents.navigasjon, {
      kilde: "meny",
      fra: asPath,
      til: e.currentTarget.getAttribute("href"),
      mobilnavigasjon: mobileNavigation,
    });
  };

  return (
    <nav
      aria-label={heading.title}
      className={cl(className, "overflow-x-auto")}
    >
      <BodyShort as="ul">
        {sidebarMenu.map((item, x) => {
          if (item._type === "subheading") {
            return (
              <Detail
                as="li"
                size="small"
                key={item.title + x}
                className="relative mt-6 pt-7 pr-4 pb-[14px] pl-8 uppercase text-text before:absolute before:top-0 before:left-auto before:right-auto before:h-[1px] before:w-9/12 before:bg-divider first:mt-0 first:pt-[14px] first:before:bg-transparent"
              >
                {item.title}
              </Detail>
            );
          }
          return (
            <li
              key={item.title + x}
              className={cl(
                "focus-within:shadow-focus-inset hover:bg-canvas-background",
                {
                  "rounded-b": inCategory,
                  "bg-canvas-background":
                    pageProps?.page?.slug === item?.link?.slug?.current,
                }
              )}
            >
              <NextLink href={`/${item.link.slug.current}`} passHref>
                <a
                  onClick={(e) => {
                    onClick && onClick();
                    logNavigation(e);
                  }}
                  className={cl(
                    "flex py-3 pr-4 no-underline hover:text-text focus:outline-none",
                    {
                      "border-l-[6px] border-l-gray-900 pl-[26px] font-semibold text-text":
                        pageProps?.page?.slug === item?.link?.slug?.current,
                      "pl-8 text-text-muted": !(
                        pageProps?.page?.slug === item?.link?.slug?.current
                      ),
                    }
                  )}
                >
                  {item.title}
                </a>
              </NextLink>
            </li>
          );
        })}
      </BodyShort>
    </nav>
  );
};

export default Menu;
