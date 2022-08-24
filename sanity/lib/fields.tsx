import { FileContent, LightBulb, NewTab } from "@navikt/ds-icons";
import React from "react";
import { toPlainText } from ".";

export const editorField = {
  title: "Redaktører",
  description: "Legg til alle som har bidratt med denne siden!",
  name: "contributors",
  type: "array",
  of: [{ type: "reference", to: [{ type: "editor" }] }],
  group: "settings",
  validation: (Rule) => Rule.required(),
};

export const privateField = {
  title: "Sidetilganger",
  name: "tilgang",
  type: "object",
  description: "Styrer tilgang for side-innhold",
  hidden: true,
  fields: [
    {
      title: "Privat",
      name: "privat",
      type: "boolean",
    },
  ],
  initialValue: {
    privat: true,
  },
};

export const publishedAtField = {
  title: "Publiseringsdato",
  name: "publishedAt",
  type: "datetime",
  group: "settings",
  description: "Synlig bare for admins. Setter publiseringsdato for dokument",
  hidden: ({ currentUser }) =>
    !currentUser.roles.find((x) => x.name === "administrator"),
};

export const migratedField = {
  title: "Migrert riktekst",
  name: "isMigrated",
  type: "boolean",
  hidden: false,
  initialValue: true,
};

export const titleField = {
  title: "Sidetittel",
  name: "heading",
  type: "string",
  group: "innhold",
  description:
    "Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.",
  validation: (Rule) =>
    Rule.required()
      .max(60)
      .error("Siden bør ha en kort og konsis heading (<h1>)"),
};

export const UnderArbeidField = {
  title: "Under arbeid",
  name: "under_arbeid",
  description:
    "Hvis checked og publisert vil siden vises som under arbeid uten at lenker treffer 404",
  type: "object",
  group: "settings",
  fields: [
    {
      title: "Er under arbeid?",
      name: "status",
      type: "boolean",
      initialValue: false,
    },
    {
      title: "Forklaring",
      description: "Default: Siden blir for tiden oppdatert!",
      name: "forklaring",
      type: "text",
      rows: 2,
      hidden: ({ parent }) => !parent || !parent.status,
    },
    {
      title: "Vis fortsatt innhold?",
      description: "Vil vise under-arbeid status med innhold under",
      name: "vis_innhold",
      type: "boolean",
      initialValue: false,
    },
  ],
};

export const ingressField = {
  title: "Ingress",
  name: "ingress",
  description: "Side, innganger og seo description-tag",
  type: "text",
  group: "innhold",
  rows: 3,
  validation: (Rule) =>
    Rule.required().max(155).error("Ingress kan ikke være på over 155 tegn"),
};

export const innholdFieldNew = {
  title: "Innhold",
  name: "content",
  type: "riktekst_aksel",
  group: "innhold",
};

export const innholdFieldNewNested = (name?: string, type?: string) => {
  const fields = {
    ...innholdFieldNew,
    type: type ?? "riktekst_ds_artikkel",
    name: name ?? "content",
  };
  delete fields.group;
  return fields;
};

export const hidePageFeedback = {
  title: "Tilbakemeldinger",
  name: "metadata_feedback",
  type: "object",
  group: "settings",
  fields: [
    {
      title: "Skjul artikkel feedback modul",
      description: "Gjemmer <<Var denne artikkelen til hjelp?>> modulen.",
      name: "hide_feedback",
      type: "boolean",
      initialValue: false,
    },
  ],
};
