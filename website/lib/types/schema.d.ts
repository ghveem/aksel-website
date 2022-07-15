/// <reference types="@sanity-codegen/types" />

declare namespace SanityT {
  namespace Schema {
    /**
     * Forside
     */
    interface vk_frontpage extends Sanity.Document {
      _type: "vk_frontpage";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Beskrivelse - `RegistryReference`
       */
      beskrivelse?: riktekst_enkel;

      /**
       * Brukeropplevelse - `Object`
       */
      prinsipp_1?: {
        /**
         * Vis på forside - `Boolean`
         */
        vis?: boolean;

        /**
         * Beskrivelse - `RegistryReference`
         */
        beskrivelse?: riktekst_enkel;

        /**
         * Hovedside - `Reference`
         */
        hovedside?: Sanity.Reference<aksel_prinsipp>;

        /**
       * Undersider - `Array`
Rekkefølge bestemmer rekkefølgen på forsiden!
       */
        undersider?: Array<Sanity.KeyedReference<aksel_prinsipp>>;
      };

      /**
       * SEO - `Object`
       */
      seo?: {
        /**
       * Meta/:og description - `Text`
Anbefalt maks 150-160 bokstaver. Erstatter ingress som <meta /> description
       */
        meta?: string;

        /**
       * og:Image - `Image`
Anbefalt størrelse er 1200:630px
       */
        image?: {
          asset: Sanity.Asset;
          crop?: Sanity.ImageCrop;
          hotspot?: Sanity.ImageHotspot;
        };
      };
    }

    /**
     * Redaktører
     */
    interface editor extends Sanity.Document {
      _type: "editor";

      /**
       * Navn - `String`
       */
      title?: string;

      /**
       * Sanity bruker-id - `Slug`
       */
      user_id?: {
        _type: "user_id";
        current: string;
      };

      /**
       * Profil - `String`
       */
      profile_page?: string;
    }

    /**
     * Navigation
     */
    interface navigation extends Sanity.Document {
      _type: "navigation";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Sidemeny - `Array`
Linker eller dropdowns med linker. Maks dybde på 2 dropdowns er støttet. Sider må være publisert før de kan linkes her.
       */
      sidemenu?: Array<
        Sanity.Keyed<navigation_dropdown> | Sanity.Keyed<navigation_link>
      >;
    }

    /**
     * Kode med eksempel
     */
    interface ds_code_example extends Sanity.Document {
      _type: "ds_code_example";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Lenke til eksempel - `Url`
       */
      preview?: string;

      /**
       * Hent kode automatisk fra selve eksemplet? - `Boolean`
Prøver å hente React og HTML kode automatisk fra storybook
       */
      infercode?: boolean;

      /**
       * Setter om koden er autegenerert - `Boolean`
       */
      autogenerated?: boolean;

      /**
       * Kode - `Array`
       */
      tabs?: Array<Sanity.Keyed<code_example_example>>;

      /**
       * Lenke til github-kode (optional) - `Url`
       */
      github?: string;
    }

    /**
     * Sandbox for komponent
     */
    interface ds_code_sandbox extends Sanity.Document {
      _type: "ds_code_sandbox";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Sier om navnet er autegenerert - `Boolean`
       */
      autogenerated?: boolean;
    }

    /**
     * Fargekategori
     */
    interface ds_color_categories extends Sanity.Document {
      _type: "ds_color_categories";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Beskrivelse - `RegistryReference`
       */
      description?: riktekst_enkel;

      /**
       * Farger - `Array`
       */
      colors?: Array<Sanity.Keyed<ds_color>>;
    }

    /**
     * Tokens
     */
    interface ds_tokens extends Sanity.Document {
      _type: "ds_tokens";

      /**
       * Navn - `String`
       */
      title?: string;

      /**
       * Verdi - `String`
       */
      token?: string;

      /**
       * Faktisk verdi - `String`
       */
      raw?: string;

      /**
       * Parent - `String`
       */
      parent?: string;

      /**
       * Beskrivelse - `String`
       */
      beskrivelse?: string;

      /**
       * Autogenerert - `Boolean`
       */
      autogenerated?: boolean;
    }

    /**
     * Autogenerert Propdata
     */
    interface ds_props extends Sanity.Document {
      _type: "ds_props";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Displayname - `String`
       */
      displayname?: string;

