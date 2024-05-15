"use client";
import React from "react";
import Swal from "sweetalert2";
import InputLight from "@/components/ui/input-light";
import Button from "@/components/main-button";
import useGeneralStore from "@/store/generalStore";
import controlSiteData from "@/actions/admin/controlSiteData";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Main({ structure, pageTitle }: { pageTitle: string; structure: any[] }) {
  let setGeneralIsLoading = useGeneralStore((s) => s.setGeneralIsLoading);

  return (
    <div className="container">
      <h1 className="text-2xl m-auto text-center mt-10">{pageTitle}</h1>
      <form
        action={async (formData: FormData) => {
          try {
            setGeneralIsLoading(true);
            const formDataObject = Object.fromEntries(formData.entries());
            if (Object.values(formDataObject).some((v: any) => !v || v?.length === 0)) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "All Fields Are Required !",
              });
              setGeneralIsLoading(false);
              return;
            } else {
              // control logic

              for (let key in formDataObject) {
                const value = formDataObject[key];
                console.log(key);
                if (value instanceof File && (!value.name || !value.size)) {
                  formData.delete(key);
                }
              }

              await controlSiteData(formData);
              setGeneralIsLoading(false);
              Swal.fire({
                icon: "success",
                title: "Updated Successfully!",
                timer: 4000,
                allowOutsideClick: false,
                showConfirmButton: false,
              });
              setTimeout(() => {
                window.location.reload();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }, 2000);
            }
          } catch (error: any) {
            setGeneralIsLoading(false);
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong (Please Refresh and try again)!",
            });
          }
        }}
      >
        <div className="flex flex-col gap-y-8">
          {structure.map((item: any, index: any) => {
            switch (item.element) {
              case "label":
                return <label key={index}>{item?.text}</label>;
              case "input":
                if (item?.type == `file`) {
                  return (
                    <div
                      className={cn(
                        "flex gap-8 w-full justify-between items-center",
                        item?.fileContainerClassName ?? ``
                      )}
                    >
                      <InputLight
                        containerClassName={cn("w-full", item?.className ?? `unique__`)}
                        // defaultValue={item?.defaultValue ?? ``}

                        key={item?.name}
                        placeholder={item?.title}
                        type={item?.type}
                        name={item?.name}
                        multiple={item?.multiple ? item.multiple : false}
                      />
                      {item?.defaultValue && (
                        <Image width={200} height={150} src={item?.defaultValue} alt={item?.name} />
                      )}
                    </div>
                  );
                }
                return (
                  <InputLight
                    containerClassName={cn("w-full", item?.className ?? `unique__`)}
                    defaultValue={item?.defaultValue ?? ``}
                    key={item?.name}
                    placeholder={item?.title}
                    type={item?.type}
                    name={item?.name}
                    multiple={item?.multiple ? item.multiple : false}
                  />
                );
              case "hr":
                return <hr />;
              default:
                return <div>Wrong element type</div>;
            }
          })}
          <Button type="submit" className="lg:w-1/2 xl:w-3/12 m-auto lg:py-1 mb-36">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Main;
