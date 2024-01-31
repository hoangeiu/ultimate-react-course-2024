export default function Order({ localTime, openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        {localTime}. We're open from {openHour}:00 to ${closeHour}:00. Come
        visit us or order online.!
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
