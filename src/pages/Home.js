import Header from '../components/header';
import '../css/Home.css';
import '../css/base.css'
const Home = () => {
  // Handle click event for buttons
  const handleClick = (event) => {
    // Get id of element
    const targetId = event.target.id;
    // Check if targetId is valid if true procede to page, else return
    if (targetId === "team-1") {
      window.location.pathname = "/team";
    } else if (targetId === "team-2") {
      window.location.href = ""; //Girls site link
    } else if (targetId === "sign-in") {
      //sign in link
      console.log(window.location.origin);
      if (window.location.origin == "http://localhost:3001") {
        window.location.pathname = "/signin";
      } else {
        window.location.href = "";

      }
    } else {
      return;
    }
  };
  return (
    <div className="body">
      {/* Divider line */}
      <div className='divider-container'>
        <img src='/media/divider line.svg' alt='divider line' className='divider' />
      </div>
      <Header />
      {/* Container for teams */}
      <section className='teams'>
        {/* Team 1 container */}
        <section className='teams-container'>
          {/* Image */}
          <div className='teams-container-image'>
            <img src='/media/mars-solid.svg' className='teams-container-image-content' alt='Mars sign for male' />
          </div>
          {/* Team name */}
          <div className='teams-container-sub'>
            <h2 className='teams-container-sub-team'>Team 1</h2>
          </div>
          {/* Focus */}
          <div className='teams-container-sub'>
            <p className='teams-container-sub-focus'>Focusing on ...</p>
          </div>
          {/* Button */}
          <div className='teams-container-sub'>
            <button className='teams-container-sub-button' id='team-1' onClick={handleClick}>Explore</button>
          </div>
          {/* Shapes */}
          <img src='/media/Polygon 1.svg' className='teams-container-shape' id='teams-container-shape-1' alt='shape with green glow' />
          <img src='/media/Polygon 2.svg' className='teams-container-shape' id='teams-container-shape-2' alt='shape with green glow' />
          <img src='/media/Polygon 3.svg' className='teams-container-shape' id='teams-container-shape-3' alt='shape with green glow' />
          <img src='/media/Polygon 4.svg' className='teams-container-shape' id='teams-container-shape-4' alt='shape with green glow' />
        </section>
        {/* Team 2 container */}
        <section className='teams-container'>
          {/* Image */}
          <div className='teams-container-image'>
            <img src='/media/venus-solid.svg' className='teams-container-image-content' alt='Venus sign for female' />
          </div>
          {/* Team name */}
          <div className='teams-container-sub'>
            <h2 className='teams-container-sub-team'>Team 2</h2>
          </div>
          {/* Focus */}
          <div className='teams-container-sub'>
            <p className='teams-container-sub-focus'>Focusing on ...</p>
          </div>
          {/* Button */}
          <div className='teams-container-sub'>
            <button className='teams-container-sub-button' id='team-1' onClick={handleClick}>Dive In</button>
          </div>
          {/* Shapes */}
          <img src='/media/Star 1.svg' className='teams-container-shape' id='teams-container-shape-1' alt='shape with green glow' />
          <img src='/media/Star 2.svg' className='teams-container-shape' id='teams-container-shape-2' alt='shape with green glow' />
          <img src='/media/Star 3.svg' className='teams-container-shape' id='teams-container-shape-3' alt='shape with green glow' />
          <img src='/media/Star 4.svg' className='teams-container-shape' id='teams-container-shape-4' alt='shape with green glow' />
        </section>
      </section>
    </div>
  );
}

export default Home;
