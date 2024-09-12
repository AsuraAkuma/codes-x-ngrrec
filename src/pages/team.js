import Header from '../components/header';
import SectionProduct from '../components/sectionProduct';
import '../css/base.css';
import '../css/team.css';

const Team = () => {

    return (
        <div className='body'>
            <Header />
            <div className='main'>
                <section className='sidemenu'>
                    <section className='sidemenu-section'>
                        <SectionProduct />
                    </section>
                </section>
                <section className='content'>

                </section>
            </div>
        </div>
    )
};

export default Team;