import './css/sectionContainer.css';
import '../css/base.css';
import { useState } from 'react';
import SectionProduct from './sectionProduct';
import AddButton from './addButton';

const SectionContainer = ({ contents, isManager }) => {
    let productComps = contents.products.map((v, i) => <SectionProduct name={v.name} type={v.type} key={v.name} section={contents._id} />);
    // Show product creation form
    const showProductForm = () => {
        const productContainer = document.getElementById('create-product');
        if (productContainer.style.display === '' || productContainer.style.display === 'none') {
            productContainer.style.display = 'flex';
        } else {
            productContainer.style.display = 'none';
        }
        const sectionInput = document.getElementById('create-product-form-section');
        sectionInput.value = contents._id;
    };
    // Show create section form
    const sectionFormContainer = document.getElementById('create-section');
    const showSectionForm = () => {
        if (sectionFormContainer.style.display === '' || sectionFormContainer.style.display === 'none') {
            sectionFormContainer.style.display = 'flex';
        } else {
            sectionFormContainer.style.display = 'none';
        }
        sessionStorage.setItem('currentSection', target.id);
    };

    const buttonId = `addButton-section-${contents._id}`;
    const editButton = (
        <button className='sectionContainer-edit' onClick={showSectionForm}>Edit Section</button>
    )
    return (
        <div className='sectionContainer'>
            <div className='sectionContainer-header'>
                <h2 className='sectionContainer-header-text'>
                    {contents._id}
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