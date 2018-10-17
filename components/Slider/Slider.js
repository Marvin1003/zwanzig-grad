/* eslint-disable */
import { Component } from "react";

import * as PIXI from "pixi.js";

import nextIndex from "helper/nextIndex";

import styles from "./SliderStyles";

const SliderRef = ({ forwardedRef, ...props }) => (
  <Slider ref={forwardedRef} {...props} />
);
class Slider extends Component {
  canvas = React.createRef();
  container = React.createRef();

  prepared = false;

  pixi = {
    images: [],
    coverSprites: [],
    animation: null,
    textureContainer: null,
    displacement: {
      map: "/static/images/map.png",
      sprite: null,
      filter: null,
      filterData: {
        scaleX: 200,
        scaleY: 200,
        x: 40,
        y: 40
      }
    },
    height: 2000,
    app: null
  };

  componentDidMount() {
    this.props.mime && this.init();
  }

  componentDidUpdate() {
    this.props.mime && !this.prepared && this.init();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  init = () => {
    this.props.setReady();

    this.prepared = true;

    this.pixi.width = window.innerWidth;
    this.pixi.height = window.innerHeight;

    this.pixi.app = new PIXI.Application({
      width: this.pixi.width,
      height: this.pixi.height,
      view: this.canvas.current,
      transparent: true
    });

    this.pixi.images = [
      `/static/images/parkett/5${this.props.mime}`,
      `/static/images/treppe/5${this.props.mime}`,
      `/static/images/moebel/5${this.props.mime}`,
      `/static/images/innenausbau/5${this.props.mime}`
    ];

    this.container.current.appendChild(this.pixi.app.view);

    this.pixi.textureContainer = new PIXI.Container();

    this.pixi.app.stage.addChild(this.pixi.textureContainer);

    for (const image of this.pixi.images) {
      if (!PIXI.loader.resources[image]) PIXI.loader.add(image);
    }

    PIXI.loader.load((data, resources) =>
      Object.keys(resources).forEach((resource, i) =>
        this.addSprite(resource, i)
      )
    );

    window.addEventListener("resize", this.handleResize);

    this.pixi.displacement.sprite = new PIXI.Sprite.fromImage(
      this.pixi.displacement.map
    );

    this.calcSize(this.pixi.displacement.sprite);

    this.pixi.displacement.sprite.texture.baseTexture.wrapMode =
      PIXI.WRAP_MODES.REPEAT;

    this.pixi.displacement.filter = new PIXI.filters.DisplacementFilter(
      this.pixi.displacement.sprite
    );

    this.pixi.app.stage.addChild(this.pixi.displacement.sprite);
  };

  animate = (scaleX, scaleY, x, y) => {

    const tl = new TimelineLite({
      onStart: () => {
        this.pixi.textureContainer.filters = [this.pixi.displacement.filter];
      },
      onComplete: () => {
        tl.reverse();
        this.pixi.textureContainer.filters = null;
      },
      onReverseComplete: () => {
        // this.pixi.textureContainer.filters = null;
      }
    });

    // const tl2 = new TimelineLite({
    //   onComplete() {
    //     tl2.reverse();
    //   },
    //   onReverseComplete: () => {
    //     this.pixi.textureContainer.filters = null;

    //   }
    // });

    tl.fromTo(
      this.pixi.displacement.filter,
      this.props.duration,
      {
        pixi: {
          scaleX: 0,
          scaleY: 0
        }
      },
      {
        pixi: {
          scaleX
        },
        ease: Power2.easeIn
      }
    );

    // TweenLite.set(this.pixi.displacement.sprite, { pixi: { x: 0, y: 0 } });

  //   console.log("start");
  //   tl2.to(
  //     this.pixi.displacement.sprite,
  //     this.props.duration / 2,
  //     {
  //       pixi: {
  //         x: 0,
  //         y: 0
  //       }
  //     },
  //     {
  //       pixi: {
  //         x
  //       },
  //       ease: Power1.easeIn
  //     }
  //   );
  };

  handleResize = () => {
    for (const func of this.pixi.coverSprites) {
      func();
    }
  };

  addSprite(resource, i) {
    const texture = PIXI.loader.resources[resource].texture;
    const img = new PIXI.Sprite(texture);

    const func = this.calcSize(img);
    func();

    this.pixi.coverSprites.push(func);

    if (i !== this.props.current) img.alpha = 0;

    this.pixi.textureContainer.addChild(img);
  }

  slide = type => {
    const next = nextIndex(type, this.props.current, this.props.length);

    if (type === "next") {
      var scaleX = -this.pixi.displacement.filterData.scaleX;
      var scaleY = -this.pixi.displacement.filterData.scaleY;
      var x = -this.pixi.displacement.filterData.x;
      var y = -this.pixi.displacement.filterData.y;
    } else {
      var scaleX = this.pixi.displacement.filterData.scaleX;
      var scaleY = this.pixi.displacement.filterData.scaleY;
      var x = this.pixi.displacement.filterData.x;
      var y = this.pixi.displacement.filterData.y;
    }

    this.animate(scaleX, scaleY, x, y);

    TweenLite.to(
      this.pixi.textureContainer.children[this.props.current],
      this.props.duration,
      {
        alpha: 0,
        ease: "zwanzig-grad"
      }
    );

    TweenLite.to(
      this.pixi.textureContainer.children[next],
      this.props.duration,
      {
        alpha: 1,
        onComplete: this.props.updateCurrent,
        onCompleteParams: [next],
        ease: "zwanzig-grad"
      }
    );
  };

  calcSize = sprite => {
    const [x, y] = [sprite.width, sprite.height];
    const spriteRatio = x / y;

    return () => {
      this.pixi.width = window.innerWidth;
      this.pixi.height = window.innerHeight;

      this.pixi.app.renderer.resize(this.pixi.width, this.pixi.height);

      const windowRatio = this.pixi.width / this.pixi.height;

      const pos = new PIXI.Point(0, 0);
      let scale = 1;

      if (windowRatio > spriteRatio) {
        //photo is wider than background
        scale = this.pixi.width / x;
        pos.y = -(y * scale - window.innerHeight) / 2;
      } else {
        //photo is taller than background
        scale = this.pixi.height / y;
        pos.x = -(x * scale - window.innerWidth) / 2;
      }

      sprite.scale = new PIXI.Point(scale, scale);
      sprite.position = pos;
    };
  };

  render() {
    return (
      <div ref={this.container} className="slider">
        <style jsx>{styles}</style>
        <canvas ref={this.canvas} />
      </div>
    );
  }
}

export default SliderRef;
