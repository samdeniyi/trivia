import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Zendesk, { ZendeskAPI } from "react-zendesk";
import { Loader } from '../loader';
import { useHistory } from "react-router-dom";

const setting = {
    color: {
        theme: "#000"
    },
    launcher: {
        chatLabel: {
            "en-US": "Help & Support"
        }
    }
};
const ZENDESK_KEY = "67440d8c-77a6-4466-8326-1154e9a4fdd6";
//67440d8c-77a6-4466-8326-1154e9a4fdd6  //merchlist
//c59ab4ec-4d83-4433-b17d-350faa441384 //spaces

export const ZendeskWindow = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const isOffline  = useSelector(state => state.offline.isOffline);

    useEffect(() => {
        if(isOffline){
            history.goBack();
        }
    }, [isOffline, history])

    return (
        <Fragment>
            {isLoading && <Loader />}
            <Zendesk
                zendeskKey={ZENDESK_KEY} 
                onLoaded={() => {
                    setLoading(false);
                    ZendeskAPI('webWidget', 'toggle');

                    ZendeskAPI('webWidget:on', 'open', function() {
                        console.log('The widget has been opened!');
                    });

                    ZendeskAPI('webWidget:on', 'close', function() {
                        history.goBack();
                    });

                    window.addEventListener('popstate', () => {
                        window.location.reload();
                    });
                }}
                {...setting}
            />
        </Fragment>
    );
};