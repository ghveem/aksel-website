import { Caseworker, Sandglass, Upload, Wrench } from "@navikt/ds-icons";
import {
  BodyShort,
  Detail,
  Heading,
  HelpText,
  Label,
  Link,
} from "@navikt/ds-react";
import { SanityDocument } from "@sanity/client";
import { Stack } from "@sanity/ui";
import userStore from "part:@sanity/base/user";
import { WithReferringDocuments } from "part:@sanity/base/with-referring-documents";
import Spinner from "part:@sanity/components/loading/spinner";
import { withDocument } from "part:@sanity/form-builder";
import React, { useEffect, useState } from "react";
import ReferringDocumentsList from "./document-list";
import styles from "../styles.css";
import { getDrafts, getPublished, getUnpublished } from "./filter-docs";

type Props = {
  referringDocuments: Record<string, any>[];
  isLoading: boolean;
  published?: SanityDocument | null;
  type: any;
  document: any;
};

const IntroPage = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { document, type } = props;
  const [userDocuments, setUserDocuments] = useState([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    userStore.getCurrentUser().then((user) => setUser(user));
  }, []);

  const EmptyState = () => (
    <Detail className={styles.detailsContent} size="small">
      Ingen sider her...
    </Detail>
  );

  return (
    <Stack ref={ref} space={[3, 1, 2, 4]}>
      <Heading level="2" size="medium" spacing style={{ display: "flex" }}>
        Profil <Caseworker style={{ marginLeft: "0.5rem", fontSize: "2rem" }} />
      </Heading>
      {user?.roles && (
        <div>
          <Heading level="3" size="small" spacing>
            Roller/tilganger:
          </Heading>
          {user?.roles.map((x, i) => (
            <div key={i}>
              <Label size="small" spacing>
                {x?.title}
              </Label>
              <BodyShort size="small">{x?.description}</BodyShort>
            </div>
          ))}
        </div>
      )}
      <BodyShort
        size="small"
        spacing
        as="span"
        style={{ display: "flex", gap: "0.5rem" }}
      >
        Har du ikke de rollene du trenger?
        <HelpText>
          Hør med{" "}
          <Link href="https://nav-it.slack.com/archives/D010WEMSKMF">Ken</Link>{" "}
          på slack, eller bare send en melding til oss på{" "}
          <Link href="https://nav-it.slack.com/archives/C7NE7A8UF">
            #designsystem
          </Link>{" "}
          slack så fikser vi det.
        </HelpText>
      </BodyShort>
      <div style={{ borderTop: "1px solid #bbb" }} />

      <WithReferringDocuments id={document._id}>
        {({ referringDocuments, isLoading, ...rest }) => {
          if (isLoading) {
            return <Spinner message="Looking for referring documents…" />;
          }
          if (!referringDocuments.length) return null;

          const drafts = getDrafts(referringDocuments);
          const published = getPublished(referringDocuments);
          const unpublished = getUnpublished(referringDocuments);

          return (
            <Stack space={2} className={styles.profileDetails}>
              <Heading level="3" size="xsmall" style={{ display: "flex" }}>
                <Upload />
                Publiserte sider
              </Heading>
              <details>
                <Label size="small" as="summary">
                  <BodyShort size="small">
                    Oppdaterte: {published.length}
                  </BodyShort>
                </Label>
                {published ? (
                  <ReferringDocumentsList documents={published} />
                ) : (
                  <EmptyState />
                )}
              </details>
              <details>
                <Label size="small" as="summary">
                  <BodyShort size="small">
                    Med upubliserte endringer: {drafts.length}
                  </BodyShort>
                </Label>
                {drafts ? (
                  <ReferringDocumentsList documents={drafts} />
                ) : (
                  <EmptyState />
                )}
              </details>
              <Heading level="3" size="xsmall" className={styles.headings}>
                <Wrench />
                Under arbeid
              </Heading>
              <details>
                <Label size="small" as="summary">
                  <BodyShort size="small">
                    Sider: {unpublished.length}
                  </BodyShort>
                </Label>
                {unpublished ? (
                  <ReferringDocumentsList documents={unpublished} />
                ) : (
                  <EmptyState />
                )}
              </details>
              <Heading level="3" size="xsmall" className={styles.headings}>
                <Sandglass />
                Utdaterte sider
              </Heading>
              <details>
                <Label size="small" as="summary">
                  <BodyShort size="small">
                    Ikke oppdatert på over 90 dager: 0
                  </BodyShort>
                </Label>
                <EmptyState />
              </details>
              <details>
                <Label size="small" as="summary">
                  <BodyShort size="small">
                    Ikke oppdatert på over 180 dager: 0
                  </BodyShort>
                </Label>
                <EmptyState />
              </details>
            </Stack>
          );
        }}
      </WithReferringDocuments>
    </Stack>
  );
});

export default withDocument(IntroPage);
