"use client";

import { AnimatePresence } from "framer-motion";
import { useWindowStore } from "@/store/useWindowStore";
import { appById } from "@/data/apps";
import DesktopWindow from "./DesktopWindow";
import AppRenderer from "@/components/apps/AppRenderer";

export default function WindowManager() {
  const order = useWindowStore((s) => s.order);
  const windows = useWindowStore((s) => s.windows);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);

  return (
    <div className="pointer-events-none absolute inset-0 z-40">
      <AnimatePresence>
        {order.map((id) => {
          const win = windows[id];
          if (!win || win.minimized) return null;
          const app = appById(id);
          if (!app) return null;
          return (
            <DesktopWindow
              key={id}
              app={app}
              window={win}
              active={activeWindowId === id}
            >
              <AppRenderer appId={id} surface="desktop" />
            </DesktopWindow>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
