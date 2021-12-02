import userRelatedArticles from "../../components/user-related-articles";

export default {
  title: "Redaktører",
  name: "editor",
  type: "document",
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
      name: "user_related_articles",
      type: "string",
      title: "Relaterte artikler",
      inputComponent: userRelatedArticles,
    },
  ],
};
