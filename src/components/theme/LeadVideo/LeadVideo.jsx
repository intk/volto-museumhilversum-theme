import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Embed } from 'semantic-ui-react';
import './LeadVideo.less';

class LeadVideo extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    content: PropTypes.any,
  };

  render() {
    const youtubeId = this.props.content.youtube_id;
    const previewImage = this.props.content.preview_image;
    const imagePlaceholder = previewImage
      ? previewImage.scales.large.download
      : '';

    return (
      <>
        {youtubeId && (
          <div className="full-width">
            <Embed
              autoplay={true}
              id={youtubeId}
              placeholder={imagePlaceholder}
              source="youtube"
            />
          </div>
        )}
      </>
    );
  }
}

export default LeadVideo;
