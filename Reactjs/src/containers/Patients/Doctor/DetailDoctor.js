import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../Auth/HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailDoctorInfo } from '../../../services/userService'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import DoctorSchedule from './DoctorSchedule';
import DoctorMoreInfo from './DoctorMoreInfo';
import ReactMarkdown from 'react-markdown';
import HomeFooter from '../../Auth/HomePage/HomeFooter';
import { isMobile } from 'react-device-detect';


class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {},
            curDoctorId: -1//used for DoctorMoreInfo and DoctorSchedule
        }
    }
    async componentDidMount() {
        if (this.props?.match?.params?.id) {
            let id = this.props.match.params.id;
            this.setState({
                curDoctorId: id
            })
            let res = await getDetailDoctorInfo(id)
            // console.log('>>>==================check res:', res)
            // convertBase64ToBinary
            if (res?.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {

        let detailDoctor = this.state.detailDoctor
        // console.log('>>>>---------check state:', detailDoctor)

        let language = this.props.language

        let nameVi = '', nameEn = ''
        if (detailDoctor?.positionData) {
            nameVi = `${detailDoctor.positionData.valueFr}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-wrap'>
                    <div className='doctor-detail-container container'>
                        <div className={!isMobile ? 'doctor-intro' : 'doctor-intro-mobile'}>
                            <div className='left-content'>
                                {detailDoctor?.image &&
                                    <img className='doctor-avatar'
                                        src={CommonUtils.convertBase64ToBinary(detailDoctor.image)} />
                                }
                            </div>
                            <div className='right-content'>
                                <div className='up'>
                                    {language === LANGUAGE.EN
                                        ? nameEn
                                        : nameVi
                                    }
                                </div>
                                <div className='down'>
                                    {detailDoctor?.Markdown?.descriptionEn && detailDoctor?.Markdown?.descriptionFr &&
                                        (language === LANGUAGE.EN ? detailDoctor.Markdown.descriptionEn : detailDoctor.Markdown.descriptionFr)}
                                </div>
                            </div>
                        </div>
                        <div className={!isMobile ? 'doctor-schedule' : 'doctor-schedule-mobile'}>
                            <div className='left-content'>
                                <DoctorSchedule
                                    doctorIdFromParent={this.state.curDoctorId} />
                            </div>
                            <div className='right-content'>
                                <DoctorMoreInfo
                                    doctorIdFromParent={this.state.curDoctorId}
                                    isShowPrice={false}
                                />
                            </div>
                        </div>
                        <div className='doctor-detail'>
                            {detailDoctor?.Markdown?.markdownContentEn &&
                                <ReactMarkdown>
                                    {language === LANGUAGE.EN
                                        ? detailDoctor.Markdown.markdownContentEn
                                        : detailDoctor.Markdown.markdownContentFr
                                    }
                                </ReactMarkdown>
                            }
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
