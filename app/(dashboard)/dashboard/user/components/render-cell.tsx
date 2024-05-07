"use client";

import { Button, Input, TableCell, TableRow } from "@nextui-org/react";
import Image from "next/image";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { isValidUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BodyComponentRenderFunction = (ele: {
  profileImg: string;
  firstName: string;
  lastName: string;
  // username: string;
  email: string;
  phoneNumber: string | number;
  balance: string | number;
  id: string;
}) => {
  let imageUrl;
  try {
    imageUrl = ele?.profileImg ? ele?.profileImg : `/image_placeholder.jpg`;
  } catch (err) {
    console.log(err);
    imageUrl = null;
  }
  let router = useRouter();
  return (
    <TableRow key={ele.id}>
      <TableCell>
        <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
          {imageUrl && isValidUrl(imageUrl) && (
            <Image
              sizes="(max-width: 640px) 40vw, (max-width: 1024px) 75vw, 50vw"
              fill
              src={imageUrl}
              alt={`user image`}
            />
          )}
        </div>
      </TableCell>
      <TableCell>
        <div>{`${ele?.firstName} ${ele.lastName}  `}</div>
      </TableCell>
      <TableCell>
        <div>{ele?.email}</div>
      </TableCell>
      <TableCell>
        <div>{ele?.phoneNumber ?? ``}</div>
      </TableCell>
      <TableCell>
        <div>{ele?.balance ?? ``}</div>
      </TableCell>
      {/* <TableCell>
        <Chip
          size="sm"
          variant="flat"
          color={
            ele?.status === "accepted"
              ? "success"
              : ele?.status === "declined"
              ? "danger"
              : "warning"
          }
        >
          <span className="capitalize text-xs">{ele?.status}</span>
        </Chip>
      </TableCell> */}
      {/* <TableCell>
        <div>{`Data`}</div>
      </TableCell>
      <TableCell>
        <div>{`Seller`}</div>
      </TableCell> */}

      <TableCell>
        <div>
          <div className="flex items-center gap-4 ">
            <div>
              <Tooltip content="Edit " color="secondary">
                <Link href={`/dashboard/user/${ele?.id}`}>
                  <button type="button">
                    <EditIcon size={20} fill="#979797" />
                  </button>
                </Link>
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
