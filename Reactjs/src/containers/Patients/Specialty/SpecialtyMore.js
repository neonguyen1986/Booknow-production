import React, { Component } from 'react';
import { connect } from "react-redux";
import './SpecialtyMore.scss'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../Auth/HomePage/HomeHeader';
import { getAllSpecialty } from '../../../services/userService'
import { useState } from 'react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import HomeFooter from '../../Auth/HomePage/HomeFooter';
import { isMobile } from 'react-device-detect';

const SpecialtyMore = (props) => {
    const [specialtyList, setSpecialtyList] = useState('')

    useEffect(async () => {
        try {
            let res = await getAllSpecialty()
            console.log('=======check res', res.data)
            setSpecialtyList(res.data);
        } catch (error) {
            console.log('Error on fetching data:', error)
        }
    }, [])
    const language = props.language
    return (
        <>
            <div className='specMore-bkground'>
                <HomeHeader isShowBanner={false} />
                <div className='specMore-container container'>
                    {specialtyList?.length > 0 &&
                        specialtyList.map((item, index) => {
                            return (
                                <div className='specMore-content' key={index}>
                                    <div className='specMore-img-div'>
                                        <img className={!isMobile ? 'specMore-img' : 'specMore-img-mobile'} src={item.image} />
                                    </div>
                                    <div className='specMore-text'>
                                        <ReactMarkdown>
                                            {language === LANGUAGE.EN ? item.descriptionMarkdown_En : item.descriptionMarkdown_Fr}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
            <HomeFooter />
        </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyMore);
