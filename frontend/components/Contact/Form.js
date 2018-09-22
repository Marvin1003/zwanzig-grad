import { PureComponent } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import TextHover from "../../animation/components/hover/TextHover";

import autoResize from "../../functions/autoResize";
import send from "./send";

import style from "../../styles/components/common/form";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { captchaValue: null };

    this.value = null;

    // HARDBIND
    this.onSubmit = this.onSubmit.bind(this);
    this.showSubmit = this.showSubmit.bind(this);
    this.resetCaptcha = this.resetCaptcha.bind(this);

    // REFS
    this.form = React.createRef();
    this.captcha = React.createRef();
  }

  componentDidMount() {
    autoResize();

    this.animationDuration = 0.3;

    const captchaDOM = document.getElementsByClassName("status")[0]
      .previousSibling;
    captchaDOM.classList.add("captcha");

    const email = document.querySelector('[name="email"]');
    const tel = document.querySelector('[name="tel"]');

    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const telRegExp = tel.pattern;

    this.validate(email, emailRegExp);
    this.validate(tel, telRegExp);

    const inputs = [...document.getElementsByTagName("input")];
    const textarea = document.querySelector("textarea");
    this.expanded = false;

    // TO FIX CASE WHERE YOU FOCUS BEFORE EVENT LISTENER ARE RUNNING
    // if (!this.expanded && document.activeElement !== document.body)
    //   this.focus(document.activeElement);

    this.form.current.addEventListener("submit", this.onSubmit);
    inputs.forEach(item => this.eventListener(item));
    this.eventListener(textarea);

    this.responsiveCaptcha = this.responsiveCaptcha.bind(this, captchaDOM);
    window.addEventListener("resize", this.responsiveCaptcha);
    this.responsiveCaptcha();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.responsiveCaptcha);
  }

  responsiveCaptcha(captcha) {
    const width = captcha.parentNode.offsetWidth;
    const captchaWidth = 302;
    const scale = Math.min(width / captchaWidth, 1);
    TweenLite.set(captcha, { scale });
  }

  validate(elem, reg) {
    const regExp = new RegExp(reg);
    this.pass = false;

    elem.addEventListener("input", () => (this.pass = regExp.test(elem.value)));
  }

  eventListener(target) {
    target.addEventListener("focus", () => this.focus(target));
    target.addEventListener("focusout", () => this.focusOut(target));
  }

  focus(item) {
    this.expanded = true;

    TweenLite.to(item.parentNode, this.animationDuration, {
      alpha: 1,
      ease: "zwanzig-grad"
    });
    TweenLite.to(item.nextSibling, this.animationDuration, {
      y: "-150%",
      ease: "zwanzig-grad"
    });
  }

  focusOut(item) {
    if (!item.value) {
      TweenLite.to(item, this.animationDuration, {
        borderBottom: "1px solid black",
        ease: "zwanzig-grad"
      });
      TweenLite.to(item.nextSibling, this.animationDuration, {
        color: "black",
        ease: "zwanzig-grad"
      });
      TweenLite.to(item.parentNode, this.animationDuration, {
        alpha: 0.7,
        ease: "zwanzig-grad"
      });
      TweenLite.to(item.nextSibling, this.animationDuration, {
        y: "0%",
        ease: "zwanzig-grad"
      });
    } else if (this.pass || (item.type !== "email" && item.type !== "tel")) {
      TweenLite.to(item, this.animationDuration, {
        borderBottom: "1px solid #C1C12B",
        ease: "zwanzig-grad"
      });
      TweenLite.to(item.nextSibling, this.animationDuration, {
        color: "#C1C12B",
        ease: "zwanzig-grad"
      });
    } else {
      TweenLite.to(item, this.animationDuration, {
        borderBottom: "1px solid red",
        ease: "zwanzig-grad"
      });
      TweenLite.to(item.nextSibling, this.animationDuration, {
        color: "red",
        ease: "zwanzig-grad"
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (!(this.state.captchaValue && this.state.captchaValue === this.value))
      return false;

    send(this.form.current, this.resetCaptcha);
    this.value = null;
  }

  resetCaptcha() {
    // RESET
    this.setState({ captchaValue: null });
    this.captcha.current.reset();
  }

  showSubmit(value) {
    this.value = value;
    this.setState({ captchaValue: value });
  }

  render() {
    return (
      <form
        action="/send"
        method="POST"
        className="form didonesque_normal"
        ref={this.form}
      >
        <style jsx>{style}</style>
        <div className="field alpha">
          <input
            type="text"
            name="name"
            autoComplete="name"
            className="input"
            required
          />
          <label htmlFor="name" className="label">
            Name
          </label>
        </div>
        <div className="field alpha">
          <input
            type="email"
            name="email"
            autoComplete="email"
            className="input"
            required
          />
          <label htmlFor="email" className="label">
            Email Adresse
          </label>
        </div>
        <div className="field alpha">
          <input
            type="tel"
            autoComplete="tel"
            pattern="^(\+?([0-9]{2})?)([-.\s])?(([0-9]{3,5})([-.\s])([0-9]{3,5})?([-\.\s])([0-9]{3,5})|([0-9]{7,14}))$"
            name="tel"
            className="input"
            required
          />
          <label htmlFor="name" className="label">
            Telefon
          </label>
        </div>
        <div className="alpha">
          <textarea rows="1" name="nachricht" className="textarea" required />
          <label htmlFor="nachricht" className="label">
            Ihre Nachricht
          </label>
        </div>
        {this.state.captchaValue && this.state.captchaValue === this.value ? (
          <TextHover
            name="senden"
            duration={0.5}
            bgColor="white"
            color="#C1C12B"
            tag="button"
            className="submit font_medium didonesque_normal"
            style={{ opacity: 1 }}
          />
        ) : (
          // INVISIBLE NON FUNCTIONAL PLACEHOLDER
          <div className="submit font_medium notverified">senden</div>
        )}
        <ReCAPTCHA
          ref={this.captcha}
          sitekey="6Le8MVQUAAAAAMluULHNeesF0L1_r9mFIuRVnep3"
          onChange={this.showSubmit}
        />
        <h3 className="status" />
      </form>
    );
  }
}
