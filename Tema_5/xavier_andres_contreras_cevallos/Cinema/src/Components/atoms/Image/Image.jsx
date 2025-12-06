import './Image.css';

const Image = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={`image ${className}`} />;
};

export default Image;