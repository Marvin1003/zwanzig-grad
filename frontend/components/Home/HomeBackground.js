const HomeMobile = (props) => {
  return props.content.map((image) => (
    <section className="section_background_wrapper" key={image} style={{overflow: "hidden"}}>
      <section className="background_center section_background" 
        style={{ backgroundImage: `url(../../static/images/${image}/5${props.mime})` }} />
    </section>
  ));
}

export default HomeMobile;