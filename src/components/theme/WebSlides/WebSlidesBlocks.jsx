import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '@plone/volto/registry';
import { map } from 'lodash';

import './static/css/svg-icons.css';
import './static/css/webslides.less';
import './WebSlides.less';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getBaseUrl,
} from '@plone/volto/helpers';

class WebSlidesBlocksComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    content: PropTypes.any,
    location: PropTypes.any,
  };

  async componentDidMount() {
    const WebSlides = await import('webslides');
    const ws = new window.WebSlides({
      showIndex: false,
    });
  }

  componentWillUnmount() {
    var element = document.documentElement;
    element.classList.remove('ws-ready');
  }

  render() {
    const content = this.props.content;
    const location = this.props.location;

    const blocksFieldname = getBlocksFieldname(content);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
    const webslidesItems = content[blocksLayoutFieldname].items;

    return (
      <>
        {webslidesItems && (
          <div id="webslides">
            {map(webslidesItems, (block) => {
              const Block =
                config.blocks.blocksConfig[
                  content[blocksFieldname]?.[block]?.['@type']
                ]?.['view'] || null;
              return Block !== null &&
                content[blocksFieldname][block]['@type'] !== 'title' ? (
                <section className="text">
                  <div className="wrap">
                    <Block
                      key={block}
                      id={block}
                      properties={content}
                      data={content[blocksFieldname][block]}
                      path={getBaseUrl(location?.pathname || '')}
                    />
                  </div>
                </section>
              ) : (
                ''
              );
            })}
          </div>
        )}
      </>
    );
  }
}

export default WebSlidesBlocksComponent;
