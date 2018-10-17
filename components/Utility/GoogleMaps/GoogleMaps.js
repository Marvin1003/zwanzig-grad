import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import mapStyles from "static/json/googleMaps/zwanzig_grad.json";

const style = {
  height: "200%",
  width: "200%",
  transform: "translate(-25%, -25%)"
};
const GoogleMapsWrapper = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap {...props} ref={() => props.mounted()}>
        {props.children}
      </GoogleMap>
    );
  })
);

export default class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.mapAnimation = new TimelineLite();

    this._mounted = this._mounted.bind(this);
    this.pause = this.animationControls.bind(this, "pause");
    this.resume = this.animationControls.bind(this, "play");
  }

  static defaultProps = {
    zoom: 16,
    lat: 52.038131,
    lng: 8.480096
  };

  _mounted() {
    this.map = document.getElementsByClassName("map")[0].childNodes[0];
    this.animateMap();
  }

  // setSeize = () => {
  //   if(window.innerWidth < 1025) {
  //     TweenLite.set(this.wrapper, { height: window.innerHeight * 0.9, top: window.innerHeight * 0.1 });
  //     TweenLite.set(this.wrapper.previousSibling, { height: window.innerHeight });
  //   }
  // }

  animateMap() {
    const radius = 150;
    const duration = 100;
    this.mapAnimation.to(this.map, duration, {
      bezier: {
        type: "quadratic",
        values: [
          { x: 0, y: 0 },
          { x: radius, y: 0 },
          { x: radius, y: radius },
          { x: radius, y: radius * 2 },
          { x: 0, y: radius * 2 },
          { x: -radius, y: radius * 2 },
          { x: -radius, y: radius },
          { x: -radius, y: 0 },
          { x: 0, y: 0 }
        ]
      },
      ease: Linear.easeNone,
      onComplete: () => this.mapAnimation.restart()
    });
  }

  animationControls(type) {
    if (type === "pause") this.mapAnimation.pause();
    else this.mapAnimation.play();
  }

  render() {
    return (
      <GoogleMapsWrapper
        mounted={this._mounted}
        isMarkerShown
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBr95T2MNfs6FXhfPF_geJl7zD5kKYLYNk&v=3.exp&libraries=geometry,drawing,places"
        }
        loadingElement={<div />}
        containerElement={<div className="map_wrapper" />}
        onDragStart={this.pause}
        onDragEnd={this.resume}
        mapElement={<div className="map" style={style} />}
        defaultZoom={this.props.zoom}
        defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
        defaultOptions={{
          styles: mapStyles,
          // DISABLE CONTROLS
          streetViewControl: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          rotateControl: false,
          fullscreenControl: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          gestureHandling: "cooperative",
          minZoom: this.props.zoom,
          maxZoom: this.props.zoom
        }}
      >
        <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />
      </GoogleMapsWrapper>
    );
  }
}
