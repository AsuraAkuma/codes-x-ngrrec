import { useState } from 'react';
import Header from '../components/header';
import SectionContainer from '../components/SectionContainer';
import '../css/base.css';
import '../css/team.css';

const Team = () => {
    const [sections, setSections] = useState([
        {
            name: 'History of NGRREC',
            products: [
                {
                    name: 'test product1',
                    type: 'document',
                    url: './media/Star 1.svg'
                },
                {
                    name: 'test product2 suhdoi aiushdo ausod',
                    type: 'document',
                    url: './media/Star 1.svg'
                },
                {
                    name: 'test product3',
                    type: 'document',
                    url: './media/Star 1.svg'
                },
                {
                    name: 'test product4',
                    type: 'document',
                    url: './media/Star 1.svg'
                }
            ]
        }
    ]);
    const [sectionComps, setSectionComps] = useState(sections.map((v, i) => <SectionContainer key={v.name} contents={v} />));

    return (
        <div className='body'>
            <Header />
            <div className='main'>
                <section className='sidemenu'>
                    <div className='sidemenu-button-container'>
                        <img src='./media/'></img>
                        {/* image before and after button text */}
                    </div>
                    <button className='sidemenu-button' id='add-section'>Add Section</button>
                    {sectionComps}
                </section>
                <section className='content'>

                </section>
            </div>
        </div>
    )
};

export default Team;