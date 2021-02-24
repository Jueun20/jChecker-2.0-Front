import React from 'react';
import WithRoot from './modules/root'
import AppBarView from './modules/views/Appbar';
import SectionMain from './modules/views/SectionMain';
import SectionDetail from './modules/views/SectionDetails';
import SectionBegin from './modules/views/SectionBegin';
import AppFooter from './modules/views/Footer';

function Index() {
    return (
        <React.Fragment>
            <AppBarView />
            <SectionMain /> 
            <SectionDetail />
            <SectionBegin />
            <AppFooter />
        </React.Fragment>
    )
}

export default WithRoot(Index);