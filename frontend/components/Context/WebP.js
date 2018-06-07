
export const WebPContext = React.createContext();

export class WebPProvider extends React.Component {
  state = { mime: undefined }

  componentDidMount() {
    const image = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
    const img = new Image();
    img.src = image;
    
    const setState = (mime) => this.setState({ mime });
  
    // IF WEBP IS SUPPORTED
    img.onload = () => setState('.webp');
  
    // FALLBACK IF NOT SUPPORTED
    img.onerror = () => setState('.jpg');
  }

  render() {
    return (
      <WebPContext.Provider value={this.state}>
        {this.props.children}
      </WebPContext.Provider>
    );
  }
}

