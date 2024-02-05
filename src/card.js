import { h } from 'preact';
import './card.css'; // Assume you have a CSS file for styling

const handleClick = (url) => {
  window.open(url, '_blank');
};

const Card = ({ title, content, imageUrl, url }) => (
  <div className="card" onClick={() => handleClick(url)}>
    {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
    <div className="card-content">
      <h2 className="card-title">{title}</h2>
      <p className="card-body">{content}</p>
    </div>
  </div>
);

export default Card;
