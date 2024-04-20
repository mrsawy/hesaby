type SliderContent = {
  background: string;
  titleAsImage?: string;
  price: string;
  url: string;
}[];

const content: SliderContent = [
  {
    background: `/slider/jeddi.jpg`,
    price: `120`,
    url: `http://localhost:3000/`,
    titleAsImage: `/slider/jeddiTitleImage.png`,
  },
  {
    background: `/slider/cyperpunk.jpg`,
    price: `120`,
    url: `http://localhost:3000/`,
    titleAsImage: `/slider/cyperTitleImage.png`,
  },
  { background: `/slider/bg.jpg`, price: `120`, url: `http://localhost:3000/` },
  { background: `/slider/spider.jpg`, price: `120`, url: `http://localhost:3000/` },
];
export default content;

// /slider/cyperpunk.jpg
// /slider/spider.jpg
// /slider/jeddi.jpg
