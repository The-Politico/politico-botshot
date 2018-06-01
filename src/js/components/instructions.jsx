import React from 'react';
import queryString from 'query-string';
import copy from 'copy-to-clipboard';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import CameraIcon from '@fortawesome/fontawesome-free-solid/faCameraRetro';
import CopyIcon from '@fortawesome/fontawesome-free-solid/faCopy';

class Instructions extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      path: '',
      selector: '',
      padding: '',
    };
  }
  render () {
    const target = document.getElementsByName('target')[0].value;
    const params = {
      path: this.state.path.replace(target, ''),
      selector: this.state.selector,
      padding: this.state.padding,
    };
    const apiUrl = `${window.location.href}shoot/?${queryString.stringify(params)}`;

    return (
      <section className='instructions'>
        <div className='parameters'>
          <h4>API</h4>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              value={apiUrl}
              readOnly
            />
            <span className='input-group-btn'>
              <button
                className='btn btn-secondary'
                type='button'
                disabled={!this.state.path || !this.state.selector}
                onClick={() => {
                  window.open(apiUrl, '_blank');
                }}
                title='Shoot!'
              ><FontAwesomeIcon icon={CameraIcon} /></button>
              <button
                className='btn btn-secondary'
                type='button'
                disabled={!this.state.path || !this.state.selector}
                onClick={() => {
                  copy(apiUrl);
                }}
                title='Copy URL'
              ><FontAwesomeIcon icon={CopyIcon} /></button>
            </span>
          </div>
          <h4>Query Parameters</h4>
          <h6>path <span>Required</span></h6>
          <p>The relative path to a page on the target domain.</p>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>https://</span>
            </div>
            <input
              type='url'
              className='form-control'
              value={this.state.path}
              onChange={(e) => this.setState({ path: e.target.value, })}
              placeholder={`Page on ${target}`}
            />
            <small className='form-text text-muted'>
              Full URL will be truncated to relative path
            </small>
          </div>
          <h6>selector <span>Required</span></h6>
          <p>CSS selector for the element on the page you want to screenshot.</p>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              value={this.state.selector}
              onChange={(e) => this.setState({ selector: e.target.value, })}
              placeholder='.your-selector'
            />
          </div>
          <h6>padding</h6>
          <p>An amount of padding in pixels -- specified as a CSS string -- to include around the page element.</p>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              value={this.state.padding}
              placeholder='5px 5px 10px 5px'
              onChange={(e) => this.setState({ padding: e.target.value, })}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Instructions;
