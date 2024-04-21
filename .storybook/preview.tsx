import type { Preview } from "@storybook/react";
import { Inter as FontSans } from "next/font/google";
import React from "react";
import "../styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={fontSans.className}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
