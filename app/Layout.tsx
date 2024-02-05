import { FC, ReactNode, useLayoutEffect, useState } from "react";
import { MobileLayout } from "./layout/MobileLayout";
import { DesktopLayout } from "./layout/DesktopLayout";
import { getPathname } from "@/utils/pathname";

const w = window as any;
export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [_, set] = useState({});
  const render = () => set({});
  useLayoutEffect(() => {
    const fn = function () {
      const mode = localStorage.getItem("prasi-editor-mode");
      if (isEditor) {
        setTimeout(() => {
          if (mode === "mobile") {
            w.isMobile = true;
            w.isDesktop = false;
          } else {
            w.isMobile = false;
            w.isDesktop = true;
          }
          render();
        }, 50);
      } else {
        if (mode === "desktop") {
          if (window.matchMedia("screen and (max-width: 768px)").matches) {
            w.isMobile = true;
            w.isDesktop = false;
          } else {
            w.isMobile = false;
            w.isDesktop = true;
          }
        }
        render();
      }
    };
    if (!isEditor) {
      fn();
      window.addEventListener("resize", fn);
      return () => {
        window.removeEventListener("resize", fn);
      };
    } else {
      const el = document.querySelector(".main-editor-content");

      if (el) {
        const rx = new ResizeObserver(fn);
        rx.observe(el);
        return () => {
          rx.disconnect();
        };
      }
    }
  }, [isMobile, isDesktop]);

  const no_layout = ["/login"];
  if (no_layout.includes(getPathname())) return children;

  if (isMobile) return <MobileLayout children={children} />;
  return <DesktopLayout children={children} />;
};
