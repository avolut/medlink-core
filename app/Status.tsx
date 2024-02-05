import { FC } from "react";

const colors = {
  inspection_result: {
    good: "green",
    caution: "orange",
    urgent: "red",
  },
  wo_status: {},
};

export const WareifyStatus: FC<{
  value: any;
  type: "inspection_result" | "wo_status";
}> = ({ value, type }) => {

  let str_val = typeof value === 'string' ? value : ""
  let color = (colors as any)[type][str_val.toLowerCase()];
  if (!color) {
    color = "#999";
  }
  return (
    <div
      className={cx(
        " c-text-white c-px-2 c-py-[3px] c-rounded-sm",
        css`
          font-size: 12px;
          text-align: center;
          width: 100px;
          background: ${color};
        `
      )}
    >
      {value}
    </div>
  );
};