      /**
       * Filepath - `String`
       */
      filepath?: string;

      /**
       * props - `Array`
       */
      proplist?: Array<
        Sanity.Keyed<{
          _type: "prop";

          /**
           * Name - `String`
           */
          name?: string;

          /**
           * DefaultValue - `String`
           */
          defaultValue?: string;

          /**
           * Description - `String`
           */
          description?: string;

          /**
           * Required - `Boolean`
           */
          required?: boolean;

          /**
           * Type - `String`
           */
          type?: string;

          /**
           * isRef - `Boolean`
           */
          ref?: boolean;
        }>
      >;
    }

    /**
     * Komponentartikkel-template
     */
    interface ds_component_template extends Sanity.Document {
      _type: "ds_component_template";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * Under arbeid - `Object`
Hvis checked og publisert vil siden vises som under arbeid uten at lenker treffer 404
       */
      under_arbeid?: {
        /**
         * Er under arbeid? - `Boolean`
         */
        status?: boolean;

        /**
       * Forklaring - `Text`
Default: Siden blir for tiden oppdatert!
       */
        forklaring?: string;
      };

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Intro - `RegistryReference`
       */
      intro?: intro_komponent;

      /**
       * Bruk - `RegistryReference`
       */
      bruk_tab?: riktekst_komponent;

      /**
       * Kode - `RegistryReference`
       */
      kode_tab?: riktekst_komponent;

      /**
       * Koblet kodepakke - `Reference`
Kobler komponenten til en pakke
       */
      linked_package?: Sanity.Reference<ds_package>;

      /**
       * Figma lenke (optional) - `Url`
       */
      figma_link?: string;

      /**
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;
    }

    /**
     * Forside
     */
    interface ds_frontpage extends Sanity.Document {
      _type: "ds_frontpage";

      /**
       * Innhold - `RegistryReference`
       */
      body?: riktekst_enkel;

      /**
       * Cards - `Array`
       */
      cards?: Array<
        Sanity.Keyed<{
          _type: "card";

          /**
           * Lenke - `Reference`
           */
          link_ref?: Sanity.Reference<komponent_artikkel | ds_artikkel>;

          /**
           * Tittel - `String`
           */
          title?: string;

          /**
           * Innhold - `String`
           */
          content?: string;

          /**
           * Pictogram - `Image`
           */
          picture?: {
            asset: Sanity.Asset;
            crop?: Sanity.ImageCrop;
            hotspot?: Sanity.ImageHotspot;

            /**
       * Alt-tekst - `String`
Beskriv bildet for skjermlesere
       */
            title?: string;
          };
        }>
      >;
    }

    /**
     * Navigation
     */
    interface ds_navigation extends Sanity.Document {
      _type: "ds_navigation";

      /**
       * Designsystem navigajsons-struktur - `String`
       */
      title?: string;

      /**
       * Header linker - `Array`
       */
      headings?: Array<Sanity.Keyed<ds_navigation_heading>>;
    }

    /**
     * Komponentoversikt
     */
    interface ds_component_overview extends Sanity.Document {
      _type: "ds_component_overview";

      /**
       * Komponent - `Array`
       */
      components?: Array<
        Sanity.Keyed<{
          _type: "component";

          /**
           * Komponentnavn - `String`
           */
          title?: string;

          /**
       * Pakkenavn - `Reference`
Kobler komponenten til en pakke og da om den er core/intern/navno. Alle tilgjengelige valg ligge under <Kodepakker>
       */
          linked_package?: Sanity.Reference<ds_package>;

          /**
           * Er komponenten ny? - `Boolean`
           */
          new?: boolean;

          /**
           * Er komponenten i Figma/designet? - `Boolean`
           */
          in_design?: boolean;

          /**
           * Figma bibliotek - `String`
           */
          figma_version?: "new" | "old" | "beta";

          /**
           * Er komponenten Kodet? - `Boolean`
           */
          in_code?: boolean;

          /**
           * Er komponenten fortsatt i Beta? - `Boolean`
           */
          in_code_beta?: boolean;

          /**
           * Er komponentkoden i synk med Figma? - `Boolean`
           */
          figma_sync?: boolean;

          /**
           * Er komponenten i dokumentert? - `Boolean`
           */
          in_doc?: boolean;

          /**
           * Legger til link til dokumentasjonen - `Reference`
           */
          doc_link?: Sanity.Reference<komponent_artikkel | ds_artikkel>;
        }>
      >;
    }

