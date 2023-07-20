// pages/some-page.js
import dynamic from 'next/dynamic';
import React from 'react';
import EmbeddedShorthand from './EmbeddedShorthand';

const DynamicPage = dynamic(() => import("./Dynamic"), {
    loading: () => <div>Loading...</div>,
    ssr: false, // Set ssr to false to disable server-side rendering for this component
});

const ExternalContent = ({ content }) => {
    return (
        <div>
            <h1>Made With External Content</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div>
                <h1>Made With Iframe</h1>
                <iframe width={"100%"} height={"600px"} src="https://leaper.store/" />
            </div>
            <h1>Made With Shorthand Stories</h1>
            <DynamicPage html={`
                    <div>
                    <p>
                        <script src="https://akdn.shorthandstories.com/mountain-meltdown/embed.js"></script>
                    </p>
                    <div data-shorthand="https://akdn.shorthandstories.com/mountain-meltdown/"></div>
                </div>
            `} />
        </div>
    );
};

export async function getServerSideProps() {
    let url = "https://akdn.shorthandstories.com/mountain-meltdown/"
    const response = await fetch(url);
    const content = await response.text();

    const replacedHTML = content.replaceAll(/\.\//g, url);

    return {
        props: {
            content: replacedHTML,
        },
    };
}

export default ExternalContent;