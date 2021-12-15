import { Modal } from "@navikt/ds-react";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { SandboxContext } from ".";

const ScModal = styled(Modal)`
  background-color: transparent;
  width: calc(100% + 2rem);
  height: 100%;
  border-radius: 0%;
  position: relative;

  > * {
    margin: 0;
  }

  :focus {
    box-shadow: none;
  }

  > .navds-modal__button {
    display: none;
  }
`;

const Fullscreen = ({ children }: { children: React.ReactNode }) => {
  const { sandboxState, setSandboxState } = useContext(SandboxContext);

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return (
    <ScModal
      open={sandboxState.fullscreen}
      onClose={() => setSandboxState({ ...sandboxState, fullscreen: false })}
    >
      {children}
    </ScModal>
  );
};
export default Fullscreen;
