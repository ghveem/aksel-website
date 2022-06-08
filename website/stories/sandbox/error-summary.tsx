import { ErrorSummary } from "@navikt/ds-react";
import { SandboxComponentT } from "./types";

ErrorSummary.displayName = "ErrorSummary";
(ErrorSummary.Item as any).displayName = "ErrorSummary.Item";
const ErrorSummarySandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.headingTag ? { headingTag: props.headingTag } : {}),
  };
  return (
    <ErrorSummary
      size={props?.size ?? "medium"}
      heading="Du må fikse disse feilene før du kan sende inn søknad."
      {...newProps}
    >
      <ErrorSummary.Item href="#1">
        Felt må fylles ut med alder
      </ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummary.Item>
    </ErrorSummary>
  );
};

ErrorSummarySandbox.args = {
  props: {
    size: ["medium", "small"],
    headingTag: "",
  },
};

export default ErrorSummarySandbox;
