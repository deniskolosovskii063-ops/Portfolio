import imgFrame21472229941 from "figma:asset/379b4c1b4d3f9c1aaa8f550d882edbbb2f63e6e3.png";
import imgFrame21472229891 from "figma:asset/73d74793fd364aef15bf004e8b0f07d7af55edf6.png";
import imgIPhone17Pro4 from "figma:asset/8fb3551320b3836712d8f844d464ce76a912e491.png";
import imgIPhone17Pro12 from "figma:asset/1e02c827ce713a51ed6ec070312b35948db67d40.png";
import imgIPhone17Pro22 from "figma:asset/a1552e9b512f32c4064a95503e74780a7eb7e8ec.png";
import imgIPhone17Pro31 from "figma:asset/b696116eb88ca54c5c7529edc95fa18f808be026.png";
import imgIPhone17Pro41 from "figma:asset/24d43030041749a1dc31092471b8e3e4c9d24783.png";
import imgIPhone17Pro3 from "figma:asset/2c5f9f56e3f559a5e12acc9f4e286492c7177246.png";

function Frame1() {
  return (
    <div className="absolute h-[1336px] left-0 top-[3577.77px] w-[1006px]">
      <div className="absolute h-[1336px] left-0 top-0 w-[1006px]" data-name="Frame 2147222994 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame21472229941} />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[869px] overflow-clip right-0 top-[3552px] w-[643px]">
      <div className="absolute h-[869px] left-[-10px] top-0 w-[680px]" data-name="Frame 2147222989 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[107.25%] left-[-4.89%] max-w-none top-0 w-[104.92%]" src={imgFrame21472229891} />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[100px] items-center relative shrink-0 w-full">
      <div className="h-[924.636px] relative shrink-0 w-[475.547px]" data-name="iPhone 17 Pro-1 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone17Pro12} />
      </div>
      <div className="h-[924.636px] relative shrink-0 w-[475.547px]" data-name="iPhone 17 Pro-2 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone17Pro22} />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[100px] items-center relative shrink-0 w-full">
      <div className="h-[924px] relative shrink-0 w-[475px]" data-name="iPhone 17 Pro-3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone17Pro31} />
      </div>
      <div className="h-[924px] relative shrink-0 w-[475px]" data-name="iPhone 17 Pro-4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone17Pro41} />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[100px] items-center left-[235px] top-[29px] w-[965px]">
      <div className="h-[989px] relative shrink-0 w-[509px]" data-name="iPhone 17 Pro 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone17Pro4} />
      </div>
      <Frame3 />
      <Frame4 />
      <div className="h-[864px] relative shrink-0 w-[444px]" data-name="iPhone 17 Pro 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone17Pro3} />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-black relative size-full">
      <Frame1 />
      <Frame2 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[436px] not-italic text-[20px] text-white top-[4955px] tracking-[-0.2px] w-[568px]">В комментариях сотрудники могут обсуждать новости, отвечать на сообщения и ставить эмодзи-реакции, что делает коммуникацию внутри каналов более живой и повышает вовлечённость.</p>
      <Frame5 />
    </div>
  );
}