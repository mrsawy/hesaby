import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function StatusGroup({
  status,
  onChange,
}: {
  status: "accepted" | "pending" | "declined" | "sold";
  onChange: Function;
}) {
  let [selected, setSelected] = React.useState(status);
  let [color, setColor] = React.useState<
    "primary" | "primary" | "success" | "warning" | "danger"
  >(
    status === "accepted"
      ? "success"
      : status === "pending"
      ? "warning"
      : status === `sold`
      ? `primary`
      : "danger"
  );

  return (
    <div className="flex w-full flex-row w-ful gap-2">
      {/* <div className="flex items-center whitespace-nowrap">Status :</div> */}
      <Tabs
        selectedKey={selected}
        className="w-full te child-w-full flex flex-col sm:flex-row flex-wrap-child-sm"
        aria-label="Dynamic tabs"
        color={color}
      >
        <Tab
          key="accepted"
          className=" w-full  py-5 "
          title={
            <div
              onClick={() => {
                setSelected("accepted");
                onChange("accepted");
                setColor(`success`);
              }}
              className="flex items-center space-x-2 w-full  py-1 px-10 "
            >
              <ThumbUpIcon />

              <span>Accepted</span>
            </div>
          }
        />
        <Tab
          key="pending"
          className="w-full py-5 "
          title={
            <div
              onClick={() => {
                setSelected("pending");
                onChange("pending");
                setColor(`warning`);
              }}
              className="flex items-center space-x-2 "
            >
              <HourglassFullIcon />
              <span>Pending</span>
            </div>
          }
        />
        <Tab
          key="declined"
          className="w-full py-5 "
          title={
            <div
              onClick={() => {
                setSelected("declined");
                onChange("declined");
                setColor(`danger`);
              }}
              className="flex items-center space-x-2 w-full h-full"
            >
              <ThumbDownAltIcon />
              <span>Declined</span>
            </div>
          }
        />
        <Tab
          key="sold"
          className="w-full py-5 "
          title={
            <div
              onClick={() => {
                setSelected("sold");
                onChange("sold");
                setColor(`primary`);
              }}
              className="flex items-center space-x-2 w-full h-full"
            >
              <PriceCheckIcon />
              <span>Sold</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
}
