import { Expand, Left } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import { Header as DsHeader } from "@navikt/ds-react-internal";
import NextLink from "next/link";
import * as React from "react";
import { NavLogoWhite } from "../../..";
import * as S from "./header.styles";

const HeadingDropDown = ({ title }: { title: string }): JSX.Element => {
  return (
    <>
      <DsHeader.Dropdown>
        <DsHeader.Dropdown.Button>
          <NavLogoWhite focusable={false} aria-label="NAV logo" />
          {title}
          <Expand focusable={false} role="presentation" />
        </DsHeader.Dropdown.Button>
        <S.Menu>
          <DsHeader.Dropdown.Menu.List>
            <NextLink href="/" passHref>
              <S.DropDownIconLink role="menuitem">
                <Left />
                <BodyShort>Tilbake til Verktøykassa</BodyShort>
              </S.DropDownIconLink>
            </NextLink>
            <NextLink href="/designsystem" passHref>
              <S.DropDownLink role="menuitem">
                <BodyShort>Designsystemet</BodyShort>
                <BodyShort spacing size="small">
                  Informasjon omhandlende designsystemet
                </BodyShort>
              </S.DropDownLink>
            </NextLink>
            <NextLink href="/god-praksis" passHref>
              <S.DropDownLink href="/god-praksis" role="menuitem">
                <BodyShort>God Praksis</BodyShort>
                <BodyShort spacing size="small">
                  Informasjon omhandlende God Praksis
                </BodyShort>
              </S.DropDownLink>
            </NextLink>
            {/* <NextLink href="#" passHref>
              <S.DropDownLink role="menuitem">
                <BodyShort>Brand Guide</BodyShort>
                <BodyShort spacing size="small">
                  Informasjon omhandlende Brand Guide
                </BodyShort>
              </S.DropDownLink>
            </NextLink> */}
          </DsHeader.Dropdown.Menu.List>
        </S.Menu>
      </DsHeader.Dropdown>
    </>
  );
};
export default HeadingDropDown;
