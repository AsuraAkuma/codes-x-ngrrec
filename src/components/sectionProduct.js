import { renderToString } from 'react-dom/server';
import '../css/base.css';
import ProductComment from './comment';
import './css/sectionProduct.css';
import config from '../config.json';
const { apiURL } = config;
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
        console.log('test')
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
        const req = await fetch(`${apiURL}/api/product/info/${name}/${section}/${sessionStorage.getItem('sessionKey')}`)
        const res = await req.json();
        // Set description text
        const description = document.getElementById('content-product-description');
        description.innerHTML = `${res.description}`;
        // Reset comments
        const commentContainer = document.getElementById('content-product-comments');
        const commentInput = document.getElementById('content-product-comment-text');
        commentContainer.innerHTML = "";
        commentInput.value = "";
        // generate comments
        if (res.comments) {
            if (res.comments.length > 0) {
                const comments = res.comments.map((v, i) => <ProductComment author={v.author} timestamp={v.timestamp} content={v.content} />);
                commentContainer.innerHTML = renderToString(comments);
            }
        }
        // Set current product
        sessionStorage.setItem('currentProduct', name);
        sessionStorage.setItem('currentSection', section);
        sessionStorage.setItem('currentProductDescription', res.description);
        sessionStorage.setItem('currentProductType', res.type);
        // Set image
        const objectViewer = document.getElementById('content-product-file-objectViewer');
        const audioViewer = document.getElementById('content-product-file-audioViewer');
        const videoViewer = document.getElementById('content-product-file-videoViewer');
        const container = document.getElementById('content-product-file');
        if (type === "image") {
            const img = new Image();
            img.src = `${apiURL}/api/product/file/${name}/${section}/${sessionStorage.getItem('sessionKey')}`;
            img.onload = () => {
                // Show/hide viewers
                objectViewer.style.display = 'block';
                audioViewer.style.display = 'none';
                videoViewer.style.display = 'none';
                // Set dimensions
                objectViewer.height = img.height;
                objectViewer.width = img.width;
                container.style.height = img.height + 'px';
                objectViewer.data = img.src;
                if (objectViewer.height >= container.clientHeight && objectViewer.width >= container.clientWidth) {
                    container.style.display = '';
                    container.style.justifyContent = '';
                    container.style.alignItems = '';
                } else {
                    container.style.display = 'flex';
                    if (objectViewer.height >= container.clientHeight) {
                        container.style.justifyContent = 'center';
                    }
                    if (objectViewer.width >= container.clientWidth) {
                        container.style.alignItems = 'center';
                    }
                }
            }
        } else if (type === "document") {
            // Show/hide viewers
            objectViewer.style.display = 'block';
            audioViewer.style.display = 'none';
            videoViewer.style.display = 'none';
            objectViewer.data = `${apiURL}/api/product/file/${name}/${section}/${sessionStorage.getItem('sessionKey')}`
            objectViewer.height = '100%'
            objectViewer.width = '100%';
            container.style.height = '75%';
            container.style.overflow = 'none';
        } else if (type === "video") {
            // Show/hide viewers
            objectViewer.style.display = 'none';
            audioViewer.style.display = 'none';
            videoViewer.style.display = 'block';
            videoViewer.src = `${apiURL}/api/product/file/${name}/${section}/${sessionStorage.getItem('sessionKey')}`
            videoViewer.style.height = '100%'
            videoViewer.style.width = '100%';
            container.style.height = '75%';
            container.style.overflow = 'none';
            videoViewer.volume = 0.2;
        } else if (type === "audio") {
            // Show/hide viewers
            objectViewer.style.display = 'none';
            audioViewer.style.display = 'block';
            videoViewer.style.display = 'none';
            audioViewer.style.height = '100%'
            audioViewer.style.width = '50%';
            audioViewer.src = `${apiURL}/api/product/file/${name}/${section}/${sessionStorage.getItem('sessionKey')}`;
            container.style.height = '20%';
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
            audioViewer.volume = 0.2;
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