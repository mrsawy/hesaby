"use client";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

// import { Textarea } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import Autocomplete from "@mui/material/Autocomplete";
import * as yup from "yup";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

//
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
//
import Button from "@/components/main-button";
import Input from "@/components/ui/input-light";
import { accountSchema } from "@/lib/formSchemas";
import { sellAccountAction } from "@/actions/sell-acount";
import useIsUserLoggedClient from "@/hooks/useIsUserLoggedClient";
import IsLoading from "@/components/is-loading";
//
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
//

export default function AccountForm({
  platforms,
  games,
}: {
  platforms: readonly any[] | undefined;
  games: readonly any[] | undefined;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  //
  const [mainImage, setMainImage] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [gamesState, setGamesState] = useState<any[]>([]);
  const [platformsState, setPlatformsState] = useState<any[]>([]);
  const [game_id, setGame_id] = useState(null);
  const [platform_id, setPlatform_id] = useState(null);

  useEffect(() => {
    if (games) {
      setGamesState(games.slice());
    }
    if (platforms) {
      setPlatformsState(platforms.slice());
    }
  }, [games, platforms]);
  const handleUpdateMainImage = (fileItems: any) => {
    setMainImage(fileItems.map((fileItem: any) => fileItem.file));
  };
  const handleUpdateGallery = (fileItems: any) => {
    setGallery(fileItems.map((fileItem: any) => fileItem.file));
  };
  let { user } = useIsUserLoggedClient();
  return (
    <IsLoading loading={loading}>
      <form
        onSubmit={() => {
          setLoading(true);
        }}
        action={async (formData: FormData) => {
          if (loading) return;
          try {
            let { email, password, title, description, username, price } = Object.fromEntries(
              formData.entries()
            );
            let accountData = {
              username,
              email,
              title,
              description,
              password,
              price,
              game_id,
              platform_id,
              gallery,
              mainImage: Array.isArray(mainImage) && mainImage.length > 0 ? mainImage[0] : null,
            };

            accountSchema.validateSync(accountData, { abortEarly: false });
            gallery.forEach((image, index) => {
              formData.append(`gallery[${index}]`, image);
            });

            mainImage.forEach((image, index) => {
              formData.append(`mainImage`, image);
            });
            formData.append(`platform_id`, `${platform_id ?? ``}`);
            formData.append(`game_id`, `${game_id ?? ``}`);
            //
            // console.log(Object.fromEntries(formData.entries()));

            let createdAccount = await sellAccountAction(user, formData);
            if (createdAccount) {
              Swal.fire({
                icon: "success",
                title: "Congrats !",
                text: "You`re Account is sent to the admins to review.",
                timer: 2000,
                showConfirmButton: false,
              });

              setTimeout(() => {
                router.push("/");
              }, 1900);
            }

            setLoading(false);
          } catch (error: any) {
            setLoading(false);
            console.log(`error`, error);
            if (error instanceof yup.ValidationError) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.errors[0] ?? "",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.message ?? "",
              });
            }
          }
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            containerClassName="w-full flex-grow"
            className="w-full flex-grow"
            label=" Username"
            placeholder="Enter Username"
            name="username"
          />
          <Input
            containerClassName="w-full flex-grow"
            label=" Email"
            className="w-full"
            placeholder="Enter Email"
            name="email"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            containerClassName="w-full flex-grow"
            label=" Title"
            placeholder="Account Title"
            name="title"
          />
          <Textarea
            name="description"
            //   isRequired
            label="Description"
            labelPlacement="outside"
            placeholder="Enter your description"
            className=" md:w-full border-none-child-textarea outline-none-child-textarea w-full-none-child-textarea h-full-child-textarea "
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            containerClassName="w-full flex-grow"
            label=" Password"
            placeholder="Account Password"
            name="password"
          />
          <Input
            containerClassName="w-full flex-grow"
            label=" Price"
            placeholder="Account Price"
            name="price"
            isNumber={true}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 pt-8">
          <Autocomplete
            onChange={(event: any, newValue: any) => {
              setPlatform_id(newValue?.id);
            }}
            disablePortal
            id="combo-box-demo"
            className="w-full"
            options={platformsState}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Platform" />}
          />
          <Autocomplete
            className="w-full"
            onChange={(event: any, newValue: any) => {
              setGame_id(newValue?.id);
            }}
            disablePortal
            id="combo-box-demo"
            options={gamesState}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Game" />}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2 mt-6 ">
          <div className="w-full md:w-6/12 md:m-auto md:mt-0">
            <label>Main Image</label>
            <FilePond
              files={mainImage}
              onupdatefiles={handleUpdateMainImage}
              allowMultiple={true}
              maxFiles={1}
              acceptedFileTypes={["image/*"]}
              // name="main_image"
              labelIdle='Drag & Drop  Account Main Image or <span class="filepond--label-action">Browse</span>'
            />
          </div>

          <div className="w-full md:w-6/12 md:m-auto md:mt-0">
            <label>
              Gallery <span className="text-gray-500">(5 max)</span>
            </label>

            <FilePond
              files={gallery}
              onupdatefiles={handleUpdateGallery}
              allowMultiple={true}
              maxFiles={5}
              acceptedFileTypes={["image/*"]}
              // name="account_gallery"
              labelIdle='Drag & Drop Account Gallery or <span class="filepond--label-action">Browse</span>'
            />
          </div>
        </div>
        <div className="w-full  text-center mt-8">
          <Button
            disabled={loading}
            className="m-auto bg-slate-900 md:w-9/12 lg:w-6/12 xl:w-4/12 mb-16 py-3"
            type="submit"
          >
            {loading ? (
              <div className="flex justify-center items-center text-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              </div>
            ) : (
              <p
              className="md:text-lg"
              >Sell Your Account</p>
            )}
          </Button>
        </div>
      </form>
    </IsLoading>
  );
}
