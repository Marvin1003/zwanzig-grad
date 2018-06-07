
export const DeviceContext = React.createContext();

export class DeviceProvider extends React.Component {
  state = { device: undefined }

  componentDidMount() {
    this.target();
    window.addEventListener('resize', this.target);
  }
  
  target = () => {
    this.device = window.innerWidth <= 1024 ? 'mobile' : 'desktop';
    
    this.setState((prevState) => {
      if (prevState.device !== this.device) {
        return {
          device: this.device
        }
      }
      return null;
    });
  }

  render() {
    return (
      <DeviceContext.Provider value={this.state}>
        {this.props.children}
      </DeviceContext.Provider>
    );
  }
}

