import img1 from "figma:asset/bcf3177c80abf1b743b452014000766966fbeed1.png";
import img81756221 from "figma:asset/4d2059ca38537fdd57330830faad3da787058c5f.png";
import img81756211 from "figma:asset/cecedf3ffb11af9741994c73716af1ba8dea0f77.png";
import img81756181 from "figma:asset/46fa9a4ea050cfd30f52975a7a407f2e09fdf541.png";
import img81756171 from "figma:asset/d23c6fd1699e3172ab0e347c16921e1bae14ec3e.png";
import img81756191 from "figma:asset/16092065703d19bc4cc14eb89a2c71bb431251a5.png";
import img81756201 from "figma:asset/d8cb79335b30c902959fbb44b47101bf4a582ee9.png";
import img81756251 from "figma:asset/e94177d23c4b4b7c9f6aaa63ca258525d67b9883.png";
import img817561811 from "figma:asset/36a283b0818cbb993a3af5ed58381dfaa2ee89e1.png";
import img81756271 from "figma:asset/a8f7631c1b36f8df397345be4b29c5f01659c792.png";
import img1923 from "figma:asset/9a71c60fc38ef5fd7dbcdb4c7aedb5478fafd2ae.png";

function Frame1() {
  return (
    <div className="content-stretch flex gap-[100px] items-center relative shrink-0 w-full">
      <div className="h-[502px] relative shrink-0 w-[355px]" data-name="8175622 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img81756221} />
      </div>
      <div className="h-[502px] relative shrink-0 w-[355px]" data-name="8175621 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img81756211} />
      </div>
      <div className="h-[501px] relative shrink-0 w-[354px]" data-name="8175618 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img81756181} />
      </div>
      <div className="h-[502.453px] relative shrink-0 w-[355px]" data-name="8175617 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img81756171} />
      </div>
      <div className="h-[502px] relative shrink-0 w-[354px]" data-name="8175619 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img81756191} />
      </div>
      <div className="h-[502px] relative shrink-0 w-[355px]" data-name="8175620 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img81756201} />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[100px] items-center relative shrink-0">
      <div className="h-[401px] relative shrink-0 w-[400px]" data-name="8175625 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img81756251} />
      </div>
      <div className="relative shrink-0 size-[401px]" data-name="8175618-1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img817561811} />
      </div>
      <div className="relative shrink-0 size-[401px]" data-name="8175627 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img81756271} />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[100px] items-center left-1/2 top-[254px] w-[2628px]">
      <div className="h-[890px] relative shrink-0 w-[629px]" data-name="приглашение 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img1} />
      </div>
      <Frame1 />
      <Frame2 />
      <div className="h-[352px] relative shrink-0 w-[704px]" data-name="1 923">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img1923} />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-black relative size-full">
      <Frame3 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[436px] not-italic text-[20px] text-white top-[43px] tracking-[-0.2px] w-[568px]">У ГИД есть фирменный стиль для внешних коммуникаций и оффлайн событий, а каждая версия приложения отмечается большим оффлайн мероприятием с сотнями гостей.</p>
    </div>
  );
}