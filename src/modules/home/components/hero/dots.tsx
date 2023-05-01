import React from "react"
import clsx from "clsx";

type Props = {
  itemsLength: number;
  selectedIndex: number;
  scrollTo: (index: number) => void;
};
const Dots: React.FC<Props> = ({ itemsLength, selectedIndex, scrollTo }) => {
  const arr = new Array(itemsLength).fill(0);
  return (
    <div className="flex gap-3 justify-center -translate-y-5">
      {arr.map((_, index) => {
        const selected = index === selectedIndex;
        return (
          <div
            className={clsx({
              "h-2 w-2 rounded-full transition-all duration-300 bg-gray-400 cursor-pointer":
                true,
              // tune down the opacity if slide is not selected
              "opacity-40": !selected,
            })}
            key={index}
            onClick={() => scrollTo(index)}
          ></div>
        );
      })}
    </div>
  );
};
export default Dots;
