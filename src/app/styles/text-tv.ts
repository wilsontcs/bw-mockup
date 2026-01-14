import { tv } from "tailwind-variants";

export const textTv = tv({
  variants: {
    active: {
      true: "text-white",
      false: "text-[#ffffff6a]",
    },
  },
});
