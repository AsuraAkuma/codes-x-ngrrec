import { useState } from 'react';
import Header from '../components/header';
import SectionContainer from '../components/SectionContainer';
import '../css/base.css';
import '../css/team.css';
import AddButton from '../components/addButton';

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
                    <AddButton buttonText={"Add Section"} />
                    {sectionComps}
                </section>
                <section className='content'>

                </section>
            </div>
        </div>
    )
};

export default Team;