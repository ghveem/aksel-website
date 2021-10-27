import NextLink from "next/link";
import * as React from "react";
import { useContext, useState } from "react";
import { Search } from "../../..";
import { DsNavigationHeadingT } from "../../../../lib";
import { PagePropsContext } from "../../../../pages/_app";
import { LayoutContext, LayoutParts } from "../Layout";
import * as S from "./header.styles";
import MobileNavigation from "./MobileNavigation";
import PortalNavigation from "./PortalNavigation";
import { motion } from "framer-motion";

const DesignsystemHeader = (): JSX.Element => {
  const context = useContext(LayoutContext);

  const [pageProps] = useContext<any>(PagePropsContext);

  const [searchisOpen, setSearchisOpen] = useState(false);

  const nonMobile = (
    <>
      <PortalNavigation title={LayoutParts[context.version].title ?? ""} />

      {!searchisOpen && (
        <S.Links
          as={motion.div}
          key="Links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.2 }}
          exit={{ opacity: 0 }}
        >
          {pageProps?.navigation.headings.map(
            (heading: DsNavigationHeadingT) => (
              <NextLink
                key={heading.title + heading.link_ref}
                href={`/${
                  (heading.link_ref as { slug?: { current: string } })?.slug
                    ?.current
                }`}
                passHref
              >
                <S.Link
                  $active={context?.activeHeading?.title === heading.title}
                >
                  {heading.title}
                </S.Link>
              </NextLink>
            )
          )}
        </S.Links>
      )}
      <Search isOpen={(v: boolean) => setSearchisOpen(v)} />
      {/* <S.Link href="#">
        <Bells
          focusable={false}
          aria-label="Notifikasjons ikon"
          style={{ fontSize: "1.5rem" }}
        />
      </S.Link> */}
    </>
  );

  const mobile = (
    <>
      {context.isTablet && !searchisOpen && (
        <PortalNavigation title={LayoutParts[context.version].title ?? ""} />
      )}
      <Search isOpen={(v: boolean) => setSearchisOpen(v)} />
      <MobileNavigation />
    </>
  );

  return <S.Header>{context.isTablet ? mobile : nonMobile}</S.Header>;
};
export default DesignsystemHeader;
