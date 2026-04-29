import imgFrame2147223026 from "figma:asset/432003c659d71f49ca9b902ae734e4f8640fe8ea.png";
import imgGroup21361407671 from "figma:asset/67021368ca94ceaaf393ddf959c47ca678b4b487.png";

function Frame1() {
  return (
    <div className="-translate-x-1/2 absolute h-[404.936px] left-[calc(50%-0.25px)] top-[202.81px] w-[528px]">
      <div className="-translate-x-1/2 absolute h-[404.936px] left-1/2 top-0 w-[528px]" data-name="Group 2136140767 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGroup21361407671} />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative rounded-[8px] size-full">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgFrame2147223026} />
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Frame1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}