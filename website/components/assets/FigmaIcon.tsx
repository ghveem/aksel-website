import React from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const FigmaIcon = ({ ...props }): JSX.Element => (
  <svg
    {...props}
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 18 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    aria-label="Figma"
  >
    <path
      d="M15.5 4.99999C15.5 6.93299 13.9531 8.49999 12.0449 8.49999H8.5V1.5H12.0449C13.9531 1.5 15.5 3.067 15.5 4.99999Z"
      fill="#FF7262"
      stroke="#262626"
    />
    <path
      d="M1.5 4.99999C1.5 6.93299 3.04691 8.49999 4.95513 8.49999H8.5V1.5H4.95513C3.04691 1.5 1.5 3.067 1.5 4.99999Z"
      fill="#F24E1E"
      stroke="#262626"
    />
    <path
      d="M1.5 12C1.5 13.933 3.04691 15.5 4.95513 15.5H8.5V8.5H4.95513C3.04691 8.5 1.5 10.067 1.5 12Z"
      fill="#A259FF"
      stroke="#262626"
    />
    <path
      d="M1.5 19C1.5 20.933 3.0692 22.5 4.97742 22.5C6.91042 22.5 8.5 20.9126 8.5 18.9545V15.5H4.95513C3.04691 15.5 1.5 17.067 1.5 19Z"
      fill="#0ACF83"
      stroke="#262626"
    />
    <path
      d="M8.5 12C8.5 13.933 10.0469 15.5 11.9551 15.5H12.0449C13.9531 15.5 15.5 13.933 15.5 12C15.5 10.067 13.9531 8.5 12.0449 8.5H11.9551C10.0469 8.5 8.5 10.067 8.5 12Z"
      fill="#1ABCFE"
      stroke="#262626"
    />
  </svg>
);

export const FigmaIconNoSync = ({ ...props }): JSX.Element => (
  <svg
    {...props}
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    aria-label="Figma ikke i sync"
  >
    <path d="M1.5 22.5L22.5 1.5" stroke="#BA3A26" strokeWidth="2" />
    <path
      d="M18.5 4.99999C18.5 6.93299 16.9531 8.49999 15.0449 8.49999H11.5V1.5H15.0449C16.9531 1.5 18.5 3.067 18.5 4.99999Z"
      stroke="#262626"
    />
    <path
      d="M4.5 4.99999C4.5 6.93299 6.04691 8.49999 7.95513 8.49999H11.5V1.5H7.95513C6.04691 1.5 4.5 3.067 4.5 4.99999Z"
      stroke="#262626"
    />
    <path
      d="M4.5 12C4.5 13.933 6.04691 15.5 7.95513 15.5H11.5V8.5H7.95513C6.04691 8.5 4.5 10.067 4.5 12Z"
      stroke="#262626"
    />
    <path
      d="M4.5 19C4.5 20.933 6.0692 22.5 7.97742 22.5C9.91042 22.5 11.5 20.9126 11.5 18.9545V15.5H7.95513C6.04691 15.5 4.5 17.067 4.5 19Z"
      stroke="#262626"
    />
    <path
      d="M11.5 12C11.5 13.933 13.0469 15.5 14.9551 15.5H15.0449C16.9531 15.5 18.5 13.933 18.5 12C18.5 10.067 16.9531 8.5 15.0449 8.5H14.9551C13.0469 8.5 11.5 10.067 11.5 12Z"
      stroke="#262626"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 17.335H16.6664C15.8573 17.9444 15.3333 18.9147 15.3333 20.0081C15.3333 21.319 16.0865 22.453 17.1812 23.0001L17.4786 22.402C16.6014 21.9636 16 21.056 16 20.0081C16 19.0192 16.5357 18.1551 17.3333 17.6925V19.674H18V16.6667H15V17.335ZM22.6667 19.9921C22.6667 21.0855 22.1427 22.0558 21.3336 22.6651H23V23.3334L20 23.3334V20.3262H20.6667V22.3076C21.4643 21.8451 22 20.981 22 19.9921C22 18.9442 21.3986 18.0366 20.5214 17.5982L20.8188 17.0001C21.9135 17.5472 22.6667 18.6811 22.6667 19.9921Z"
      fill="#262626"
    />
  </svg>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const FigmaIconGrayScale = ({ ...props }): JSX.Element => (
  <svg
    width="18"
    height="26"
    viewBox="0 0 18 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    aria-label="Figma ikon"
    focusable="false"
  >
    <g clipPath="url(#clip0)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.459473 5.44999C0.459473 2.97008 2.46984 0.959717 4.94975 0.959717H8.06672H9.53756H12.6545C15.1344 0.959717 17.1448 2.97008 17.1448 5.44999C17.1448 7.02029 16.3387 8.40232 15.1178 9.2049C16.3387 10.0075 17.1448 11.3895 17.1448 12.9598C17.1448 15.4397 15.1344 17.4501 12.6545 17.4501H12.557C11.3944 17.4501 10.335 17.0082 9.53756 16.2833V17.4501V20.4207C9.53756 22.9336 7.47466 24.9597 4.97398 24.9597C2.50023 24.9597 0.459473 22.9555 0.459473 20.4694C0.459473 18.8992 1.26547 17.5172 2.48632 16.7146C1.26547 15.912 0.459473 14.53 0.459473 12.9598C0.459473 11.3895 1.26553 10.0075 2.48647 9.2049C1.26553 8.40232 0.459473 7.02029 0.459473 5.44999ZM8.06672 12.9598V9.94037H4.94975C3.28215 9.94037 1.93031 11.2922 1.93031 12.9598C1.93031 14.6214 3.2725 15.9696 4.93186 15.9792L4.94975 15.9792H8.06672V12.9598ZM9.53756 12.9598C9.53756 14.6274 10.8894 15.9792 12.557 15.9792H12.6545C14.3221 15.9792 15.674 14.6274 15.674 12.9598C15.674 11.2922 14.3221 9.94037 12.6545 9.94037H12.557C10.8894 9.94037 9.53756 11.2922 9.53756 12.9598ZM4.94975 17.4501L4.93195 17.45C3.27255 17.4596 1.93031 18.8078 1.93031 20.4694C1.93031 22.1309 3.30021 23.4889 4.97398 23.4889C6.67467 23.4889 8.06672 22.1091 8.06672 20.4207V17.4501H4.94975ZM4.94975 2.43055H8.06672V8.46943H4.94975C3.28215 8.46943 1.93031 7.11758 1.93031 5.44999C1.93031 3.7824 3.28215 2.43055 4.94975 2.43055ZM9.53756 8.46943V2.43055H12.6545C14.3221 2.43055 15.674 3.7824 15.674 5.44999C15.674 7.11758 14.3221 8.46943 12.6545 8.46943H9.53756Z"
        fill="var(--navds-semantic-color-text-muted)"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="18"
          height="25"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);
