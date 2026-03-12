import imgImage1091525 from "figma:asset/d7d4dcbdc8666c8ccdc838ba7d98c0a20a302c38.png";

function Frame() {
  return (
    <div className="h-[989.099px] relative shrink-0 w-[1407.952px]">
      <div className="absolute h-[989.099px] left-0 top-0 w-[1407.952px]" data-name="image 1091525">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1091525} />
      </div>
      <div className="absolute bg-gradient-to-b bottom-[-1.75px] from-[rgba(0,0,0,0)] h-[111px] left-[-0.02px] to-black w-[1408px]" />
      <div className="absolute flex h-[293px] items-center justify-center left-0 top-[-0.15px] w-[1408px]">
        <div className="flex-none rotate-180">
          <div className="bg-gradient-to-b from-[rgba(0,0,0,0)] h-[293px] to-black w-[1408px]" />
        </div>
      </div>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative size-full">
      <Frame />
    </div>
  );
}