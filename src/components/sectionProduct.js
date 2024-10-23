import { renderToString } from 'react-dom/server';
import '../css/base.css';
import ProductComment from './comment';
import './css/sectionProduct.css';

const SectionProduct = ({ name, type, section, cancelSection, cancelProduct }) => {
    const createContainer = document.getElementById('create-container');
    let image;
    switch (type) {
        case 'image':
            image = './media/image-solid.svg';
            break;
        case 'document':
            image = './media/file-solid.svg';
            break;
        case 'video':
            image = './media/video-solid.svg';
            break;
        case 'audio':
            image = './media/file-audio-solid.svg';
            break;
        default:
            image = './media/file-solid.svg'; //make document image
            break;
    }

    // Show product container
    const showProduct = async () => {
        cancelSection();
        cancelProduct();
        // Hide create-container
        createContainer.style.display = 'none';
        // Show product section
        const productContainer = document.getElementById('content-product');
        productContainer.style.display = 'block';
        // Set header text
        const header = document.getElementById('content-product-header');
        header.innerHTML = `${section} - ${name}`;
        // Get product info
        const req = await fetch(`http://localhost:5500/api/product/info/${name}/${section}/${sessionStorage.getItem('sessionKey')}`)
        const res = await req.json();
        // Set description text
        const description = document.getElementById('content-product-description');
        description.innerHTML = `${res.description}`;
        // Reset comments
        const commentContainer = document.getElementById('content-product-comments');
        commentContainer.innerHTML = "";
        // generate comments
        if (res.comments.length > 0) {
            const comments = res.comments.map((v, i) => <ProductComment author={v.author} timestamp={v.timestamp} content={v.content} />);
            commentContainer.innerHTML = renderToString(comments);
        }
        // Set current product
        sessionStorage.setItem('currentProduct', name);
        sessionStorage.setItem('currentSection', section);
        sessionStorage.setItem('currentProductDescription', res.description);
        sessionStorage.setItem('currentProductType', res.type);
        // Set image
        const objectViewer = document.getElementById('content-product-file-objectViewer');
        const container = document.getElementById('content-product-file');
        if (type === "image") {
            const img = new Image();
            img.src = `http://localhost:5500/api/product/file/${name}/${section}/${sessionStorage.getItem('sessionKey')}`;
            img.onload = () => {
                objectViewer.height = img.height;
                objectViewer.width = img.width;
                container.style.height = img.height + 'px';
                objectViewer.data = img.src;
                if (objectViewer.height > container.clientHeight || objectViewer.width > container.clientWidth) {
                    container.style.display = '';
                    container.style.justifyContent = '';
                    container.style.alignItems = '';
                } else {
                    container.style.display = 'flex';
                    container.style.justifyContent = 'center';
                    container.style.alignItems = 'center';
                }
            }
        } else if (type === "document" || type === "video") {
            // objectViewer.data = `http://localhost:5500/api/product/file/${name}/${section}/${sessionStorage.getItem('sessionKey')}`
            console.log(objectViewer.height)
            // objectViewer.height = objectViewer.scrollTop + 'px';
            // objectViewer.style.height = '100%'
            objectViewer.scroll(0, 50)
            objectViewer.width = '100%';
            container.style.height = '75%';
        } else if (type === "audio") {
            objectViewer.data = `http://localhost:5500/api/product/file/${name}/${section}/${sessionStorage.getItem('sessionKey')}`;
        }
    }
    return (
        <div className='sectionProduct' onClick={showProduct}>
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