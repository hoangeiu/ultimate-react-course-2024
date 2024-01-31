export default function Pizza({
  name,
  ingredients,
  price,
  photoName,
  soldout,
}) {
  return (
    <li className={`pizza ${soldout && "sold-out"}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldout ? "SOLD OUT" : price}</span>
      </div>
    </li>
  );
}
