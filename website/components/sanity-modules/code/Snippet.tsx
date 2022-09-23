import { withErrorBoundary } from "@/error-boundary";
import { CodeSnippet as CodeSnippetT, Kode } from "@/lib";
import cl from "classnames";
import Highlight, { defaultProps } from "prism-react-renderer";
import React from "react";
import CopyButton from "./CopyButton";

const CodeSnippet = ({
  node: { code },
  className,
  ...props
}: {
  node: CodeSnippetT | Kode;
  className?: string;
  style?: any;
}): JSX.Element => {
  if (!code || !code.code) {
    return null;
  }

  let language = code.language ?? "javascript";
  language =
    language === "terminal" || language === "default" ? "bash" : language;

  return (
    <>
      <div
        className={cl(
          className,
          "relative mb-8 block overflow-x-auto rounded bg-gray-900"
        )}
        {...props}
      >
        <CopyButton content={code.code} />
        <Highlight
          code={code.code}
          language={language}
          {...defaultProps}
          theme={undefined}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="relative m-0 overflow-x-auto overflow-y-auto rounded-lg bg-gray-900 p-4 pr-16 font-mono text-text-inverted">
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}
                  className="whitespace-pre-wrap break-words text-medium"
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </>
  );
};

export default withErrorBoundary(CodeSnippet, "Kode snippet");
