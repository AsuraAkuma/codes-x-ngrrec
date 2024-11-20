import { useState, useEffect } from 'react';
import Header from '../components/header';
import SectionContainer from '../components/SectionContainer';
import '../css/team.css';
import '../css/base.css';
import AddButton from '../components/addButton';
import LabeledInput from '../components/labeledInput';
import ErrorMessage from '../components/error';
import { renderToString } from 'react-dom/server';
import ProductComment from '../components/comment';
import config from '../config.json';
const { apiURL } = config;
const Team = () => {
    const [sections, setSections] = useState([]);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isManager, setIsManager] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const createContainer = document.getElementById('create-container');
    const getSections = async () => {
        const req = await fetch(`${apiURL}/api/section`);
        const response = await req.json();
        if (response.success === true) {
            setSections(response.sections.sort((a, b) => a.order - b.order)); // Store the sections in state
        } else {
            setShowError(true);
            setErrorMessage(response.error);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
        }
    };

    useEffect(() => {
        getSections(); // Fetch sections on component mount
    }, []);
    // Cancel create section form
    const sectionForm = document.getElementById('create-section-form');
    const sectionFormContainer = document.getElementById('create-section');

    const cancelSectionForm = () => {
        if (sectionFormContainer.style.display === 'flex') {
            sectionFormContainer.style.display = 'none';
            createContainer.style.display = 'none';
            sectionForm.reset();
            if (isEditing === true) {
                setIsEditing(false);
            }
        }
    }
    // Show create section form
    const showSectionForm = ({ target }) => {
        const headerText = document.getElementById('create-section-header');
        const button = document.getElementById('create-section-form-button');
        if (sectionFormContainer.style.display === '' || sectionFormContainer.style.display === 'none') {
            cancelProductForm();
            sectionFormContainer.style.display = 'flex';
            createContainer.style.display = 'flex';
            if (target.className === 'sectionContainer-edit') {
                setIsEditing(true);
            } else {
                // Change header text
                headerText.innerHTML = 'Create Section';
                // Change button text
                button.innerHTML = 'Create Section';
            }
        } else {
            if (isEditing === true) {
                cancelSectionForm();
                sectionFormContainer.style.display = 'none';
                // Change header text
                headerText.innerHTML = 'Create Section';
                // Change button text
                button.innerHTML = 'Create Section';
                showSectionForm({ target: target });
            } else {
                cancelSectionForm();
            }
        }
        sessionStorage.setItem('currentSection', target.id);
    };
    // Create section form submission
    const createSectionForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const currentSection = sessionStorage.getItem('currentSection');
        if (isEditing === true) {
            if (currentSection) {
                if (formData.get('sectionName') === currentSection) {
                    setShowError(true);
                    setErrorMessage("The name is the same");
                    setTimeout(() => {
                        setShowError(false);
                        setErrorMessage("");
                    }, 5000);
                    return;
                }
            }
        }
        const req = await fetch(`${apiURL}/api/section/${(isEditing === true) ? "edit" : "create"}`, {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                sessionKey: sessionStorage.getItem('sessionKey'),
                sectionName: formData.get('sectionName'),
                oldName: currentSection,
                newName: formData.get('sectionName')
            })
        });
        const response = await req.json();
        if (response.success === true) {
            getSections(); // Re-fetch sections after creating a new one
            cancelSectionForm();
        } else {
            setShowError(true);
            setErrorMessage(response.error);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
        }
    };
    const deleteSectionForm = async (event) => {
        event.preventDefault();
        if (!window.confirm(`Do you wish to delete the section "${sessionStorage.getItem('currentSection')}" and all products in it?`)) {
            return;
        }
        const currentSection = sessionStorage.getItem('currentSection');
        const req = await fetch(`${apiURL}/api/section/delete`, {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                sessionKey: sessionStorage.getItem('sessionKey'),
                target: currentSection
            })
        });
        const response = await req.json();
        if (response.success === true) {
            getSections(); // Re-fetch sections after creating a new one
            cancelSectionForm();
        } else {
            setShowError(true);
            setErrorMessage(response.error);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
        }
    };

    // Cancel create section form
    const productForm = document.getElementById('create-product-form');
    const productFormContainer = document.getElementById('create-product');

    const cancelProductForm = () => {
        if (productFormContainer.style.display === 'flex') {
            const textArea = document.getElementById('labeledInput-input-productDescription')
            productFormContainer.style.display = 'none';
            createContainer.style.display = 'none';
            const productHeader = document.getElementById('create-product-header');
            const productButton = document.getElementById('create-product-form-button');
            productHeader.innerHTML = "Create Product";
            productButton.innerHTML = "Create Product";
            textArea.style.height = 'min-content';
            productForm.reset();
            if (isEditing === true) {
                setIsEditing(false);
            }
        }
    }
    // Show create section form
    // Create section form submission
    const createProductForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if (formData.get('productFile').size > 5000 * 1024 * 1024) {
            setShowError(true);
            setErrorMessage("File size too big, must be under 5Gb");
            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
            return;
        }
        formData.append('target', sessionStorage.getItem('currentProduct'));
        const req = await fetch(`${apiURL}/api/product/${(isEditing === true) ? "edit" : "create"}`, {
            method: 'POST',
            mode: 'cors',
            // headers: { "Content-Type": 'multipart/form-data' },
            body: formData
        });
        const response = await req.json();
        if (response.success === true) {
            getSections(); // Re-fetch sections after creating a new one
            const productContainer = document.getElementById('content-product');
            productContainer.style.display = 'none';
            const name = formData.get('productName');
            const section = formData.get('section');
            const type = formData.get('productType');
            // Set header text
            const header = document.getElementById('content-product-header');
            header.innerHTML = `${section} - ${name}`;
            // Set description text
            const description = document.getElementById('content-product-description');
            description.innerHTML = formData.get('productDescription');
            sessionStorage.setItem('currentProduct', name);
            sessionStorage.setItem('currentSection', section);
            sessionStorage.setItem('currentProductDescription', formData.get('productDescription'));
            sessionStorage.setItem('currentProductType', type);
            if (formData.get('productFile').size > 0) {
                // Set image
                const objectViewer = document.getElementById('content-product-file-objectViewer');
                const container = document.getElementById('content-product-file');
                if (type === "image") {
                    const img = new Image();
                    img.src = `${apiURL}/api/product/file/${name}/${section}/${sessionStorage.getItem('sessionKey')}`;
                    img.onload = () => {
                        objectViewer.height = img.height;
                        objectViewer.width = img.width;
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
                    objectViewer.data = `${apiURL}/api/product/file/${name}/${section}/${sessionStorage.getItem('sessionKey')}`
                    objectViewer.height = '100%';
                    objectViewer.width = '100%';
                    container.style.height = '75%';
                } else if (type === "audio") {
                    objectViewer.data = `${apiURL}/api/product/file/${name}/${section}/${sessionStorage.getItem('sessionKey')}`;
                    container.style.display = 'flex';
                    container.style.justifyContent = 'center';
                    container.style.alignItems = 'center';
                }
            }
            cancelProductForm();
        } else {
            setShowError(true);
            setErrorMessage(response.error);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
        }
    };
    // Delete section form submission
    const deleteProductForm = async (event) => {
        event.preventDefault();
        if (!window.confirm(`Do you wish to delete the product "${sessionStorage.getItem('currentProduct')}"?`)) {
            return;
        }
        const req = await fetch(`${apiURL}/api/product/delete`, {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                sessionKey: sessionStorage.getItem('sessionKey'),
                section: sessionStorage.getItem('currentSection'),
                product: sessionStorage.getItem('currentProduct')
            })
        });
        const response = await req.json();
        if (response.success === true) {
            const productContainer = document.getElementById('content-product');
            productContainer.style.display = 'none';
            getSections(); // Re-fetch sections after creating a new one
            cancelProductForm();
        } else {
            setShowError(true);
            setErrorMessage(response.error);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
        }
    };

    // Product Types
    const productTypes = [
        {
            name: 'Select a Type',
            value: ''
        },
        {
            name: 'Image',
            value: 'image'
        },
        {
            name: 'Video',
            value: 'video'
        },
        {
            name: 'Document',
            value: 'document'
        },
        {
            name: 'Audio',
            value: 'audio'
        }
    ];
    const productElements = productTypes.map((v, i) => <option key={v.value} value={v.value}>{v.name}</option>);
    // Select callback
    const selectCallback = ({ target }) => {
        const fileInput = document.getElementById(`labeledInput-input-productFile`);
        if (target.value === "audio") {
            fileInput.accept = "audio/*"
        } else if (target.value === "video") {
            fileInput.accept = "video/*"
        } else if (target.value === "image") {
            fileInput.accept = "image/*"
        } else if (target.value === "document") {
            fileInput.accept = ".pdf, .txt"
        }
        fileInput.value = "";
    }
    // Change textarea input size
    const changeSize = ({ target }) => {
        const targetElement = document.getElementById(target.id);
        const mainDiv = document.getElementById('main');
        targetElement.style.height = 'min-content';
        if (targetElement.scrollHeight < mainDiv.clientHeight * .25) {
            targetElement.style.height = targetElement.scrollHeight + 'px';
        }
        if (targetElement.scrollHeight >= mainDiv.clientHeight * .25) {
            targetElement.style.height = mainDiv.clientHeight * .25 + 'px';
        }
    }

    // Send comment
    const sendComment = async () => {
        // Check if signed in
        if (!sessionStorage.getItem('sessionKey')) {
            setShowError(true);
            setErrorMessage("You must be signed in to send a comment");
            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
            return;
        }
        const content = document.getElementById('content-product-comment-text');
        const req = await fetch(`${apiURL}/api/product/comment/create`, {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                sessionKey: sessionStorage.getItem('sessionKey'),
                content: content.value,
                section: sessionStorage.getItem('currentSection'),
                product: sessionStorage.getItem('currentProduct')
            })
        });
        const response = await req.json();
        if (response.success === true) {
            content.value = "";
            changeSize({ target: content });
            const commentContainer = document.getElementById('content-product-comments');
            commentContainer.innerHTML = `${renderToString(<ProductComment author={response.comment.author} timestamp={response.comment.timestamp} content={response.comment.content} />)}\n${commentContainer.innerHTML}`
        } else {
            setShowError(true);
            setErrorMessage(response.error);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
        }
    }

    // handle comment
    const postComment = (event) => {
        const content = document.getElementById('content-product-comment-text');
        if (event.target.id === 'content-product-comment-text' && event.type === 'keydown' && event.key === 'Enter') {
            event.preventDefault();
            if (content.value === '') {
                return;
            }
            sendComment();
        } else if (event.target.id === 'content-product-comment-send' && event.type === 'click') {
            if (content.value === '') {
                return;
            }
            sendComment();
        }
    }
    // Check if isManager
    const checkIfManager = async () => {
        const req = await fetch(`${apiURL}/api/login/auth?` + new URLSearchParams({ sessionKey: sessionStorage.getItem('sessionKey') }));
        const res = await req.json();
        if (res.success === true) {
            setIsManager(res.isManager);
        } else {
            setShowError(true);
            setErrorMessage(res.error);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem('sessionKey')) {
            checkIfManager();
        }
    }, []);
    // Edit product
    const showProductForm = ({ target }) => {
        const productContainer = document.getElementById('create-product');
        const productHeader = document.getElementById('create-product-header');
        const productButton = document.getElementById('create-product-form-button');
        if (productContainer.style.display === '' || productContainer.style.display === 'none') {
            productContainer.style.display = 'flex';
            createContainer.style.display = 'flex';
            cancelSectionForm();
            const headerText = document.getElementById('create-section-header');
            const button = document.getElementById('create-section-form-button');
            // Change header text
            headerText.innerHTML = 'Create Section';
            // Change button text
            button.innerHTML = 'Create Section';
            if (target.className === "content-product-edit") {
                productHeader.innerHTML = "Edit Product";
                productButton.innerHTML = "Submit";
                setIsEditing(true);
                // Get inputs and prefill values
                const name = document.getElementById('labeledInput-input-productName');
                const description = document.getElementById('labeledInput-input-productDescription');
                const type = document.getElementById('labeledInput-input-productType');
                name.value = sessionStorage.getItem('currentProduct');
                description.value = sessionStorage.getItem('currentProductDescription');
                type.value = sessionStorage.getItem('currentProductType');
                // Un require file
                const fileInput = document.getElementById('labeledInput-input-productFile');
                fileInput.required = false;
            }
        } else {
            productContainer.style.display = 'none';
            cancelProductForm();
        }
    };
    const editButton = (
        <div className='content-product-edit-container'>
            <button className='content-product-edit' id={'content-product-edit'} onClick={showProductForm}>Edit</button>
        </div>
    )

    // Handle sidemenu click
    const image = document.getElementById('sidemenu-toggle-image');
    const toggle = document.getElementById('sidemenu-toggle');
    const sidemenu = document.getElementById('sidemenu')
    const sideMenuClick = () => {
        if (sidemenu.style.display === '' || sidemenu.style.display === 'none') {
            toggle.style.left = '70%';
            image.style.transform = 'rotate(180deg)';
            sidemenu.style.display = 'block';
        } else {
            toggle.style.left = '0%';
            image.style.transform = 'rotate(0deg)';
            sidemenu.style.display = 'none';
        }
    }
    // Listen for resize
    const mainResize = () => {
        const mainDiv = document.getElementById('main');
        const sidemenu = document.getElementById('sidemenu');
        const toggle = document.getElementById('sidemenu-toggle');
        if (mainDiv.clientWidth >= 600 && sidemenu.style.display === 'none') {
            sidemenu.style.display = 'block';
        }
        if (mainDiv.clientWidth < 600 && (toggle.style.left === '' || toggle.style.left === '0%')) {
            sidemenu.style.display = 'none';
        }
    };
    window.addEventListener('resize', mainResize);

    return (
        <div className='body'>
            <Header />
            <div className='main' id='main'>
                <div className='sidemenu-toggle' id='sidemenu-toggle' >
                    <img className='sidemenu-toggle-image' id='sidemenu-toggle-image' src='/media/arrow-right-solid.svg' alt='sidemenu arrow' />
                    <div className='sidemenu-toggle-cover' onClick={sideMenuClick}></div>
                </div>
                <section className='sidemenu' id='sidemenu'>
                    {(isManager === true) ? <AddButton buttonId={'addButton-section'} buttonText={"Add Section"} callback={showSectionForm} /> : ''}

                    {sections.map((v) => (
                        <SectionContainer key={v.name} contents={v} isManager={isManager} isEditing={isEditing} setEdit={setIsEditing} cancelProduct={cancelProductForm} cancelSection={cancelSectionForm} />
                    ))}
                </section>
                <section className='content'>
                    <div className='content-background'>
                    </div>
                    <div className='content-image-center' id="content-image-center">
                        <img className='content-background-image' src='/media/cropped-Artboard-1-1.png' alt='codes logo' id='content-background-image-codes' />
                    </div>
                    <div className='content-product' id='content-product'>
                        <h2 className='content-product-header' id='content-product-header'>Section Name - Product Name</h2>
                        {(isManager === true) ? editButton : ""}
                        <p className='content-product-description' id='content-product-description'>
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Pulvinar dictum orci egestas suscipit libero ridiculus. Curae eleifend morbi netus; cursus mattis sit. Suscipit consectetur nisl nulla curae ultricies ridiculus; id penatibus ac. Laoreet primis rutrum mollis nisl class interdum vulputate. Fames odio in fringilla eros finibus sapien. Himenaeos hendrerit sem risus orci faucibus nullam. Ligula nullam pharetra fusce vel auctor, maecenas magna nec.
                        </p>
                        <div className='content-product-file' id='content-product-file'>
                            {/* <objectViewer className='content-product-file-objectViewer' id='content-product-file-objectViewer' title='product-file-viewer' src='' sandbox='' scrolling="no" /> */}
                            <audio className='content-product-file-objectViewer' id='content-product-file-audioViewer' src='' autoPlay={false} controls />
                            <video className='content-product-file-objectViewer' id='content-product-file-videoViewer' src='' autoPlay={false} controls />
                            <object className='content-product-file-objectViewer' id='content-product-file-objectViewer' type="" data='' ></object>
                        </div>
                        <div className='content-product-comment'>
                            <div className='content-product-comment-send-container'>
                                <img className='content-product-comment-send' id='content-product-comment-send' src='media/paper-plane-solid.svg' onClick={postComment} />
                            </div>
                            <textarea className='content-product-comment-text' id='content-product-comment-text' onInput={changeSize} placeholder='Post a comment - Must be signed in' onKeyDown={postComment}></textarea>
                        </div>
                        <div className='content-product-comments' id='content-product-comments'>
                        </div>
                    </div>
                </section>
                <div className='create-container' id='create-container'>
                    <div className='create-section' id='create-section'>
                        <h2 className='create-section-header' id='create-section-header'>Create Section</h2>
                        <form className='create-section-form' id='create-section-form' onSubmit={createSectionForm}>
                            <LabeledInput inputType={'text'} inputName={'sectionName'} labelText={'Section Name'} required={true} />
                            <button className='create-section-form-button' id='create-section-form-button'>Create Section</button>
                            <div className='form-cancel'>
                                <p className='form-cancel-text' onClick={cancelSectionForm}>Cancel</p>
                            </div>
                            {(isEditing === true) ? (
                                <div className='form-delete'>
                                    <p className='form-delete-text' onClick={deleteSectionForm}>Delete</p>
                                </div>
                            ) : ''}
                        </form>
                    </div>
                    <div className='create-product' id='create-product'>
                        <h2 className='create-product-header' id='create-product-header'>Create Product</h2>
                        <form className='create-product-form' id='create-product-form' onSubmit={createProductForm}>
                            <LabeledInput inputType={'text'} inputName={'productName'} labelText={'Product Name'} required={true} />
                            <LabeledInput inputType={'textarea'} rows={1} inputName={'productDescription'} labelText={'Product Description'} required={true} />
                            <LabeledInput inputType={'select'} inputName={'productType'} labelText={'Product Type'} required={true} selectOptions={productElements} selectCallback={selectCallback} />
                            <LabeledInput inputType={'file'} inputName={'productFile'} labelText={'Product File'} required={true} />
                            <input type='hidden' name='section' value={(sessionStorage.getItem('currentSection')) ? sessionStorage.getItem('currentSection') : ""} id='create-product-form-section' />
                            <input type='hidden' name='sessionKey' value={(sessionStorage.getItem('sessionKey')) ? sessionStorage.getItem('sessionKey') : ""} />
                            <button className='create-product-form-button' id='create-product-form-button'>Create Product</button>
                            <div className='form-cancel'>
                                <p className='form-cancel-text' onClick={cancelProductForm}>Cancel</p>
                            </div>
                            {(isEditing === true) ? (
                                <div className='form-delete'>
                                    <p className='form-delete-text' onClick={deleteProductForm}>Delete</p>
                                </div>
                            ) : ''}
                        </form>
                    </div>
                </div>
            </div>
            <ErrorMessage showing={showError} message={errorMessage} />
        </div>
    );
};

export default Team;
