// import SideBar from "./SideBar";
import Card from "@/components/cards/nextui-card";
import { cn } from "@/lib/utils";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function Container({
  data,
  breadCrumb,
  SideBar,
  btnUrlPrefix,
  btnTextPrice,
  className,
  btnTxt,
}: {
  data: any[] | undefined;
  breadCrumb?: React.ReactNode;
  SideBar?: React.ReactNode;
  className?: string;
  btnTxt?: string;
  btnUrlPrefix: string;
  btnTextPrice: boolean;
}) {
  return (
    <>
      {SideBar && <>{SideBar}</>}
      <div className={"w-auto sm:w-9/12 lg:w-10/12 m-auto " + className}>
        {breadCrumb && <div className="p-4">{breadCrumb}</div>}
        <div
          style={{ minHeight: `70vh` }}
          className="border rounded-xl p-4 dark:border-gray-800 lg:px-3 flex flex-wrap justify-center items-start gap-y-9 w-auto m-auto md:mx-3"
        >
          {data &&
            data.map((e: any, index: number) => {
              return (
                <Card
                  btnUrl={
                    btnUrlPrefix.includes(`game`)
                      ? `${btnUrlPrefix}${data[index].id}?gameName=${data[index].title}`
                      : `${btnUrlPrefix}${data[index].id}`
                  }
                  btnTxt={
                    btnTextPrice ? (
                      <div className="gap-2 flex flex-row flex-nowrap">
                        <div className="flex gap-1 md:gap-2 lg:text-xl">
                          <p>{data[index].price}</p>
                          <span>SR</span>
                        </div>

                        {<ShoppingCartCheckoutIcon className="text-base md:text-md lg:text-lg" />}
                      </div>
                    ) : (
                      btnTxt
                    )
                  }
                  // btnTxt={`SEE mORE`}
                  img={e.imgUrl}
                  title={e.title}
                  key={e.id}
                  id={e.id}
                  // btnUrl={`/games/${e?.id}?gameName=${e?.title}`}
                  desc={e?.description ?? ``}
                  className={cn(
                    // "md:basis-1/3 lg:basis-1/3  ",
                    ` w-[10rem]  md:w-[19rem]`,
                    " h-[15rem]  lg:h-[17rem] min-[1100px]:h-[20rem]  2xl:h-[21rem]  mx-auto sm:mx-6   "
                  )}
                />
              );
            })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
