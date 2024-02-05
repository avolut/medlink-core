import { getPathname } from "@/utils/pathname";
import { FC, ReactNode, useState } from "react";
import { icon } from "@/comps/icon";
import { ChevronDown, ChevronUp } from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: icon.home,
    url: "/adm/home",
  },
  {
    title: "Schedule",
    icon: icon.schedule,
    url: "#",
    submenu: [
      {
        title: "Inspection Schedule",
        icon: icon.schedule,
        url: "/adm/insp/schedule",
      },
      {
        title: "Maintenance Schedule",
        icon: icon.schedule,
        url: "/adm/mnt/schedule",
      },
    ],
  },
  {
    title: "Transaction",
    icon: icon.transaction,
    url: "#",
    submenu: [
      {
        title: "Inspection",
        icon: icon.transaction,
        url: "/adm/insp/home",
      },
      {
        title: "Maintenance",
        icon: icon.transaction,
        url: "/adm/wo/list",
      },
    ],
  },
  {
    title: "Master Data",
    icon: icon.master_data,
    url: "#",
    submenu: [
      {
        title: "Asset",
        icon: icon.master_data,
        url: "/master/asset/list",
      },
      {
        title: "Asset Category",
        icon: icon.master_data,
        url: "/master/category/list",
      },
      {
        title: "Asset Location",
        icon: icon.master_data,
        url: "/master/location/list",
      },
      {
        title: "Parameter",
        icon: icon.master_data,
        url: "/master/parameter/list",
      },
      {
        title: "Maintenance Task",
        icon: icon.master_data,
        url: "/master/task/list",
      },
    ],
  },
  {
    title: "Manage User",
    icon: icon.manage_user,
    url: "#",
    submenu: [
      {
        title: "User",
        icon: icon.manage_user,
        url: "/master/user/list",
      },
      {
        title: "Role",
        icon: icon.manage_user,
        url: "/master/role/list",
      },
    ],
  },
  {
    title: "Profile",
    icon: icon.profile,
    url: "/profile",
  },
];

export const MenuItem: FC<{
  title: string;
  icon: any;
  url: string;
  submenu?: any;
  index?: number;
  openIndex?: number;
  is_active: boolean;
}> = ({ title, icon, url, submenu, index, openIndex, is_active }) => {
  return (
    <div
      onClick={() => navigate(url)}
      className={cx(
        css`
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
        `,
        "c-flex c-flex-col c-justify-center c-cursor-pointer c-ml-3 c-mt-2",
        is_active
          ? "c-bg-blue-50 c-border-l-blue-600"
          : "c-border-t-transparent"
      )}
    >
      <div className="c-flex c-w-full c-space-x-2 c-items-center c-ml-2">
        <div
          className={cx(
            css`
              margin-right: 10px;
            `
          )}
        >
          {icon}
        </div>
        <div className="c-mt-1 c-ml-3 c-w-full c-flex c-justify-between">
          <div>
            <span>{title}</span>
          </div>
          <div>
            {!!submenu &&
              submenu.length > 0 &&
              (openIndex === index ? (
                <ChevronUp />
              ) : (
                <ChevronDown className="c-justify-end" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const DesktopLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSubmenu = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className={cx("c-flex c-flex-1 c-flex-row")}>
      <div
        className={cx(
          "c-flex c-flex-col",
          css`
            border-right: 1px solid #ececeb;
            min-width: 250px;
            padding: 10px;
          `
        )}
      >
        <div
          className={cx(
            css`
              border-left: 4px solid black;
              padding-left: 10px;
              margin-bottom: 20px;
              font-size: 20px;
              font-weight: bold;
            `
          )}
        >
          Wareify
        </div>
        <div className="c-flex c-flex-col c-justify-between">
          {menu.map((data, index) => {
            const { url } = data;

            const is_active = getPathname() === url;

            return (
              <div key={index}>
                <div
                  onClick={() => toggleSubmenu(index)}
                  className="cursor-pointer"
                >
                  <MenuItem
                    {...data}
                    openIndex={openIndex as number}
                    index={index}
                    is_active={is_active as boolean}
                  />
                </div>
                {openIndex === index && (
                  <div className="pl-8">
                    {data?.submenu?.map((subitem, subindex) => (
                      <div key={subindex} className="c-ml-3">
                        <MenuItem
                          {...subitem}
                          is_active={is_active as boolean}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="c-flex c-flex-1 c-flex-col">{children}</div>
    </div>
  );
};
