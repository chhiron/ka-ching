import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="about-us">
      <h1>Who we are</h1>
      <p>Welcome to Ka-Ching, where we make investing feel like an adventure!</p>
      <p>We're a passionate team of four NUS students, united by one mission: to demystify investing and make it simple, fun, and accessible for everyone. Our platform offers interactive lessons, placement tests, and resources to guide you through your investment journey.</p>
      <p>Get started by signing up or logging in!</p>

      <h1>Our Mission</h1>
      <p>At Ka-Ching, we’re all about making investing fun, easy, and accessible for everyone!</p>
      <p>Our mission is to break down the intimidating world of stocks and finance and turn it into an exciting journey where you get to learn, grow, and thrive. No more confusing jargon—just simple, interactive lessons that help you master the art of investing at your own pace.</p>
      <p>We believe that anyone can be a savvy investor, and we’re here to show you how. Whether you're just starting out or you're ready to take your knowledge to the next level, Ka-Ching is your go-to place for all things investment. Let's make your money work for you, the fun way!</p>

      <h1>Meet the Team</h1>
      <p>Ka-Ching is not just a group of individuals — we're a collaborative force with a shared goal.</p>
      <div className="team">
        <div className="team-member">
          <img src="team-member1.jpg" alt="Ananya Agarwal" />
          <h3>Ananya Agarwal</h3>
          <p>Lead Strategist</p>
          {/* LinkedIn logo */}
          <a href="https://www.linkedin.com/in/ananya-agarwal" target="_blank" rel="noopener noreferrer">
            <img src="linkedin-logo.png" alt="LinkedIn" className="linkedin-logo" style={{ width: '40px', height: 'auto', objectFit: 'contain' }}/>
          </a>
        </div>
        <div className="team-member">
          <img src="team-member2.jpg" alt="Boo Zhu En" />
          <h3>Boo Zhu En</h3>
          <p>Marketing Officer</p>
          {/* LinkedIn logo */}
          <a href="https://www.linkedin.com/in/boo-zhu-en" target="_blank" rel="noopener noreferrer">
            <img src="linkedin-logo.png" alt="LinkedIn" className="linkedin-logo" style={{ width: '40px', height: 'auto', objectFit: 'contain' }}/>
          </a>
        </div>
        <div className="team-member">
          <img src="team-member3.jpg" alt="Daphne Wong" />
          <h3>Daphne Wong</h3>
          <p>Lead Developer</p>
          {/* LinkedIn logo */}
          <a href="https://www.linkedin.com/in/daphne-wong" target="_blank" rel="noopener noreferrer">
            <img src="linkedin-logo.png" alt="LinkedIn" className="linkedin-logo" style={{ width: '40px', height: 'auto', objectFit: 'contain' }}/>
          </a>
        </div>
        <div className="team-member">
          <img src="team-member4.jpg" alt="Kenta Takayama" />
          <h3>Kenta Takayama</h3>
          <p>Business Development Manager</p>
          {/* LinkedIn logo */}
          <a href="https://www.linkedin.com/in/kenta-takayama" target="_blank" rel="noopener noreferrer">
            <img src="linkedin-logo.png" alt="LinkedIn" className="linkedin-logo" style={{ width: '40px', height: 'auto', objectFit: 'contain' }}/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;

