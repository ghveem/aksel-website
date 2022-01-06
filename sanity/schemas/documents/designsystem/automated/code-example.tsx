/* import { ExampleKeys } from "website/component-examples"; */

export default {
  title: "Kode med eksempel",
  name: "ds_code_example",
  type: "document",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Må legge til en enkel tittel"),
    },
    {
      title: "Lenke til eksempel",
      description: "Alle eksempler kan finnes under /examples på nettsiden",
      name: "preview",
      type: "url",
    },
    {
      title: "Hent kode automatisk fra selve eksemplet?",
      description: "Prøver å hente React og HTML kode automatisk fra storybook",
      name: "infercode",
      type: "boolean",
      validation: (Rule) => Rule.required().error("Må være valgt/ikke valgt"),
      initialValue: false,
      hidden: ({ parent }) => !parent.preview,
    },
    {
      title: "Setter om koden er autegenerert",
      name: "autogenerated",
      type: "boolean",
      initialValue: false,
      hidden: true,
    },
    {
      type: "array",
      name: "tabs",
      title: "Kode",
      of: [{ type: "code_example_example" }],
      validation: (Rule) => Rule.max(4).error("Kan ha maks 4 tabber med kode"),
    },
    {
      name: "github",
      title: "Lenke til github-kode (optional)",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "title",
      autogenerated: "autogenerated",
    },
    prepare(selection) {
      const { title, autogenerated } = selection;
      return {
        title: title,
        subtitle: autogenerated ? "Autogenerert" : "",
        media: () => "</>",
      };
    },
  },
};

export const example = {
  name: "code_example_example",
  title: "Tabs",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tab tittel",
      type: "string",
      validation: (Rule) => Rule.required().error("Må ha en enkel tittel"),
    },
    {
      name: "example",
      title: "Kode eksempel",
      type: "code",
      validation: (Rule) => Rule.required().error("Må legge til noe kode"),
      options: {
        languageAlternatives: [
          { value: "js", title: "Javascript" },
          { value: "jsx", title: "JSX" },
          { value: "html", title: "HTML" },
          { value: "css", title: "CSS" },
          { value: "terminal", title: "Terminal/Bash" },
        ],
      },
    },
  ],
};
