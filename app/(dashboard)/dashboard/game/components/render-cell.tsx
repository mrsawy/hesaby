"use client";

import { Button, Input, TableCell, TableRow } from "@nextui-org/react";
import Image from "next/image";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { isValidUrl } from "@/lib/utils";

const BodyComponentRenderFunction = (ele: {
  gameImg: string;
  title: string;
  description: string;
  platform?: { title: string };
}) => {
  console.log(`gamer render cell =>=>`, ele);
  let imageUrl;
  try {
    imageUrl = ele?.gameImg ? ele?.gameImg : ``;
  } catch (err) {
    console.log(err);
    imageUrl = null;
  }

  return (
    <TableRow>
      <TableCell>
        <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
          {imageUrl && isValidUrl(imageUrl) && (
            <Image
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              fill
              src={imageUrl}
              alt={`platform image`}
            />
          )}
        </div>
      </TableCell>
      <TableCell>
        <div>{ele?.title}</div>
      </TableCell>
      <TableCell>
        <div>{ele?.description}</div>
      </TableCell>

      <TableCell>
        <div>
          <div className="flex items-center gap-4 ">
            <div>
              <Tooltip content="Edit " color="secondary">
                <button onClick={() => console.log("Edit ")}>
                  <EditIcon size={20} fill="#979797" />
                </button>
              </Tooltip>
            </div>
            <div>
              <Tooltip content="Delete " color="danger" onClick={() => console.log("Delete ")}>
                <button>
                  <DeleteIcon size={20} fill="#FF0080" />
                </button>
              </Tooltip>
            </div>
          </div>
          {/*  */}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BodyComponentRenderFunction;
