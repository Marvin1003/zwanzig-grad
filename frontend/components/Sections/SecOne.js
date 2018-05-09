import AutoSlider from '../../animation/components/AutoSlider';

export default ({ title }) => {
  title = title.toLowerCase();
  return (
    <section className={`section sec_one sec_one_${title}`}>
      <div className={`sec_one_box sec_one_box_${title}`} />
      <AutoSlider
        type={1}
        lazy={true}
        parallax={true}
        delay={0.5}
        showDuration={3.5}
        animationDuration={1.25}
        cookie="SecOne"
        imageType="parkett"
        images={[1, 2, 3, 4]}
        links={false}
        scaleFix="lazy_fix_parallax"
      />
      <h1 className="sec_one_headline geomanist_headline">{title}</h1>
    </section>
  );
};
