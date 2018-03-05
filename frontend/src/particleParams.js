const particleParams = {
    particles: {
        shape: {
            image: {
                src: 'http://'
            }
        },
        number: {
            value: 150,
            density: {
                enable: true,
                value_area: 800
            }
        },
        move: {
            enable: true,
            direction: 'none',
            out_mode: 'out'
        },
        interactivity: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            modes: {
                detect_on: 'window'
            }
        }
    }
};

export default particleParams;
