"use client";

import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Carousel from "@/components/carousel/";
import EditProfile from "./EditProfile";
import { AnyNode } from "postcss";

function UserSittings({ user, sameUser, edit }: { edit: boolean; user: any; sameUser: boolean }) {
  const [selected, setSelected] = React.useState<string>(
    edit ? `edit_profile` : "accepted_accounts"
  );
  const handleSelectionChange = (key: any) => {
    setSelected(key as string);
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" selectedKey={selected} onSelectionChange={handleSelectionChange}
      
      
      //  className={`flex flex-col w-full lg:flex-row lg:flex-nowrap`}
      
      
      className="w-full te child-w-full flex flex-col sm:flex-row flex-wrap-child-sm"
      
      >
        <Tab key="accepted_accounts" title="Accepted Accounts">
          <Card>
            <CardBody className="px-12 sm:px-20">
              {user.accounts.filter((a: any) => a.status == `accepted`).length ? (
                <Carousel
                  // enableDecs={true}
                  type="account"
                  data={user.accounts.filter((a: any) => a.status == `accepted`)}
                  btnTextPrice={true}
                  btnUrlPrefix={`/accounts/`}
                  carouselItemClassName="basis-full sm: md:basis1/2 lg:basis-1/2 xl:basis-1/2 2xl:basis-1/2"
                />
              ) : (
                <NoDataFound />
              )}
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Sold Accounts" title="Sold Accounts">
          <Card>
            {user.accounts.filter((a: any) => a.status == `sold`).length ? (
              <Carousel
                // enableDecs={true}
                type="account"
                data={user.accounts.filter((a: any) => a.status == `sold`)}
                btnTextPrice={true}
                btnUrlPrefix={`/accounts/`}
                carouselItemClassName="basis-full sm: md:basis1/2 lg:basis-1/2 xl:basis-1/2 2xl:basis-1/2"
              />
            ) : (
              <NoDataFound />
            )}
          </Card>
        </Tab>
        {sameUser && (
          <Tab key="Pending Accounts" title="Pending Accounts">
            <Card>
              {user.accounts.filter((a: any) => a.status == `pending`).length ? (
                <Carousel
                  // enableDecs={true}
                  type="account"
                  data={user.accounts.filter((a: any) => a.status == `pending`)}
                  btnTextPrice={true}
                  btnUrlPrefix={`/accounts/`}
                  carouselItemClassName="basis-full sm: md:basis1/2 lg:basis-1/2 xl:basis-1/2 2xl:basis-1/2"
                />
              ) : (
                <NoDataFound />
              )}
            </Card>
          </Tab>
        )}
        {sameUser && (
          <Tab key="edit_profile" title="Edit Profile">
            <Card>
              <CardBody>
                <EditProfile user={user} />
              </CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export default UserSittings;
// []
export const NoDataFound = () => {
  return <CardBody>No Data Found ~</CardBody>;
};
