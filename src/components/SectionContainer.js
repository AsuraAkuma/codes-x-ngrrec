import './css/sectionContainer.css';
import '../css/base.css';
import { useState } from 'react';
import SectionProduct from './sectionProduct';

const SectionContainer = (props) => {
    const [products, setProducts] = useState(props.contents.products);
    const [productComps, setProductComps] = useState([]);
    products.forEach((product) => {
        productComps.push(<SectionProduct name={product.name} type={product.type} />);
    })
    return (
        <div className='sectionContainer'>
            <div className='sectionContainer-header'>
                <h2 className='sectionContainer-header-text'>
                    {props.contents.name}
                </h2>
                <img src='./media/Polygon 5.svg' alt='arrow' className='sectionContainer-header-arrow2' />
                <img src='./media/Polygon 5.svg' alt='arrow' className='sectionContainer-header-arrow' />
            </div>
            <div className='sectionContainer-contents'>
                {productComps}
            </div>
        </div>
    )
};
export default SectionContainer;