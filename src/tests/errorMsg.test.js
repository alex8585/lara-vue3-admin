// MyComponent.test.js
import { describe, it } from "vitest";

import { render } from "@testing-library/vue";
import CreateDialog from "@/components/ErrorMsg.vue";
// The component to test

describe("ErrorMsg component", () => {
  it("render test", () => {
    const { getByText } = render(CreateDialog, {
      props: {
        error: "test msg",
        dark: true,
      },
    });
    getByText("test msg");
  });
});
