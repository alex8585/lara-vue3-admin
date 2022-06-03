// MyComponent.test.js
import { describe, it, assert, expect } from "vitest";

import { mount } from "@vue/test-utils";
import { render } from "@testing-library/vue";
import CreateDialog from "@/components/ErrorMsg.vue";
import { fn } from "vitest";
import { createTestingPinia } from "@pinia/testing";
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
