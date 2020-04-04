import * as React from "react";
import Slider from "react-slick";
import RoutineSliderItem from "./slider-items/routine";
import WorkoutSliderItem from "./slider-items/workout";

import * as Styles from "./slider-section.scss";

export enum ItemType {
  ROUTINE = "routine",
  WORKOUT = "workout"
}

interface SliderProps {
  title: string;
  items: Array<any>;
  type: ItemType;
}

const itemTypeToSliderItem = {
  routine: RoutineSliderItem,
  workout: WorkoutSliderItem
};

const settings = {
  dots: true,
  speed: 500,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false
      }
    }
  ]
};

const SliderSection: React.FunctionComponent<SliderProps> = ({ title, items, type }) => {
  const SliderItem = itemTypeToSliderItem[type];

  const renderItems = () => {
    if (items.length == 0) {
      return `No ${type}s found`;
    }
    return (
      <Slider {...settings}>
        {items.map(item => (
          <SliderItem item={item} key={item.id} />
        ))}
      </Slider>
    );
  };

  return (
    <div className={Styles.container}>
      <h2>{title}</h2>
      {renderItems()}
    </div>
  );
};

export default SliderSection;
