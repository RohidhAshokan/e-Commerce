import { Image } from "../images";
import "../ecommercefolder/styles.css";

export default function collection({picHeight, picWidth, picLable, handleCollection}) {
  const collectionCard = [
    { id: 'Outerwear', name: "Outwear", image: Image.outwearCategory },
    { id: 'Bags,Accessories', name: "Bags & Accessories", image: Image.bagCategory },
    { id: 'Footwear', name: "Footwear", image: Image.footwearCategory },
  ];
  return (
    <div style={{ paddingTop: "0" }}>
      <h2 className="section-head">{picLable}</h2>
      <div className="collections">
        {collectionCard.map((el) => {
          return (
            <div className="collection-card" key={el.name} 
            onClick={()=>handleCollection(el.id === 'Bags,Accessories' ? ['Bags', 'Accessories'] : [el.id])}
            >
              <div className="collection-image-fill">
                <img
                  src={el.image}
                  style={{ height: picHeight, width:  picWidth}}
                />
              </div>
              <div className="collection-label">{el.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
