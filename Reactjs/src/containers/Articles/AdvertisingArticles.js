import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../Auth/HomePage/HomeHeader';
import { connect } from 'react-redux';
import RemoteExam from './RemoteExam';
import SpecialistExam from './SpecialistExam.jsx';
import GeneralExam from './GeneralExam';
import MedicalTest from './MedicalTest';
import MentalHealth from './MentalHealth';
import { useEffect } from 'react';
import { LANGUAGE } from '../../utils';
import { useLocation } from 'react-router-dom';
import HomeFooter from '../Auth/HomePage/HomeFooter';


const AdvertisingArticles = (props) => {
    const [sectionDisplay, setSectionDisplay] = useState('')
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get('name');
    console.log('===========', nameParam)

    let curSection = (curMenuName) => {
        console.log('>>>>>>>>curName real:', curMenuName)
        setSectionDisplay(curMenuName)
        console.log('>>>>>>>>sectionDisplay:', sectionDisplay)

    }
    useEffect(() => {
        if (nameParam === 'specialist') setSectionDisplay(props.language === LANGUAGE.EN ? "Specialist Examination" : "Examen spécialiste")
        else if (nameParam === 'remote') setSectionDisplay(props.language === LANGUAGE.EN ? "Remote Examination" : "Examen à distance")
        else if (nameParam === 'general') setSectionDisplay(props.language === LANGUAGE.EN ? "General Examination" : "Examen général")
        else if (nameParam === 'medical') setSectionDisplay(props.language === LANGUAGE.EN ? "Medical Test" : "Test médical")
        else if (nameParam === 'mental') setSectionDisplay(props.language === LANGUAGE.EN ? " Mental Health" : "Santé mentale")
        else setSectionDisplay(props.language === LANGUAGE.EN ? "Specialist Examination" : "Examen spécialiste")
    }, [])

    return (
        <div>
            <HomeHeader isShowBanner={false} />
            <div className='advertising-article-container'>
                {sectionDisplay === "Specialist Examination" || sectionDisplay === "Examen spécialiste" ? <SpecialistExam curSection={curSection} /> :
                    sectionDisplay === " Mental Health" || sectionDisplay === "Santé mentale" ? <MentalHealth curSection={curSection} /> :
                        sectionDisplay === "Remote Examination" || sectionDisplay === "Examen à distance" ? <RemoteExam curSection={curSection} /> :
                            sectionDisplay === "General Examination" || sectionDisplay === "Examen général" ? <GeneralExam curSection={curSection} /> :
                                sectionDisplay === "Medical Test" || sectionDisplay === "Test médical" ? <MedicalTest curSection={curSection} />
                                    : <div>nothing here</div>

                }
            </div>
            <HomeFooter />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
}; const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertisingArticles)
