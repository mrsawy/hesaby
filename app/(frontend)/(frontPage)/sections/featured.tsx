import Carousel from "@/components/carousel/";

export default function Featured({
  btnUrlPrefix,
  data,
  label,
  enableDecs,
  btnTxt,
  btnTextPrice,
}: any) {
  // console.log(`enableDecs Featured`, enableDecs);
  return (
    <>
      {/* <div className="flex gap-4 px-12 lg:px-32 xl:36 2xl:px-40 py-3 flex-wrap w-full  "> */}
      <div className="w-[70vw] sm:w-[89vw] lg:my-24 mx-auto">
        <Carousel
          btnUrlPrefix={btnUrlPrefix}
          data={data}
          label={label}
          enableDecs={enableDecs}
          btnTxt={btnTxt}
          btnTextPrice={btnTextPrice}
        />
      </div>
    </>
  );
}