    /**
     * Kodepakke
     */
    interface ds_package extends Sanity.Document {
      _type: "ds_package";

      /**
       * Navn - `String`
       */
      title?: string;

      /**
       * Status - `String`
       */
      status?: "beta" | "live" | "alpha";

      /**
       * Scope - `String`
       */
      scope?: "core" | "internal" | "navno";

      /**
       * Github-kode - `Url`
       */
      github_link?: string;
    }

    /**
     * Komponentartikkel
     */
    interface komponent_artikkel extends Sanity.Document {
      _type: "komponent_artikkel";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * Under arbeid - `Object`
Hvis checked og publisert vil siden vises som under arbeid uten at lenker treffer 404
       */
      under_arbeid?: {
        /**
         * Er under arbeid? - `Boolean`
         */
        status?: boolean;

        /**
       * Forklaring - `Text`
Default: Siden blir for tiden oppdatert!
       */
        forklaring?: string;
      };

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Intro - `RegistryReference`
       */
      intro?: intro_komponent;

      /**
       * Bruk - `RegistryReference`
       */
      bruk_tab?: riktekst_komponent;

      /**
       * Kode - `RegistryReference`
       */
      kode_tab?: riktekst_komponent;

      /**
       * Koblet kodepakke - `Reference`
Kobler komponenten til en pakke
       */
      linked_package?: Sanity.Reference<ds_package>;

      /**
       * Figma lenke (optional) - `Url`
       */
      figma_link?: string;

      /**
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;
    }

    /**
     * Artikkel
     */
    interface ds_artikkel extends Sanity.Document {
      _type: "ds_artikkel";

      /**
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * Under arbeid - `Object`
Hvis checked og publisert vil siden vises som under arbeid uten at lenker treffer 404
       */
      under_arbeid?: {
        /**
         * Er under arbeid? - `Boolean`
         */
        status?: boolean;

        /**
       * Forklaring - `Text`
Default: Siden blir for tiden oppdatert!
       */
        forklaring?: string;
      };

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Bruk Tabs - `Boolean`
       */
      artikkel_type?: boolean;

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_ds_artikkel;

      /**
       * Innhold i Tabs - `Array`
       */
      content_tabs?: Array<
        Sanity.Keyed<{
          _type: "tab";

          /**
       * Tittel - `String`
Innhold vil da legges under url/tab-tittel
       */
          title?: string;

          /**
           * Innhold - `RegistryReference`
           */
          content?: riktekst_ds_artikkel;
        }>
      >;

      /**
       * Tilbakemeldinger - `Object`
       */
      metadata_feedback?: {
        /**
       * Skjul artikkel feedback modul - `Boolean`
Gjemmer <<Var denne artikkelen til hjelp?>> modulen.
       */
        hide_feedback?: boolean;
      };
    }

    /**
     * Aksel Artikkel
     */
    interface aksel_artikkel extends Sanity.Document {
      _type: "aksel_artikkel";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Tema - `Array`
Legg til de viktigeste temaene
       */
      tema?: Array<Sanity.KeyedReference<aksel_tema>>;

      /**
       * Ingress - `Text`
Side, innganger og seo description-tag
       */
      ingress?: string;

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_aksel;

      /**
       * Under arbeid - `Object`
Hvis checked og publisert vil siden vises som under arbeid uten at lenker treffer 404
       */
      under_arbeid?: {
        /**
         * Er under arbeid? - `Boolean`
         */
        status?: boolean;

        /**
       * Forklaring - `Text`
Default: Siden blir for tiden oppdatert!
       */
        forklaring?: string;
      };

      /**
       * SEO - `Object`
       */
      seo?: {
        /**
       * Meta/:og description - `Text`
Anbefalt maks 150-160 bokstaver. Erstatter ingress som <meta /> description
       */
        meta?: string;

        /**
       * og:Image - `Image`
Anbefalt størrelse er 1200:630px
       */
        image?: {
          asset: Sanity.Asset;
          crop?: Sanity.ImageCrop;
          hotspot?: Sanity.ImageHotspot;
        };
      };

