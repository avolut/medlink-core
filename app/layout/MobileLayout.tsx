import { getPathname } from "@/utils/pathname";
import { FC, ReactNode } from "react";
import { icon } from "@/comps/icon";

const menu = {
  admin: [
    ["Home", icon.home, "/adm/home"],
    ["Inspection", icon.inspect, "/adm/insp/home"],
    ["Scan QR", icon.qr, "/master/asset/detail/:id"],
    ["Maintenance", icon.maintenance, "/adm/wo/list"],
    ["Profile", icon.profile, "/profile"],
  ],
};

export const MobileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const active_menu = menu["admin"];

  preload(active_menu.map(([_, __, url]) => url) as string[]);

  return (
    <div
      className={cx(
        "c-flex c-flex-1 c-flex-col c-select-none c-overflow-hidden c-cursor-pointer"
      )}
    >
      <div className="c-relative c-flex-1 c-overflow-auto">
        <div className="c-absolute c-inset-0">{children}</div>
      </div>
      <div
        className={cx(
          " c-flex-row c-flex c-items-stretch c-justify-center",
          css`
            user-select: none;
            border-top: 1px solid #ececeb;
            min-height: 60px;
          `
        )}
      >
        {active_menu.map((data) => {
          const [title, icon, url] = data;
          const is_active = getPathname() === url;
          return (
            <div
              onClick={() => {
                if (typeof url === "string") navigate(url);
              }}
              className={cx(
                "c-flex c-flex-col c-justify-center c-items-center c-px-3 c-flex-1 c-transition-all",
                is_active
                  ? css`
                      background: #fff7ef;
                      border-top: 3px solid #eb7024;
                    `
                  : "c-border-t-transparent"
              )}
            >
              <div
                className={css`
                  margin-bottom: 3px;
                `}
              >
                {icon}
              </div>
              <div className="c-text-xs c-whitespace-nowrap">{title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
