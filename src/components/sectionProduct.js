import '../css/base.css';
import './css/sectionProduct.css';

const SectionProduct = ({ name, type }) => {
    let image;
    switch (type) {
        case 'image':
            image = './media/image-solid.svg';
            break;
        case 'document':
            image = './media/image-solid.svg';
            break;
        case 'video':
            image = './media/image-solid.svg';
            break;
        case 'audio':
            image = './media/image-solid.svg';
            break;
        case 'pdf':
            image = './media/image-solid.svg';
            break;

        default:
            image = './media/image-solid.svg'; //make document image
            break;
    }
    return (
        <div className='sectionProduct'>
            <img className='sectionProduct-image1' src={image} alt='file-type' />
            <div className='sectionProduct-name'>
                <p className='sectionProduct-name-text'>{name}</p>
            </div>
            <img className='sectionProduct-image2' src='/media/arrow-right-solid.svg' alt='arrow pointing right' />
            <div className='sectionProduct-mask'></div>
        </div>
    )
};
export default SectionProduct;