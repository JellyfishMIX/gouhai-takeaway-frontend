import React, {PureComponent} from 'react';
import { Upload, Button, Icon } from 'antd';

const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'error',
  },
];

const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
  defaultFileList: [...fileList],
};

const props2 = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
  defaultFileList: [...fileList],
  className: 'upload-list-inline',
};

class Upload extends PureComponent {
    render() {
    return(
        <div>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Upload
              </Button>
            </Upload>
            <br />
            <br />
            <Upload {...props2}>
              <Button>
                <Icon type="upload" /> Upload
              </Button>
            </Upload>
          </div>,
    )

   }

}


ReactDOM.render(

  mountNode,
);