      /**
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;
    }

    /**
     * Blogg
     */
    interface aksel_blogg extends Sanity.Document {
      _type: "aksel_blogg";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Ingress - `Text`
Side, innganger og seo description-tag
       */
      ingress?: string;

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_aksel;

      /**
       * Under arbeid - `Object`
Hvis checked og publisert vil siden vises som under arbeid uten at lenker treffer 404
       */
      under_arbeid?: {
        /**
         * Er under arbeid? - `Boolean`
         */
        status?: boolean;

        /**
       * Forklaring - `Text`
Default: Siden blir for tiden oppdatert!
       */
        forklaring?: string;
      };

      /**
       * SEO - `Object`
       */
      seo?: {
        /**
       * Meta/:og description - `Text`
Anbefalt maks 150-160 bokstaver. Erstatter ingress som <meta /> description
       */
        meta?: string;

        /**
       * og:Image - `Image`
Anbefalt størrelse er 1200:630px
       */
        image?: {
          asset: Sanity.Asset;
          crop?: Sanity.ImageCrop;
          hotspot?: Sanity.ImageHotspot;
        };
      };

      /**
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;
    }

    /**
     * Aksel Tema
     */
    interface aksel_tema extends Sanity.Document {
      _type: "aksel_tema";

      /**
       * Navn - `String`
       */
      title?: string;

      /**
       * Kort Intro/Oppsummering - `String`
Brukes i kort og innganger
       */
      oppsummering?: string;

      /**
       * Beskrivelse - `RegistryReference`
       */
      beskrivelse?: riktekst_enkel;

      /**
       * Bruk seksjonsinndeling - `Boolean`
Vil ikke vise artikler som ikke er lagt til i seksjoner hvis valgt!
       */
      bruk_seksjoner?: boolean;

      /**
       * Seksjonering - `Array`
Del inn artiklene i flere seksjoner (vises ikke i preview før publisering desverre)
       */
      seksjoner?: Array<
        Sanity.Keyed<{
          _type: "seksjon";

          /**
           * Tittel - `String`
           */
          title?: string;

          /**
           * Beskrivelse - `RegistryReference`
           */
          beskrivelse?: riktekst_enkel;

          /**
           * Sider - `Array`
           */
          sider?: Array<Sanity.KeyedReference<aksel_artikkel>>;
        }>
      >;
    }

    /**
     * Aksel Prinsipp
     */
    interface aksel_prinsipp extends Sanity.Document {
      _type: "aksel_prinsipp";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Prinsipp - `Object`
Velg prinsippet siden omhandler
       */
      prinsipp?: {
        /**
         * Velg prinsipp - `String`
         */
        prinsippvalg?: "brukeropplevelse";

        /**
         * Er denne siden hovedsiden til Prinsippet? - `Boolean`
         */
        hovedside?: boolean;
      };

      /**
       * Ingress - `Text`
Side, innganger og seo description-tag
       */
      ingress?: string;

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_aksel;

      /**
       * Under arbeid - `Object`
Hvis checked og publisert vil siden vises som under arbeid uten at lenker treffer 404
       */
      under_arbeid?: {
        /**
         * Er under arbeid? - `Boolean`
         */
        status?: boolean;

        /**
       * Forklaring - `Text`
Default: Siden blir for tiden oppdatert!
       */
        forklaring?: string;
      };

      /**
       * SEO - `Object`
       */
      seo?: {
        /**
       * Meta/:og description - `Text`
Anbefalt maks 150-160 bokstaver. Erstatter ingress som <meta /> description
       */
        meta?: string;

        /**
       * og:Image - `Image`
Anbefalt størrelse er 1200:630px
       */
        image?: {
          asset: Sanity.Asset;
          crop?: Sanity.ImageCrop;
          hotspot?: Sanity.ImageHotspot;
        };
      };

      /**
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;
    }

    /**
     * Standalone-sider
     */
    interface aksel_standalone extends Sanity.Document {
      _type: "aksel_standalone";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_aksel;

