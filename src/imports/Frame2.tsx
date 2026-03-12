import imgImage1091526 from "figma:asset/e52676864f1c47149204f1d37c3f696bb23e32d9.png";
import imgIPhone17Pro from "figma:asset/cea26a6e715fc266e545b9879e44a215eaa40adb.png";
import imgIPhone17ProDeepBluePortrait from "figma:asset/9e265e8f1770dccf1d30ddd1d413054684abb33d.png";
import imgIPhone17Pro1 from "figma:asset/2e87fd02959df06a560dc2e4c2a22125121b493e.png";

export default function Frame() {
  return (
    <div className="bg-black border border-[rgba(0,0,0,0.1)] border-solid overflow-clip relative rounded-[2px] size-full">
      <div className="absolute h-[1088px] left-[-1px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] top-[115.44px] w-[1444px]" data-name="image 1091526">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1091526} />
      </div>
      <div className="absolute h-[799.117px] left-[303.44px] rounded-[30px] shadow-[0px_14.629px_29.258px_0px_rgba(12,12,13,0.4)] top-[1153.44px] w-[367.557px]" data-name="iPhone 17 Pro">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[30px] size-full" src={imgIPhone17Pro} />
        <div className="absolute h-[841.176px] left-[-21.94px] top-[-21.03px] w-[411.445px]" data-name="iPhone 17 Pro - Deep Blue - Portrait">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone17ProDeepBluePortrait} />
        </div>
      </div>
      <div className="absolute h-[799.117px] left-[771px] rounded-[30px] shadow-[0px_14.629px_29.258px_0px_rgba(12,12,13,0.4)] top-[1153.44px] w-[367.557px]" data-name="iPhone 17 Pro">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[30px] size-full" src={imgIPhone17Pro1} />
        <div className="absolute h-[841.176px] left-[-21.94px] top-[-21.03px] w-[411.445px]" data-name="iPhone 17 Pro - Deep Blue - Portrait">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone17ProDeepBluePortrait} />
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[437px] not-italic text-[20px] text-white top-[-0.56px] tracking-[-0.2px] w-[568px]">В приложении ГИД есть сервис новостей, где в одной ленте объединяются новости компании, материалы редакции и мировые новости из открытых источников. Контент агрегируется и персонализируется с помощью рекомендательной системы на основе дата-решений ГИД, формируя для каждого пользователя актуальную новостную ленту.</p>
    </div>
  );
}