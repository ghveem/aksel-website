import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import { LayoutContextProps, LayoutContext } from "../Layout";
import { NavLogoWhite } from "../..";
import {
  BodyLong,
  BodyShort,
  Button,
  Fieldset,
  Label,
  Link,
  Textarea,
  TextField,
} from "@navikt/ds-react";
import NextLink from "next/link";

const ScFooter = styled.footer<{ context: LayoutContextProps }>`
  width: 100%;
  background-color: var(--navds-color-gray-90);
  padding: ${(props) => (props.context.isTablet ? "1.5rem" : "3rem")};
  color: white;
`;

const ScLogoWrapper = styled.div`
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
`;

const ScInner = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;

  > * {
    flex: 1 1 350px;
  }
`;

const ScRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  form {
    max-width: 350px;
    button {
      --navds-button-color-primary-background: var(--navds-color-blue-30);
      --navds-button-color-primary-background-hover: var(--navds-color-blue-40);
      --navds-button-color-primary-background-active: var(
        --navds-color-deepblue-40
      );
      --navds-button-color-primary-text: var(--navds-color-gray-90);
      --navds-shadow-focus: 0 0 0 2px var(--navds-color-blue-10);
      --navds-button-color-primary-border-focus: var(--navds-color-blue-10);
    }
  }

  a {
    color: white;

    :focus {
      background-color: var(--navds-color-blue-10);
      color: var(--navds-color-gray-90);
    }
  }
`;

const ScFieldset = styled(Fieldset)`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScStateCss = css`
  :hover {
    border-color: var(--navds-color-blue-10);
  }

  :focus {
    box-shadow: 0 0 0 3px var(--navds-color-blue-10);
  }
`;

const ScTextarea = styled(Textarea)`
  --navds-textarea-color-shadow-error: var(--navds-color-red-40);
  --navds-textarea-color-border-error: var(--navds-color-red-40);
  --navds-error-message-color-text: var(--navds-color-red-40);

  > * textarea {
    background-color: transparent;
    color: white;

    ${ScStateCss}
  }
`;

const ScTextField = styled(TextField)`
  > input {
    background-color: transparent;
    color: white;
    ${ScStateCss}
  }
`;

const DesignsystemFooter = () => {
  const context = useContext(LayoutContext);

  const [contactForm, setContactForm] = useState({ content: "", mail: "" });

  const [contentError, setContentError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactForm.content === "") {
      setContentError("Du må skrive en melding før du kan sende den.");
      return;
    }
    setContentError("");

    fetch("/api/dsContact", {
      method: "POST",
      body: JSON.stringify({
        comment: contactForm.content,
        mail: contactForm.mail,
      }),
    });

    setContactForm({ content: "", mail: "" });
    setSent(true);
  };

  return (
    <ScFooter context={context}>
      <ScInner>
        <div>
          <ScLogoWrapper>
            <NavLogoWhite aria-hidden />
          </ScLogoWrapper>
          <BodyLong spacing>
            Designsystemet holdes ved like med bidrag fra produkt-team. Derfor
            er “døra” åpen hele tia. Huk tak i oss på kontoret, på video eller
            send oss en melding.
          </BodyLong>
          <BodyLong>Tusen takk for alle som bidrar!</BodyLong>
        </div>
        <ScRightColumn>
          <div>
            <Label spacing>Hvordan komme i kontakt?</Label>
            <BodyShort as="ul">
              <li>5. etg. bygg A</li>
              <li>
                <NextLink
                  href="https://nav-it.slack.com/archives/C7NE7A8UF"
                  passHref
                >
                  <Link>Designsystemet på Slack</Link>
                </NextLink>
              </li>
            </BodyShort>
          </div>
          {sent ? (
            <div>
              <Label spacing>Melding er sendt til designsystemet</Label>
              <BodyLong>
                Takk skal du ha! Vi svarer deg så fort som mulig.
              </BodyLong>
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e)}>
              <ScFieldset
                legend="Send en melding til designsystemet."
                hideLegend
              >
                <ScTextarea
                  error={contentError}
                  label="Skriv til oss"
                  value={contactForm.content}
                  onChange={(e) => {
                    setContactForm({ ...contactForm, content: e.target.value });
                    e.target.value && setContentError("");
                  }}
                  maxLength={500}
                />
                <ScTextField
                  label="Vi svarer til e-post (ikke påkrevd)"
                  value={contactForm.mail}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, mail: e.target.value })
                  }
                />
              </ScFieldset>
              <Button>Send melding</Button>
            </form>
          )}
        </ScRightColumn>
      </ScInner>
    </ScFooter>
  );
};

export default DesignsystemFooter;
