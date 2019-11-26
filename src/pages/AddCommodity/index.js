import React, {Component} from "react";
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Link, Redirect} from "react-router-dom";
import {
    Container,
    ComponentTitle,
    CommodityTitle,
    CommodityPrice,
    CommodityDescribe,
    CommodityEnable,
    CommodityPoster,
    PostArea,
    PostButton,
    CancelArea,
    CancelButton,
    UploadImagesWrapper
} from './style';
import Switch from "../../common/Switch";

class AddCommodity extends Component {
    render() {
        if (!this.props.isLogin) {
            return <Redirect to="/management/login"/>
        } else {
            return (
                <Container>
                    <ComponentTitle>
                        添加商品
                        <div className="line"/>
                    </ComponentTitle>
                    <CommodityTitle>
                        <input
                            className="input"
                            placeholder="名称"
                            value={this.props.commodity.get('name')}
                            onChange={this.props.handleCommodityTitleInputChange}
                            ref={(name) => this.inputNameRef = name}
                        />
                    </CommodityTitle>
                    <CommodityPrice>
                        <input
                            className="input"
                            placeholder="原价"
                            value={this.props.commodity.get('originalPrice')}
                            onChange={this.props.handleOriginalPriceInputChange}
                            ref={(originalPrice) => this.inputOriginalPrice = originalPrice}
                        />
                        <div className="separator"/>
                        <input
                            className="input"
                            placeholder="现价"
                            value={this.props.commodity.get('currentPrice')}
                            onChange={this.props.handleCurrentPriceInputChange}
                            ref={(currentPrice) => this.inputCurrentPrice = currentPrice}
                        />
                    </CommodityPrice>
                    <CommodityDescribe>
                        <input
                            className="input"
                            placeholder="描述"
                            value={this.props.commodity.get('describe')}
                            onChange={this.props.handleDescribeInputChange}
                            ref={(describe) => this.inputDescribe = describe}
                        />
                    </CommodityDescribe>
                    <CommodityEnable>
                        <div className="tips">是否可见：</div>
                        <Switch
                            isTurnOn={this.props.commodity.get('enable')}
                            color='#1AAD19'
                            onClick={() => {
                                this.props.handleSwitch(this.props.commodity.get('enable'));
                            }}
                        />
                    </CommodityEnable>
                    <CommodityPoster>
                        <PostArea>
                            <div className="tips">添加</div>
                            <PostButton onClick={() => {
                                this.props.handlePostButton(
                                    this.props.commodity,
                                    // 以下为DOM-ref传参
                                    this.inputNameRef, //菜品名称
                                    this.inputOriginalPrice, //原价
                                    this.inputCurrentPrice, // 现价
                                    this.inputDescribe, // 图片URL
                                    this.inputImageRef // 上传图片文件
                                )
                            }}>OK</PostButton>
                        </PostArea>
                        <div className="separator"/>
                        <CancelArea>
                            <div className="tips">取消</div>
                            <Link to="/management">
                                <CancelButton onClick={this.props.handleCancelButton}>Cancel</CancelButton>
                            </Link>
                        </CancelArea>
                    </CommodityPoster>
                    <UploadImagesWrapper>
                        <input ref={(file) => this.inputImageRef = file}
                               type='file'
                               id='input-img'/>
                    </UploadImagesWrapper>

                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.getIn(['login', 'isLogin']),
    commodity: state.getIn(['addCommodity', 'commodity'])
});

const mapDispatchToProps = (dispatch) => ({
    // CommodityTitleInput的value改变时
    handleCommodityTitleInputChange(e) {
        const value = e.target.value;
        dispatch(actionCreators.commodityTitleInputChange(value));
    },

    // OriginalPriceInput的value改变时
    handleOriginalPriceInputChange(e) {
        if (e.target.value !== '') {
            const value = parseInt(e.target.value);
            dispatch(actionCreators.originalPriceInputChange(value));
        } else {
            const value = e.target.value;
            dispatch(actionCreators.originalPriceInputChange(value));
        }
    },

    // CurrentPriceInput的value改变时
    handleCurrentPriceInputChange(e) {
        if (e.target.value !== '') {
            const value = parseInt(e.target.value);
            dispatch(actionCreators.currentPriceInputChange(value));
        } else {
            const value = e.target.value;
            dispatch(actionCreators.currentPriceInputChange(value));
        }
    },

    // describeInput的value改变时
    handleDescribeInputChange(e) {
        const value = e.target.value;
        dispatch(actionCreators.describeInputChange(value));
    },

    // 点击Switch开关时，切换enable
    handleSwitch(isTurnOn) {
        const newIsTurnOn = !isTurnOn;
        dispatch(actionCreators.commodityEnableSwitch(newIsTurnOn));
    },

    // 点击"添加"时触发，添加数据
    handlePostButton(immutableCommodity,
                     // 以下为DOM接收参数
                     inputNameRef,
                     inputOriginalPrice,
                     inputCurrentPrice,
                     inputDescribe,
                     inputImageRef,) {

        // if阵列判断异常并提示
        if (immutableCommodity.get('name') === '') {
            alert('商品名称不能为空');
            return
        }
        if (immutableCommodity.get('originalPrice') === null) {
            alert('商品原价不能为空');
            return;
        }
        if (immutableCommodity.get('currentPrice') === null) {
            alert('商品现价不能为空');
            return;
        }
        if (immutableCommodity.get('describe') === null) {
            inputDescribe.value = '暂无描述';
        }

        const commodityList = immutableCommodity.toJS();
        // TODO : 是否要求每次提交必须有图片 ？
        // 点击确定 获取输入数据 同时 获取input file DOM
        // 创建 Form 对象，用于axios直接 POST
        // let inputNameRef_file = inputNameRef.value;
        let inputOriginalPrice_file = inputOriginalPrice.value;
        let inputCurrentPrice_file = inputCurrentPrice.value;
        // let inputDescribe_file = inputDescribe.value;
        let inputImageRef_file = inputImageRef.files[0];

        let param = new FormData();
        param.append('name', commodityList.name);
        param.append('originalPrice', inputOriginalPrice_file);
        param.append('currentPrice', inputCurrentPrice_file);
        param.append('enable', commodityList.enable);
        param.append('sum', commodityList.sum);
        param.append('isUnderRevision', commodityList.isUnderRevision);
        param.append('isSeeMore', commodityList.isSeeMore);
        param.append('describe', commodityList.describe);
        param.append('imageFile', inputImageRef_file);

        // 打印检查FormData
        console.log('FormData 内容 : ');
        console.log('name 内容是 ：', param.get('name'));
        console.log('originalPrice 内容是 ：', param.get('originalPrice'));
        console.log('currentPrice 内容是 ：', param.get('currentPrice'));
        console.log('enable 内容是 ：', param.get('enable'));
        console.log('sum 内容是 ：', param.get('sum'));
        console.log('isUnderRevision 内容是 ：', param.get('isUnderRevision'));
        console.log('isSeeMore 内容是 ：', param.get('isSeeMore'));
        console.log('describe 内容是 ：', param.get('describe'));
        console.log('imageFile 内容是 ：', param.get('imageFile'));

        dispatch(actionCreators.onPost(param));
    },

    // 点击"取消"时触发，清空temCommodity
    handleCancelButton() {
        dispatch(actionCreators.onCancel());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCommodity);