import React, { useState, useEffect } from 'react';

interface Props {
    text: string;
}

const TypingEffect: React.FC<Props> = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const typingDelay = 100; // Delay between each character typing
        const erasingDelay = 50; // Delay before erasing the text
        let typingTimeout: NodeJS.Timeout;
        let erasingTimeout: NodeJS.Timeout;

        const typing = () => {
            if (currentIndex < text.length) {
                setDisplayText((prevText) => prevText + text[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
                typingTimeout = setTimeout(typing, typingDelay);
            } else {
                erasingTimeout = setTimeout(erasing, erasingDelay);
            }
        };

        const erasing = () => {
            if (displayText.length > 0) {
                setDisplayText((prevText) => prevText.slice(0, -1));
                erasingTimeout = setTimeout(erasing, erasingDelay);
            } else {
                setCurrentIndex(0);
                typingTimeout = setTimeout(typing, typingDelay);
            }
        };

        typing();

        // Cleanup function to clear timeouts if component unmounts
        return () => {
            clearTimeout(typingTimeout);
            clearTimeout(erasingTimeout);
        };
    }, [text, currentIndex, displayText]);

    return <span>{displayText}</span>;
};

export default TypingEffect;
