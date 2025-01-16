import React from 'react';
import iconChat from '../assets/img/icon-chat.png';
import iconMoney from '../assets/img/icon-money.png';
import iconSecurity from '../assets/img/icon-security.png';

const featuresData = [
  {
    imgSrc: iconChat,
    altText: "Chat Icon",
    title: "You are our #1 priority",
    description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
  },
  {
    imgSrc: iconMoney,
    altText: "Money Icon",
    title: "More savings means higher rates",
    description: "The more you save with us, the higher your interest rate will be!"
  },
  {
    imgSrc: iconSecurity,
    altText: "Security Icon",
    title: "Security you can trust",
    description: "We use top of the line encryption to make sure your data and money is always safe."
  }
];

const Main = () => {
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>

      <section className="features">
        <h2 className="sr-only">Features</h2>
        {featuresData.map((feature, index) => (
          <div className="feature-item" key={index}>
            <img src={feature.imgSrc} alt={feature.altText} className="feature-icon" />
            <h3 className="feature-item-title">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Main;
