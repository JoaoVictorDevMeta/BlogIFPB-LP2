// filepath: /c:/Users/João Victor/Documents/dev/projetos/nodejs/BlogIFPB-LP2/client/setupTests.js
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
    cleanup();
});
