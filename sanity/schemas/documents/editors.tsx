import { People } from "@navikt/ds-icons";
import React from "react";
import userRelatedArticles from "../../components/user-related-articles";
import { isEditorUnique } from "../validateSlug";
import userStore from "part:@sanity/base/user";

export default {
  title: "Redaktører",
  name: "editor",
  type: "document",
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (!fields?._id?.includes("editor."))
        return "Ugyldig. Bruker med denne id-en er allerede laget.";
      return true;
    }),
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().error("Må legge til navn"),
    },
    {
      title: "Team",
      name: "team",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Må legge til tilhørende team"),
    },
    {
      title: "Sanity bruker-id",
      name: "user_id",
      type: "slug",
      description: "Vises bare for deg og admins",
      validation: (Rule) => Rule.required().error("Må ha Id"),
      hidden: ({ currentUser, parent }) => {
        const { id, roles } = currentUser;
        return (
          !roles.find(({ name }) => name === "administrator") &&
          parent?.user_id?.current !== id
        );
      },
      options: {
        isUnique: isEditorUnique,
        source: async () => {
          const { id } = await userStore.getUser("me");
          return id;
        },
        slugify: (input) => input,
      },
    },
    {
      title: "Anonym",
      description: "Ønsker å bli vist som anonym redaktør/contributor",
      type: "boolean",
      name: "anonym",
      initialValue: true,
      options: {
        layout: "checkbox",
      },
    },
    {
      name: "user_related_articles",
      type: "string",
      title: "Relaterte artikler",
      inputComponent: userRelatedArticles,
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
        media: () => <People />,
      };
    },
  },
  readOnly: ({ currentUser, document }) => {
    const { id, roles } = currentUser;
    return (
      !roles.find(({ name }) => name === "administrator") &&
      document?.user_id !== id
    );
  },
};
