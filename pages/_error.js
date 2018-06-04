const styles = {
  wrapper: {
    position: 'fixed',
    color: '#000',
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    top: '50vh',
    left: '50vw',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: {
    fontSize: '24px',
    fontWeight: 500,
  },
  h1: {
    padding: '15px 15px',
    fontSize: '15px',
    fontWeight: 'normal'
  },
};

export default class Error extends React.Component {
  static defaultProps = {
    message: 'Es ist ein Fehler aufgetreten.',
    type: 1

  }

  errorMessage() {
    this.style = `
      ${(this.props.type === 1) 
        ? " h1 { border-left: 1px solid #C1C12B; } " 
        : null}

      span {
        padding: 15px 15px;
      }
      @media only screen and (max-width: 479px) {
        div {
          flex-direction: column;
        }
        h1 {
          border-left: 0;
        }
        ${(this.props.type === 1) 
          ? " span { border-bottom: 1px solid #C1C12B; padding: 15px 30px; } " 
          : null}
        }
      }
    `;

    if(this.props.type === 1) {
      return (
        <div style={styles.wrapper}>
          <style>{this.style}</style>
          <span style={styles.num}>404</span>
          <h1 style={styles.h1}>Die Seite konnte nicht gefunden werden.</h1>
        </div>
      );
    }
    return (
      <div style={styles.wrapper}>
        <style>{this.style}</style>
        <h1 style={styles.h1}>{this.props.message}</h1>
      </div>
    );
  }
  render() {
    return (
      <>
        {this.errorMessage()}
      </>
    )
  }
}