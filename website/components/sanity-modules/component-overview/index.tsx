import { Error, Success } from "@navikt/ds-icons";
import { BodyShort, Label, Link, Table, Tag, useId } from "@navikt/ds-react";
import React from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { FigmaIcon, FigmaIconNoSync, OverflowDetector } from "../..";
import { DsComponentOverview } from "../../../lib";

const ScComponentOverview = styled.div``;
const ScHeaderCell = styled(BodyShort)`
  color: var(--navds-semantic-color-text-muted);
`;

const ScBodyShortMuted = styled(BodyShort)`
  color: var(--navds-semantic-color-text-muted);
  ::first-letter {
    text-transform: capitalize;
  }
`;

const ScSuccess = styled.span`
  align-items: center;
  display: flex;
  > * {
    font-size: 1.5rem;
    color: var(--navds-semantic-color-feedback-success-icon);
  }
`;

const ScError = styled.span`
  align-items: center;
  display: flex;
  > * {
    font-size: 1.5rem;
    color: var(--navds-semantic-color-feedback-danger-icon);
  }
`;

const ScPurpleTag = styled(Tag)`
  background-color: var(--navds-global-color-purple-400);
  color: var(--navds-semantic-color-text-inverted);
  border: none;
`;

const ScDataCellInner = styled.span`
  display: flex;
  align-items: center;
  gap: var(--navds-spacing-2);
`;

const ScFocusSpan = styled.span`
  :focus {
    outline: 2px solid var(--navds-semantic-color-focus);
  }
`;

const ScCenterBodyShort = styled(BodyShort)`
  display: flex;
  align-items: center;

  :focus {
    outline: 2px solid var(--navds-semantic-color-focus);
  }
`;

const ScUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: var(--navds-spacing-8);

  > li {
    list-style: none;
    margin: 0;
    align-items: center;
    display: flex;
    padding: 0.5rem 0;
    gap: 0.5rem;
  }
`;

const SuccessIcon = () => (
  <ScSuccess>
    <Success aria-label="lansert" />
  </ScSuccess>
);

const ErrorIcon = () => (
  <ScError>
    <Error aria-label="ikke laget enda" />
  </ScError>
);

const BetaTag = () => (
  <ScPurpleTag size="small" variant="info">
    Beta
  </ScPurpleTag>
);

const DesignCell = ({ comp }: { comp: any }) => {
  if (comp.figma_version === "beta") {
    return <BetaTag />;
  }
  return (
    <>
      <SuccessIcon />
      <ScCenterBodyShort size="small">
        <FigmaIcon />
        {comp.figma_version === "new" ? "v3.0" : "v2.5"}
      </ScCenterBodyShort>
    </>
  );
};

// TODO: Replace react-tooltip with ds-react tooltip when possible
const CodeCell = ({ comp }: { comp: any }) => {
  const id = useId();
  return (
    <>
      <SuccessIcon />
      {!comp.figma_sync && (
        <>
          <ScCenterBodyShort
            tabIndex={0}
            data-tip=""
            data-for={`tooltip-sync-${id}`}
            size="small"
            aria-label="Kodet komponent er ikke i synk med design i Figma"
          >
            <FigmaIconNoSync />
          </ScCenterBodyShort>
          <ReactTooltip
            id={`tooltip-sync-${id}`}
            place="top"
            type="dark"
            effect="solid"
          >
            Kodet komponent er ikke i synk med design i Figma
          </ReactTooltip>
        </>
      )}
    </>
  );
};

const ComponentOverview = ({
  node,
}: {
  node: DsComponentOverview;
}): JSX.Element => {
  if (!node || !node.components) {
    return null;
  }

  const TableRow = ({ comp }: { comp: any }) => {
    const id = useId();
    return (
      <Table.Row>
        <Table.HeaderCell>
          {comp.doc_link ? (
            <Link href={`/${comp.doc_link}`}>{comp.title}</Link>
          ) : (
            <BodyShort>{comp.title}</BodyShort>
          )}

          {comp.linked_package?.scope && (
            <>
              <ScBodyShortMuted size="small">
                <ScFocusSpan
                  tabIndex={0}
                  data-tip=""
                  data-for={`${comp.linked_package?.title}-${id}`}
                >
                  {comp.linked_package?.scope}
                  <span className="navds-sr-only">
                    Pakkenavn: {comp.linked_package?.title}
                  </span>
                </ScFocusSpan>
              </ScBodyShortMuted>
              <ReactTooltip
                id={`${comp.linked_package?.title}-${id}`}
                place="top"
                type="dark"
                effect="solid"
              >
                {comp.linked_package?.title}
              </ReactTooltip>
            </>
          )}
        </Table.HeaderCell>
        <Table.DataCell>
          <ScDataCellInner>
            {comp.in_design ? <DesignCell comp={comp} /> : <ErrorIcon />}
          </ScDataCellInner>
        </Table.DataCell>
        <Table.DataCell>
          <ScDataCellInner>
            {comp.in_code ? <CodeCell comp={comp} /> : <ErrorIcon />}
          </ScDataCellInner>
        </Table.DataCell>
        <Table.DataCell>
          <ScDataCellInner>
            {comp.in_doc ? <SuccessIcon /> : <ErrorIcon />}
          </ScDataCellInner>
        </Table.DataCell>
      </Table.Row>
    );
  };

  return (
    <ScComponentOverview>
      <Label spacing>Tegnforklaring</Label>
      <ScUl>
        <li>
          <FigmaIcon /> v#.# ⏤ Figma-versjon av designsystemet
        </li>
        <li>
          <FigmaIconNoSync /> ⏤ Kode ikke i synk med Figma
        </li>
        <li>
          <BetaTag /> ⏤ Finnes som testversjon i Figma v3.0
        </li>
        <li>
          <ErrorIcon /> ⏤ Ikke tilgjengelig
        </li>
        <li>
          <SuccessIcon /> ⏤ Lansert 🎉
        </li>
      </ScUl>
      <OverflowDetector>
        <Table>
          <Table.Header>
            <Table.Row>
              <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
                Komponent
              </ScHeaderCell>
              <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
                Design
              </ScHeaderCell>
              <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
                Kode
              </ScHeaderCell>
              <ScHeaderCell size="small" forwardedAs={Table.HeaderCell}>
                Dok
              </ScHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {node.components
              .sort((x, y) => x.title.localeCompare(y.title))
              .map((c, i) => (
                <TableRow key={c.title + i} comp={c} />
              ))}
          </Table.Body>
        </Table>
      </OverflowDetector>
    </ScComponentOverview>
  );
};

export default ComponentOverview;
