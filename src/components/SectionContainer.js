import './css/sectionContainer.css';
import '../css/base.css';
import { useState } from 'react';
import SectionProduct from './sectionProduct';
import AddButton from './addButton';

const SectionContainer = ({ contents, isManager, setEdit, isEditing, cancelSection, cancelProduct }) => {
    let productComps = contents.products.map((v, i) => <SectionProduct name={v.name} type={v.type} key={v.name} section={contents.name} cancelProduct={cancelProduct} cancelSection={cancelSection} />);
    const createContainer = document.getElementById('create-container');
    // Cancel create section form
    const productForm = document.getElementById('create-product-form');
    const productFormContainer = document.getElementById('create-product');

    const cancelProductForm = () => {
        if (productFormContainer.style.display === 'flex') {
            productFormContainer.style.display = 'none';
            createContainer.style.display = 'none';
            productForm.reset();
            if (isEditing === true) {
                setEdit(false);
            }
        }
    }
    // Cancel create section form
    const sectionForm = document.getElementById('create-section-form');
    const sectionFormContainer = document.getElementById('create-section');

    const cancelSectionForm = () => {
        if (sectionFormContainer.style.display === 'flex') {
            const headerText = document.getElementById('create-section-header');
            const button = document.getElementById('create-section-form-button');
            // Change header text
            headerText.innerHTML = 'Create Section';
            // Change button text
            button.innerHTML = 'Create Section';
            sectionFormContainer.style.display = 'none';
            createContainer.style.display = 'none';
            sectionForm.reset();
            if (isEditing === true) {
                setEdit(false);
            }
        }
    }

    // Show product creation form
    const showProductForm = () => {
        const productContainer = document.getElementById('create-product');
        if (productContainer.style.display === '' || productContainer.style.display === 'none') {
            cancelSectionForm();
            productContainer.style.display = 'flex';
            createContainer.style.display = 'flex';
            const headerText = document.getElementById('create-section-header');
            const button = document.getElementById('create-section-form-button');
            // Change header text
            headerText.innerHTML = 'Create Section';
            // Change button text
            button.innerHTML = 'Create Section';
        } else {
            productContainer.style.display = 'none';
            cancelProductForm();
        }
        const sectionInput = document.getElementById('create-product-form-section');
        sectionInput.value = contents.name;
        sessionStorage.setItem('currentSection', contents.name);
    };
    // Show create section form
    const showSectionForm = ({ target }) => {
        const headerText = document.getElementById('create-section-header');
        const button = document.getElementById('create-section-form-button');
        const input = document.getElementById('labeledInput-input-sectionName');
        if (sectionFormContainer.style.display === '' || sectionFormContainer.style.display === 'none') {
            sectionFormContainer.style.display = 'flex';
            createContainer.style.display = 'flex';
            cancelProductForm();
            if (target.className === 'sectionContainer-edit') {
                setEdit(true);
                // Change header text
                headerText.innerHTML = 'Edit Section';
                // Change button text
                button.innerHTML = 'Submit';
                // Prefill section name
                input.value = target.id;
            }
        } else {
            if (isEditing === true) {
                // Change header text
                headerText.innerHTML = 'Create Section';
                // Change button text
                button.innerHTML = 'Create Section';
            } else {
                // Change header text
                headerText.innerHTML = 'Edit Section';
                // Change button text
                button.innerHTML = 'Submit';
                // Prefill section name
                input.value = target.id;
            }
            if (target.className !== 'sectionContainer-edit') {
                sectionFormContainer.style.display = 'none';
            } else {
                if (isEditing === true) {
                    setEdit(false);
                } else {
                    setEdit(true);
                }
            }
        }
        sessionStorage.setItem('currentSection', target.id);
    };

    const buttonId = `addButton-section-${contents.name}`;
    const editButton = (
        <button className='sectionContainer-edit' id={contents.name} onClick={showSectionForm}>Edit Section</button>
    )
    return (
        <div className='sectionContainer' >
            <div className='sectionContainer-header'>
                <h2 className='sectionContainer-header-text'>
                    {contents.name}
                </h2>
                {/* <img src='./media/Polygon 5.svg' alt='arrow' className='sectionContainer-header-arrow2' />
                <img src='./media/Polygon 5.svg' alt='arrow' className='sectionContainer-header-arrow' /> */}
            </div>
            {(isManager === true) ? editButton : ''}
            {(isManager === true) ? <AddButton buttonId={buttonId} buttonText={"Add Product"} callback={showProductForm} /> : ''}

            <div className='sectionContainer-contents'>
                {productComps}
            </div>
        </div>
    )
};
export default SectionContainer;