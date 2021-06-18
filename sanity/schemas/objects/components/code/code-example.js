import { getExamples } from "examples";

export default {
  title: "Kode eksempel",
  name: "code_example",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      /* validation: (Rule) => Rule.required(), */
    },
    {
      name: "body",
      title: "Tekst",
      type: "simple_block_content",
    },
    {
      title: "Kode eksempel",
      name: "code_preview",
      type: "string",
      options: {
        list: [...getExamples()],
      },
    },
    {
      name: "codeExample",
      title: "Kode eksempel",
      type: "code",
      //TODO: Legge til support bare for spesifikke språk (`languageAlternatives` er broken atm)
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({ title: "Kodeblokk: " + title }),
  },
};
