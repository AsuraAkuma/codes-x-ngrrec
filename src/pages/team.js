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

const Team = () => {
    const [sections, setSections] = useState([]);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isManager, setIsManager] = useState(false);
    let currentSection = '';

    const getSections = async () => {
        const req = await fetch(`http://localhost:5500/api/section`);
        const response = await req.json();
        if (response.success === true) {
            setSections(response.sections); // Store the sections in state
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

    const cancelSectonForm = () => {
        if (sectionFormContainer.style.display === 'flex') {
            sectionFormContainer.style.display = 'none';
            sectionForm.reset();
        }
    }
    // Show create section form
    const showSectionForm = ({ target }) => {
        if (sectionFormContainer.style.display === '' || sectionFormContainer.style.display === 'none') {
            sectionFormContainer.style.display = 'flex';
        } else {
            sectionFormContainer.style.display = 'none';
        }
        sessionStorage.setItem('currentSection', target.id);
    };
    // Create section form submission
    const createSectionForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const req = await fetch(`http://localhost:5500/api/section/create`, {
            method: 'POST',
            mode: 'cors',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                sessionKey: sessionStorage.getItem('sessionKey'),
                sectionName: formData.get('sectionName')
            })
        });
        const response = await req.json();
        if (response.success === true) {
            getSections(); // Re-fetch sections after creating a new one
            cancelSectonForm();
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
            productFormContainer.style.display = 'none';
            productForm.reset();
        }
    }
    // Show create section form
    // Create section form submission
    const createProductForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const req = await fetch(`http://localhost:5500/api/product/create`, {
            method: 'POST',
            mode: 'cors',
            // headers: { "Content-Type": 'multipart/form-data' },
            body: formData
        });
        const response = await req.json();
        if (response.success === true) {
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
            value: 'null'
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
        const fileInput = document.getElementById(`labeledInput-button-file`);
        if (target.value === "audio") {
            fileInput.accept = "audio/*"
        } else if (target.value === "video") {
            fileInput.accept = "video/*"
        } else if (target.value === "image") {
            fileInput.accept = "image/*"
        } else if (target.value === "document") {
            fileInput.accept = ".pdf, .doc, .docx, .zip, .txt"
        }
        fileInput.value = "";
    }
    // Change comment input size
    const changeSize = ({ target }) => {
        target.style.height = 'min-content';
        target.style.height = target.scrollHeight + 'px';
    }
    // Send comment
    const sendComment = async () => {
        const content = document.getElementById('content-product-comment-text');
        const req = await fetch(`http://localhost:5500/api/product/comment/create`, {
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
        const req = await fetch(`http://localhost:5500/api/login/auth?` + new URLSearchParams({ sessionKey: sessionStorage.getItem('sessionKey') }));
        const res = await req.json();
        if (res.success === true) {
            setIsManager(res.isManager);
        } else {
            console.log(res.error)
            setShowError(true);
            setErrorMessage(res.error);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 5000);
        }
    }
    useEffect(() => {
        checkIfManager();
    }, []);
    // Edit section

    return (
        <div className='body'>
            <Header />
            <div className='main'>
                <section className='sidemenu' id='sidemenu'>
                    {(isManager === true) ? <AddButton buttonId={'addButton-section'} buttonText={"Add Section"} callback={showSectionForm} /> : ''}

                    {sections.map((v) => (
                        <SectionContainer key={v._id} contents={v} isManager={isManager} />
                    ))}
                </section>
                <section className='content'>
                    <div className='content-product' id='content-product'>
                        <h2 className='content-product-header' id='content-product-header'>Section Name - Product Name</h2>
                        <p className='content-product-description' id='content-product-description'>
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Pulvinar dictum orci egestas suscipit libero ridiculus. Curae eleifend morbi netus; cursus mattis sit. Suscipit consectetur nisl nulla curae ultricies ridiculus; id penatibus ac. Laoreet primis rutrum mollis nisl class interdum vulputate. Fames odio in fringilla eros finibus sapien. Himenaeos hendrerit sem risus orci faucibus nullam. Ligula nullam pharetra fusce vel auctor, maecenas magna nec.
                        </p>
                        <div className='content-product-file' id='content-product-file'>
                            <iframe className='content-product-file-iframe' id='content-product-file-iframe' name='product-file-viewer' src='' sandbox='' scrolling="no" />
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
            </div>
            <div className='create-section' id='create-section'>
                <h2 className='create-section-header' id='create-section-header'>Create Section</h2>
                <form className='create-section-form' id='create-section-form' onSubmit={createSectionForm}>
                    <LabeledInput inputType={'text'} inputName={'sectionName'} labelText={'Section Name'} required={true} />
                    <button className='create-section-form-button' id='create-section-form-button'>Create Section</button>
                    <div className='form-cancel'>
                        <p className='form-cancel-text' onClick={cancelSectonForm}>Cancel</p>
                    </div>
                    <div className='form-delete'>
                        <p className='form-delete-text' onClick={cancelSectonForm}>Delete</p>
                    </div>
                </form>
            </div>
            <div className='create-product' id='create-product'>
                <h2 className='create-product-header'>Create Product</h2>
                <form className='create-product-form' id='create-product-form' onSubmit={createProductForm}>
                    <LabeledInput inputType={'text'} inputName={'name'} labelText={'Product Name'} required={true} />
                    <LabeledInput inputType={'textarea'} inputName={'description'} rows={5} labelText={'Product Description'} required={true} />
                    <LabeledInput inputType={'select'} inputName={'type'} labelText={'Product Type'} required={true} selectOptions={productElements} selectCallback={selectCallback} />
                    <LabeledInput inputType={'file'} inputName={'file'} labelText={'Product File'} required={true} />
                    <input type='hidden' name='section' value={currentSection} id='create-product-form-section' />
                    <input type='hidden' name='sessionKey' value={sessionStorage.getItem('sessionKey')} />
                    <button className='create-product-form-button'>Create Product</button>
                    <div className='form-cancel'>
                        <p className='form-cancel-text' onClick={cancelProductForm}>Cancel</p>
                    </div>
                </form>
            </div>
            <ErrorMessage showing={showError} message={errorMessage} />
        </div>
    );
};

export default Team;
