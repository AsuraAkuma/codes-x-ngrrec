import Header from '../components/header';
import '../css/Home.css';
import '../css/base.css'
const Home = () => {
  return (
    <div className="home">
      <div className='divider-container'>
        <img src='/media/divider line.svg' alt='divider line' className='divider' />
      </div>
      <Header />
    </div>
  );
}

export default Home;
