import React from 'react';
import Spline from '@splinetool/react-spline';
import Loader from '../common/loader';
import { useState } from 'react';
const SplineWindow = () => {
    const [loading, setLoading] = useState(true);
    return (
        <>
            <div className="h-full w-full bg-transparent fixed top-12 -z-50">
                <div
                    className={`h-full w-full flex justify-center items-center ${
                        !loading ? 'hidden' : ''
                    }`}
                >
                    <Loader />
                </div>
                <Spline
                    className={`pr-48 max-md:pr-0`}
                    style={{ height: '80%', width: '90%' }}
                    scene="https://draft.spline.design/zoF91OaKW1ycRO3N/scene.splinecode"
                    onLoad={() => setLoading(false)}
                />
            </div>
        </>
    );
};

export default SplineWindow;
