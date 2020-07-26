import React from 'react'
import Item from './Item'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
interface CarouselListItemProps {
  items: Array<any>
}

export default class ItemList extends React.Component<CarouselListItemProps> {
  constructor(props: CarouselListItemProps) {
    super(props)
  }
  render() {
    const { items } = this.props
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 10,
      },
      desktop: {
        breakpoint: { max: 1500, min: 1024 },
        items: 6,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    }
    return (
      <Carousel responsive={responsive} infinite={true} itemClass="item-class">
        {items.map(item => (
          <Item item={item} key={item.id}></Item>
        ))}
      </Carousel>
    )
  }
}
