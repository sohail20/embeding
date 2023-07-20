import React from 'react';
import InnerHTML from 'dangerously-set-html-content'

const DynamicPage = ({ html = "" }) => {
    return (
        <InnerHTML html={html} />
    );
}

export default DynamicPage;