      /**
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;
    }

    type riktekst_enkel = Array<Sanity.Keyed<Sanity.Block>>;

    type riktekst_aksel = Array<
      | Sanity.Keyed<Sanity.Block>
      | Sanity.Keyed<relatert_innhold>
      | Sanity.Keyed<bilde>
      | Sanity.Keyed<kode>
      | Sanity.Keyed<tips>
      | Sanity.Keyed<do_dont>
      | Sanity.Keyed<accordion>
      | Sanity.Keyed<alert>
      | Sanity.Keyed<tabell>
      | Sanity.Keyed<video>
    >;

    type riktekst_ds_artikkel = Array<
      | Sanity.Keyed<Sanity.Block>
      | Sanity.Keyed<relatert_innhold>
      | Sanity.Keyed<bilde>
      | Sanity.Keyed<kode>
      | Sanity.Keyed<tips>
      | Sanity.Keyed<do_dont>
      | Sanity.Keyed<accordion>
      | Sanity.Keyed<alert>
      | Sanity.Keyed<tabell>
      | Sanity.Keyed<video>
      | Sanity.Keyed<tokens>
      | Sanity.Keyed<spesial_seksjon>
    >;

    type riktekst_komponent = Array<
      | Sanity.Keyed<Sanity.Block>
      | Sanity.Keyed<relatert_innhold>
      | Sanity.Keyed<bilde>
      | Sanity.Keyed<kode>
      | Sanity.Keyed<tips>
      | Sanity.Keyed<do_dont>
      | Sanity.Keyed<accordion>
      | Sanity.Keyed<alert>
      | Sanity.Keyed<tabell>
      | Sanity.Keyed<video>
      | Sanity.Keyed<props_seksjon>
      | Sanity.Keyed<anatomi>
      | Sanity.Keyed<live_demo>
      | Sanity.Keyed<tastatur_modul>
      | Sanity.Keyed<tokens>
    >;

    type riktekst_tabell = Array<Sanity.Keyed<Sanity.Block>>;

    type do_dont = {
      _type: "do_dont";

      /**
       * Do / donts - `Array`
       */
      blokker?: Array<Sanity.Keyed<do_dont_block>>;
    };

    type do_dont_block = {
      _type: "do_dont_block";

      /**
       * Fullwidth - `Boolean`
Tar opp ~ 40% eller 100% av tilgjengelig bredde
       */
      fullwidth?: boolean;

      /**
       * Bilde - `Image`
       */
      picture?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;
      };

      /**
       * alt tekst for bilde - `String`
       */
      alt?: string;

      /**
       * Fritekst - `Text`
Korte konsise beskrivelser. Bruk fullbredde bilde i dodont med egen tekst for lengre forklaringer
       */
      description?: string;

      /**
       * Variant - `String`
       */
      variant?: "do" | "dont" | "warning";
    };

    type bilde = {
      _type: "bilde";
      asset: Sanity.Asset;
      crop?: Sanity.ImageCrop;
      hotspot?: Sanity.ImageHotspot;

      /**
       * Alt-tekst - `String`
Beskriv bildet for skjermlesere
       */
      alt?: string;

      /**
       * Bilde-tekst (optional) - `String`
Dette vil stå under bildet
       */
      caption?: string;

      /**
       * Bildet tar bare ~halve bredden - `Boolean`
       */
      small?: boolean;
    };

    type alert = {
      _type: "alert";

      /**
       * Variant - `String`
       */
      variant?: "success" | "info" | "warning" | "error";

      /**
       * Heading (optional) - `String`
       */
      heading?: string;

      /**
       * Heading nivå - `String`
       */
      heading_level?: "h3" | "h4";

      /**
       * Innhold - `RegistryReference`
       */
      body?: riktekst_enkel;
    };

    type kode = {
      _type: "kode";

      /**
       * Bruk predefinert kodesnutt? - `Boolean`
       */
      variant?: boolean;

      /**
       * Predefinert kodesnutt - `Reference`
       */
      ref?: Sanity.Reference<ds_code_example>;

      /**
       * Kode - `RegistryReference`
       */
      code?: any;
    };

