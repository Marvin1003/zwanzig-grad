import { RouterContext } from "components/Context/Router";

const Link = props => (
  <a className={props.className} onClick={() => props.nextRoute(props.href)}>
    {props.children}
  </a>
);

export default props => (
  <RouterContext.Consumer>
    {nextRoute => <Link {...props} {...nextRoute} />}
  </RouterContext.Consumer>
);
