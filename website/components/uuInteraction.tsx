import { Divide } from "@navikt/ds-icons";
import { Label, Link, Title } from "@navikt/ds-react";
import styled from "styled-components";
import { SanityBlockContent } from "./templating/SanityBlockContent";
import "nav-frontend-tabell-style/dist/main.css";

const Div = styled.div`
  margin-bottom: var(--navds-spacing-8);
`;

const Td = styled.td`
  .navds-typo--spacing {
    margin-bottom: 0;
  }
`;

const UuInteraction = ({ node }) => {
  /*   console.log(node); */
  return (
    <Div>
      {node.uu_interaction_focus && (
        <>
          <Title level="3" size="m" spacing>
            Focus management
          </Title>
          <SanityBlockContent blocks={node.uu_interaction_focus} />
        </>
      )}
      {node.uu_interaction_mouse && (
        <>
          <Title level="3" size="m" spacing>
            Mouse management
          </Title>
          <SanityBlockContent blocks={node.uu_interaction_mouse} />
        </>
      )}
      {node.uu_interaction_keyboard && (
        <>
          <Title level="3" size="m" spacing>
            Keyboard management
          </Title>
          <table className="tabell">
            <thead>
              <tr>
                <th>Command</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {node.uu_interaction_keyboard.map((cm) => {
                return (
                  <tr key={cm._key}>
                    <Td>{<SanityBlockContent blocks={cm.command} />}</Td>
                    <Td>{<SanityBlockContent blocks={cm.description} />}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </Div>
  );
};

export default UuInteraction;
