"use client";

import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Carousel from "@/components/carousel/";
import EditProfile from "./EditProfile";

function UserSittings({ user, sameUser }: { user: any; sameUser: boolean }) {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="Accepted Accounts" title="Accepted Accounts">
          <Card>
            <CardBody className="px-12 sm:px-20">
              {user.accounts.filter((a: any) => a.status == `accepted`).length ? (
                <Carousel
                  enableDecs={true}
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
                enableDecs={true}
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
                  enableDecs={true}
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
          <Tab key="Edit Profile" title="Edit Profile">
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