    type relatert_innhold = {
      _type: "relatert_innhold";

      /**
       * Lenker til innhold - `Array`
       */
      lenker?: Array<
        Sanity.Keyed<{
          _type: "lenke";

          /**
           * Tittel - `String`
           */
          title?: string;

          /**
           * Intern side i Sanity - `Boolean`
           */
          intern?: boolean;

          /**
           * Lenke til Intern sanity-side - `Reference`
           */
          intern_lenke?: Sanity.Reference<
            | komponent_artikkel
            | ds_artikkel
            | aksel_artikkel
            | aksel_blogg
            | aksel_prinsipp
          >;

          /**
           * Lenke til ekstern side - `Url`
           */
          ekstern_link?: string;

          /**
       * Linker til et eksternt domene - `Boolean`
Sett denne hvis lenken går til en side utenfor aksel.nav.no
       */
          ekstern_domene?: boolean;
        }>
      >;
    };

    type intro_komponent = {
      _type: "intro_komponent";

      /**
       * Intro-tekst - `RegistryReference`
       */
      body?: riktekst_enkel;

      /**
       * Egnet til å: - `Array`
       */
      brukes_til?: Array<Sanity.Keyed<string>>;

      /**
       * Vurder noe annet: (optional) - `Array`
       */
      brukes_ikke_til?: Array<Sanity.Keyed<string>>;
    };

    type live_demo = {
      _type: "live_demo";

      /**
       * Demo/Sandobox - `Reference`
       */
      sandbox_ref?: Sanity.Reference<ds_code_sandbox>;
    };

    type tabell = {
      _type: "tabell";

      /**
       * Tittel (optional) - `String`
Gi tabellen et navn for å lettere finne den
       */
      title?: string;

      /**
       * Tabell - `RegistryReference`
       */
      powerTable?: any;
    };

    type anatomi = {
      _type: "anatomi";

      /**
       * Anatomi-bilde - `RegistryReference`
       */
      bilde?: bilde;

      /**
       * Forklaring - `Array`
Forklar annoteringen av anatomi-bildet
       */
      forklaring?: Array<
        Sanity.Keyed<{
          _type: "liste_element";

          /**
           * Element - `String`
           */
          element?: string;

          /**
           * Beskrivelse (optional) - `RegistryReference`
           */
          beskrivelse?: riktekst_enkel;
        }>
      >;
    };

    type installasjon_seksjon = {
      _type: "installasjon_seksjon";

      /**
       * Tittel (h2) - `String`
       */
      title?: string;

      /**
       * Installasjon-snippet - `Reference`
       */
      code_ref?: Sanity.Reference<ds_code_example>;
    };

    type props_seksjon = {
      _type: "props_seksjon";

      /**
       * Tittel (h2) - `String`
       */
      title?: string;

      /**
       * Props - `Array`
       */
      komponenter?: Array<
        Sanity.Keyed<{
          _type: "komponent";

          /**
       * Komponent navn - `String`
Slik man ville brukt den, eks Accordion.Item
       */
          title?: string;

          /**
           * Bruker komponenten OverridableComponent API-et - `Boolean`
           */
          overridable?: boolean;

          /**
           * Komponent referanse - `Reference`
           */
          propref?: Sanity.Reference<ds_props>;
        }>
      >;
    };

    type accordion = {
      _type: "accordion";

      /**
       * Tittel (optional) - `String`
       */
      title?: string;

      /**
       * Accordions - `Array`
       */
      list?: Array<
        Sanity.Keyed<{
          _type: "element";

          /**
           * Tittel  - `String`
           */
          title?: string;

          /**
           * Innhold - `RegistryReference`
           */
          content?: riktekst_aksel;
        }>
      >;
    };

    type spesial_seksjon = {
      _type: "spesial_seksjon";

      /**
       * Modul - `String`
       */
      modul?:
        | "farge_kategori"
        | "ikonsok"
        | "endringslogg"
        | "komponentoversikt";

      /**
       * Farge kategori - `Reference`
       */
      farge_ref?: Sanity.Reference<ds_color_categories>;
    };

