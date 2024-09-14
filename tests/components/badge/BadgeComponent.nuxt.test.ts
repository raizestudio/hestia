import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";

import BadgeComponent from "@/components/badge/BadgeComponent.vue";

describe("BadgeComponent", () => {
    it("should render", async () => {
        const component: any = await mountSuspended(BadgeComponent, { props: { text: "Hello", color: "bg-light-100" } });
        
        // console.log(component);
        expect(component.html()).toContain("Hello");
        expect(component.html()).toContain("bg-light-100");
    });
});