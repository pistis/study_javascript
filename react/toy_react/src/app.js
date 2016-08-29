import React from 'react'
import {HangulClock} from 'hangul_clock/hangulclock.js';

setInterval(function() {
    React.render(<HangulClock />, document.getElementById('hangul_clock'));
}, 1000);

