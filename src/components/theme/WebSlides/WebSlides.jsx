import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './static/css/svg-icons.css';
import './static/css/webslides.less';
import './WebSlides.less';

class WebSlidesComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    items: PropTypes.any,
  };

  async componentDidMount() {
    const WebSlides = await import('webslides');
    const ws = new window.WebSlides({
      showIndex: false,
    });
  }

  render() {
    const webslidesItems = this.props.items;

    return (
      <>
        {webslidesItems && (
          <div id="webslides">
            <section className="text aligncenter">
              <div className="wrap size-50">
                <h2>We can help</h2>
                <ul className="text-cols">
                  <li>Create a digital strategy for your organizations;</li>
                  <li>Design and develop a new website;</li>
                  <li>Host and maintain your website;</li>
                </ul>
              </div>
            </section>
            <section className="text aligncenter">
              <div className="wrap size-50">
                <h2>Our websites</h2>
                <ul className="text-cols double">
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.uitgeverijkomma.nl"
                      href="https://www.uitgeverijkomma.nl"
                      text="Uitgeverij Komma"
                    >
                      Uitgeverij Komma
                    </a>
                  </li>
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.schunck.nl"
                      href="https://www.schunck.nl"
                      text="SCHUNCK"
                    >
                      SCHUNCK
                    </a>
                  </li>
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.haagshistorischmuseum.nl"
                      href="https://www.haagshistorischmuseum.nl"
                      text="Haags Historisch Museum"
                    >
                      Haags Historisch Museum
                    </a>
                  </li>
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.gevangenpoort.nl"
                      href="https://www.gevangenpoort.nl"
                      text="De Gevangenpoort"
                    >
                      De Gevangenpoort
                    </a>
                  </li>
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.bonnefanten.nl"
                      href="https://www.bonnefanten.nl"
                      text="Bonnefantenmuseum"
                    >
                      Bonnefantenmuseum
                    </a>
                  </li>
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.hetpark.nl"
                      href="https://www.hetpark.nl"
                      text="Het Park"
                    >
                      Het Park
                    </a>
                  </li>
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.centraalmuseum.nl"
                      href="https://www.centraalmuseum.nl"
                      text="Centraal Museum"
                    >
                      Centraal Museum
                    </a>
                  </li>
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.cuypershuis.nl"
                      href="https://www.cuypershuis.nl"
                      text="Cuypershuis"
                    >
                      Cuypershuis
                    </a>
                  </li>
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.kunsthalkade.nl"
                      href="https://www.kunsthalkade.nl"
                      text="Kunsthal KAdE"
                    >
                      Kunsthal KAdE
                    </a>
                  </li>
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.mondriaanhuis.nl"
                      href="https://www.mondriaanhuis.nl"
                      text="Mondriaanhuis"
                    >
                      Mondriaanhuis
                    </a>
                  </li>
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.zeeuwsmuseum.nl"
                      href="https://www.zeeuwsmuseum.nl"
                      text="Zeeuws Museum"
                    >
                      Zeeuws Museum
                    </a>
                  </li>
                  <li>
                    <a
                      data-linktype="external"
                      data-val="https://www.markiezenhof.nl"
                      href="https://www.markiezenhof.nl"
                      text="Het Markiezenhof"
                    >
                      Het Markiezenhof
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        )}
      </>
    );
  }
}

export default WebSlidesComponent;
