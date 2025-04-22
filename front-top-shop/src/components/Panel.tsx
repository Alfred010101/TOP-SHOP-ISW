type PanelProps = {
  position: "left" | "right";
  title: string;
  text: string;
  image: string;
  buttonText: string;
  onClick: () => void;
};

const Panel = ({
  position,
  title,
  text,
  image,
  buttonText,
  onClick,
}: PanelProps) => {
  return (
    <div className={`panel ${position}-panel`}>
      <div className="content">
        <h3>{title}</h3>
        <p>{text}</p>
        <button className="btn transparent" onClick={onClick}>
          {buttonText}
        </button>
      </div>
      <img src={image} alt={`${position} panel`} className="image" />
    </div>
  );
};

export default Panel;
