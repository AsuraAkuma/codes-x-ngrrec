import '../css/base.css';
import './css/sectionProduct.css';

const SectionProduct = () => {

    return (
        <div className='sectionProduct'>
            <img className='sectionProduct-image1' src='/media/image-solid.svg' alt='file-type' />
            <div className='sectionProduct-name'>
                <p className='sectionProduct-name-text'>Product Name</p>
            </div>
            <img className='sectionProduct-image2' src='/media/arrow-right-solid.svg' alt='arrow pointing right' />
        </div>
    )
};
export default SectionProduct;