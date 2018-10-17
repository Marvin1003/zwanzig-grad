export default (type, i, max) => {
  switch (type) {
    case "next":
      return (i + 1) % max;
    case "prev":
      return (max + (i - 1)) % max;
    default:
      throw "Something went wrong";
  }
};
