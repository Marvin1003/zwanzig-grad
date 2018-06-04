import AutoSlider from '../../animation/components/AutoSlider';
import style from '../../styles/components/common/secOne';

export default ({ title }) => {
  title = title.toLowerCase();
  return (
    <section className={`section sec_one sec_one_${title.replace(/ö/, 'oe')}`}>
      <style jsx>{style}</style>
      <div className={`sec_one_box sec_one_box_${title.replace(/ö/, 'oe')}`} />
      <AutoSlider
        parallax={true}
        delay={0.5}
        showDuration={3.5}
        animationDuration={1.25}
        imageType="parkett"
        images={[1, 2, 3, 4]}
        links={false}
        scaleFix="lazy_fix_parallax"
      />
      <h1 className="sec_one_headline quattrocento_headline">{title}</h1>
    </section>
  );
};
