// import SideBar from "./SideBar";
import Card from "@/components/cards/nextui-card";
import { cn } from "@/lib/utils";

export default function Container({ games, breadCrumb }: any) {
  return (
    <>
      <div className="w-auto sm:w-9/12 lg:w-10/12 m-auto ">
        {breadCrumb && <div className="p-4">{breadCrumb}</div>}
        <div
          style={{ minHeight: `70vh` }}
          className="border rounded-xl p-4 dark:border-gray-800 lg:px-3 flex flex-wrap justify-center items-start gap-y-9 w-auto m-auto md:mx-3"
        >
          {games.map((game: any) => {
            return (
              <Card
                btnTxt={`SEE mORE`}
                img={game.imgUrl}
                title={game.title}
                key={game.id}
                id={game.id}
                btnUrl={`/games/${game?.id}?gameName=${game?.title}`}
                desc={game?.description ?? ``}
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