    type video = {
      _type: "video";

      /**
       * Bruk Microsoft-streams embed - `Boolean`
       */
      bruk_embed?: boolean;

      /**
       * Iframe - `Text`
Trykk share og legg inn iframe her fra Microsoft-streams. Husk å velge størrelse og slå av autplay og show info!
       */
      embed?: string;

      /**
       * Video i WebM format - `File`
Vi anbefaler å bruke Webm formatet om mulig!
       */
      webm?: {
        asset: Sanity.Asset;
      };

      /**
       * Video i Mp4 format (fallback) - `File`
       */
      fallback?: {
        asset: Sanity.Asset;
      };

      /**
       * Alt tekst for skjermlesere - `String`
       */
      alt?: string;

      /**
       * Videotekst - `String`
Kort beskrivelse som vises rett under videon
       */
      caption?: string;

      /**
       * Transkripsjon - `Text`
Hvis videoen inneholder lyd, anbelfaler vi å skrive en transkripsjon som kan leses under videoen.
       */
      transkripsjon?: string;
    };

    type tokens = {
      _type: "tokens";

      /**
       * Tittel/beskrivelse - `String`
       */
      title?: string;

      /**
       * Tokens - `Array`
       */
      tokenlist?: Array<Sanity.KeyedReference<ds_tokens>>;
    };

    type tips = {
      _type: "tips";

      /**
       * Feedback - `Boolean`
Endrer modul-variant
       */
      eksperiment?: boolean;

      /**
       * Innhold - `RegistryReference`
       */
      body?: riktekst_enkel;
    };

    type tastatur_modul = {
      _type: "tastatur_modul";

      /**
       * Tastatur key + action - `Array`
       */
      tastatur?: Array<
        Sanity.Keyed<{
          _type: "keys";

          /**
           * Key - `String`
           */
          key?: string;

          /**
           * Action - `String`
           */
          action?: string;
        }>
      >;
    };

    type navigation_link = {
      _type: "navigation_link";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Link - `Reference`
       */
      link_ref?: Sanity.Reference<komponent_artikkel | ds_artikkel>;
    };

    type navigation_dropdown = {
      _type: "navigation_dropdown";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Meny - `Array`
       */
      dropdown?: Array<
        Sanity.Keyed<navigation_link> | Sanity.Keyed<navigation_dropdown>
      >;
    };

    type ds_color = {
      _type: "ds_color";

      /**
       * Navn - `String`
       */
      title?: string;

      /**
       * CSS variabelnavn - `String`
       */
      full_title?: string;

      /**
       * Fargetype/nivå - `String`
       */
      color_type?: "global" | "semantic";

      /**
       * Brukt fargenavn - `String`
       */
      color_name?: string;

      /**
       * Fargeroller - `Array`
       */
      color_roles?: Array<Sanity.Keyed<string>>;

      /**
       * Brukt farge - `String`
       */
      color_value?: string;

      /**
       * Fargeindeks - `Number`
Brukes for å endre rekkefølgen på listen. Farger med indeks 0 vil være først, større tall sorteres under der igjen
       */
      color_index?: number;
    };

    type ds_navigation_heading = {
      _type: "ds_navigation_heading";

      /**
       * Heading tittel - `String`
       */
      title?: string;

      /**
       * Side selve headingen linker til - `Reference`
Husk å legge denne til i menyen også, hvis ikke blir den bare tilgjengelig via headern
       */
      link_ref?: Sanity.Reference<komponent_artikkel | ds_artikkel>;

      /**
       * Meny for denne headingen - `Array`
       */
      menu?: Array<
        | Sanity.Keyed<{
            _type: "item";

            /**
             * Menypunkt tittel - `String`
             */
            title?: string;

            /**
             * Link til side - `Reference`
             */
            link?: Sanity.Reference<komponent_artikkel | ds_artikkel>;
          }>
        | Sanity.Keyed<{
            _type: "subheading";

            /**
             * Subheading - `String`
             */
            title?: string;
          }>
      >;
    };

    type code_example_example = {
      _type: "code_example_example";

      /**
       * Tab tittel - `String`
       */
      title?: string;

      /**
       * Kode eksempel - `RegistryReference`
       */
      example?: any;
    };

    type Document =
      | vk_frontpage
      | editor
      | navigation
      | ds_code_example
      | ds_code_sandbox
      | ds_color_categories
      | ds_tokens
      | ds_props
      | ds_component_template
      | ds_frontpage
      | ds_navigation
      | ds_component_overview
      | ds_package
      | komponent_artikkel
      | ds_artikkel
      | aksel_artikkel
      | aksel_blogg
      | aksel_tema
      | aksel_prinsipp
      | aksel_standalone;
  }
}

export default SanityT;
