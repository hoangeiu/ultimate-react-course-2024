export const formatShortDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export const FAKE_USER = {
  name: "Lê Minh Hoàng",
  email: "hoang@test.com",
  password: "hoang",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
