import React from "react";
import "@navikt/ds-css?raw";
import styled from "styled-components";
import { Detail, Heading, BodyLong } from "@navikt/ds-react/cjs";
import {
  Warning,
  SuccessStroke,
  Laptop,
  List,
  ExternalLink,
  Link,
  Folder,
  Notes,
  Information,
} from "@navikt/ds-icons";
import { KBD } from "@sanity/ui";
import { allDocumentTypes } from "../config";
import iconDecorator from "./objects/icon-decorator";

export const TitleRenderer = (props, size, level) => (
  <Heading size={size} level={level}>
    {props.children}
  </Heading>
);

const ScCode = styled.code`
  color: var(--navds-global-color-deepblue-500);
  background-color: var(--navds-global-color-deepblue-50);
  border-radius: 6px;
  font-size: 1rem;
  padding: 0.25rem;
`;

export const ScDraft = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.25rem;
  padding-bottom: 1rem;
  position: relative;

  ::before {
    content: "utkast";
    font-size: 1rem;
    font-weight: 400;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 0.25rem;
    border-top-left-radius: 4px;
    background-color: var(--navds-global-color-orange-200);
  }
`;

export const styles = [
  {
    title: "Normal (18px)",
    value: "normal",
    blockEditor: {
      render: (props) => <BodyLong>{props.children}</BodyLong>,
    },
  },
  {
    title: "Detail (14px)",
    value: "detail",
    blockEditor: {
      render: (props) => <Detail size="small">{props.children}</Detail>,
    },
  },
  /* Vil være det samme som semibold mark */
  /* {
    title: "Label",
    value: "label",
    blockEditor: {
      render: (props) => <Label spacing>{props.children}</Label>,
    },
  }, */
];

export const block = {
  title: "Block",
  type: "block",
  styles: [...styles],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  // Marks let you mark up inline text in the block editor.
  marks: {
    // Decorators usually describe a single property – e.g. a typographic
    // preference or highlighting by editors.
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Emphasis", value: "em" },
      {
        title: "Code",
        value: "code",
        blockEditor: {
          render: (props) => <ScCode>{props.children}</ScCode>,
        },
      },
      {
        title: "Keyboard",
        value: "kbd",
        blockEditor: {
          icon: () => <KBD style={{ verticalAlign: "top" }}>Ctrl</KBD>,
          render: (props) => (
            <KBD
              padding={[1, 1, 2]}
              size={[1, 1, 2]}
              style={{ verticalAlign: "top" }}
            >
              {props.children}
            </KBD>
          ),
        },
      },
      {
        title: "Utkast",
        value: "draft_only",
        blockEditor: {
          icon: () => <Notes />,
          render: (props) => <ScDraft>{props.children}</ScDraft>,
        },
      },
    ],
    // Annotations can be any object structure – e.g. a link or a footnote.
    annotations: [
      {
        title: "Link til side i sanity",
        name: "internalLink",
        type: "object",
        blockEditor: {
          icon: () => <Link />,
        },
        fields: [
          {
            title: "Reference",
            name: "reference",
            type: "reference",
            to: [
              ...allDocumentTypes.map((doc) => ({
                type: doc,
              })),
            ],
          },
        ],
      },
      {
        title: "External link",
        name: "link",
        type: "object",
        blockEditor: {
          icon: () => <ExternalLink />,
        },
        fields: [
          {
            title: "URL",
            name: "href",
            type: "url",
          },
          {
            title: "Open in new tab",
            name: "blank",
            type: "boolean",
            initialValue: true,
          },
        ],
      },
      iconDecorator,
    ],
  },
};

export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      ...block,
      styles: [
        ...block.styles,
        {
          title: "Tittel <h2/>",
          value: "h2",
          blockEditor: {
            render: (props) => TitleRenderer(props, "medium", "2"),
          },
        },
        {
          title: "Tittel <h3/>",
          value: "h3",
          blockEditor: {
            render: (props) => TitleRenderer(props, "small", "3"),
          },
        },
        {
          title: "Tittel <h4/>",
          value: "heading4",
          blockEditor: {
            render: (props) => TitleRenderer(props, "xsmall", "4"),
          },
        },
      ],
    },
    // Custom types (add components here)
    {
      type: "spacing",
    },
    {
      type: "picture",
    },
    {
      type: "picture_text",
    },
    {
      type: "tips",
      icon: () => <Information />,
    },
    {
      type: "alert",
      icon: () => <Warning />,
    },
    {
      type: "related_pages",
      icon: () => <ExternalLink />,
    },
    {
      type: "link_panel",
      icon: () => <ExternalLink />,
    },
    { type: "code_snippet", icon: () => <span>{`< />`}</span> },
    {
      type: "do_dont",
      icon: () => <SuccessStroke />,
    },
    {
      type: "table",
    },
    { type: "code_example_ref", icon: () => <Laptop /> },
    { type: "color_category_ref", icon: () => <Folder /> },
    /* { type: "uu_interaction", icon: () => <Braille /> }, */
    { type: "prop_table", icon: () => <List /> },
    { type: "icon_search" },
    { type: "component_overview" },
  ],
};
