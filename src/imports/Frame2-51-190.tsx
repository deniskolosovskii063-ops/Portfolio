import imgPhotoOf35YearOldEuropeanWhiteWomanStandingInTheOfficeHoldingDocumentsWearingOrangeSweatshirtSharpFocusAndHighResolutionMinimalistCompositionBlueDetailsProfessionalAndModernAestheticRealisticPhotography from "figma:asset/c0e67e287838f98f5874e0a03a5305ed300b944b.png";
import imgIPhone17Pro2 from "figma:asset/dc33a1613b8653cb174a8215a28bc02990404edb.png";

function Frame1() {
  return (
    <div className="absolute h-[963px] left-[221px] overflow-clip top-[-1px] w-[642px]">
      <div className="absolute h-[963px] left-0 top-0 w-[642px]" data-name="Photo_of_35-year-old_european_white_woman_standing_in_the_office,_holding_documents,_wearing_orange_sweatshirt,_sharp_focus_and_high_resolution,_minimalist_composition,_blue_details,_professional_and_modern_aesthetic,_realistic__photography">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPhotoOf35YearOldEuropeanWhiteWomanStandingInTheOfficeHoldingDocumentsWearingOrangeSweatshirtSharpFocusAndHighResolutionMinimalistCompositionBlueDetailsProfessionalAndModernAestheticRealisticPhotography} />
      </div>
      <div className="-translate-x-1/2 absolute bg-gradient-to-b bottom-[-27.61px] from-[rgba(0,0,0,0)] h-[111px] left-[calc(50%+0.05px)] to-black w-[1030px]" />
      <div className="-translate-y-1/2 absolute flex h-[1030px] items-center justify-center left-[0.05px] top-[calc(50%+0.11px)] w-[111px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="bg-gradient-to-b from-[rgba(0,0,0,0)] h-[111px] to-black w-[1030px]" />
        </div>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-black border border-[rgba(0,0,0,0.1)] border-solid overflow-clip relative rounded-[2px] size-full">
      <Frame1 />
      <div className="absolute h-[837px] left-[803px] top-[125px] w-[409px]" data-name="iPhone 17 Pro 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone17Pro2} />
      </div>
    </div>
  );
}