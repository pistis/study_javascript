import React from 'react';

var TYPE = {
    DEFAULT: 1
};

function isNoon(hours) {
    return hours == 12;
}
function isMidnight(hours) {
    return hours == 0;
}
function getDigit(num, unit) {
    unit = unit || 10;
    return num % unit;
}
function getTenthDigit(num, unit) {
    unit = unit || 10;
    return parseInt(num / unit);
}

function getTimeModel() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    return {
        'midnight' : isMidnight(hours),
        'noon' : isNoon(hours),
        'tenthHours' : getTenthDigit(hours),
        'hours' : getDigit(hours, 12),
        'tenthMinutes' : getTenthDigit(minutes),
        'minutes' : getDigit(minutes),
        'tenthSeconds' : getTenthDigit(seconds),
        'seconds' : getDigit(seconds)
    };
}

/**
 * layout
 * ['열', '한', '다', '세', '네'],
 * ['두', '여', '섯', '일', '곱'],
 * ['여', '덟', '아', '홉', '시'],
 * ['자', '정', '이', '삼', '십'],
 * ['사', '오', '십', '오', '분']
 * 5분 단위
 */
class DefaultView extends React.Component {
    constructor(props) {
        super(props);
        this.word = [
            ['열', '한', '다', '세', '네'],
            ['두', '여', '섯', '일', '곱'],
            ['여', '덟', '아', '홉', '시'],
            ['자', '정', '이', '삼', '십'],
            ['사', '오', '십', '오', '분']
        ];
    }

    getRenderModel() {
        let renderModel = [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false]
        ];
        let timeModel = getTimeModel();
        // 자정/정오
        if (timeModel.midnight) {
            renderModel[3][0] = true;   renderModel[3][1] = true;
        }
        if (timeModel.noon) {
            renderModel[3][1] = true;   renderModel[4][1] = true;
        }
        // 시간
        if (timeModel.tenthHours == 11 || timeModel.tenthHours == 11) {
            renderModel[0][0] = true;
        }
        switch(timeModel.hours) {
            case 1: renderModel[0][1] = true;   break;
            case 2: renderModel[1][0] = true;   break;
            case 3: renderModel[0][3] = true;   break;
            case 4: renderModel[0][4] = true;   break;
            case 5: renderModel[0][2] = true;   renderModel[1][2] = true;   break;
            case 6: renderModel[1][1] = true;   renderModel[1][2] = true;   break;
            case 7: renderModel[1][3] = true;   renderModel[1][4] = true;   break;
            case 8: renderModel[2][0] = true;   renderModel[2][1] = true;   break;
            case 9: renderModel[2][2] = true;   renderModel[2][3] = true;   break;
            case 10: renderModel[0][0] = true;
            case 11: renderModel[0][0] = true;   renderModel[0][1] = true;   break;
        }
        renderModel[2][4] = true;

        // 분
        switch(timeModel.tenthMinutes) {
            case 1: renderModel[3][4] = true;   break;
            case 2: renderModel[3][2] = true;   renderModel[3][4] = true;   break;
            case 3: renderModel[3][3] = true;   renderModel[3][4] = true;   break;
            case 4: renderModel[4][0] = true;   renderModel[4][2] = true;   break;
            case 5: renderModel[4][1] = true;   renderModel[4][2] = true;   break;
        }

        if (timeModel.minutes >= 5) {
            renderModel[4][3] = true;
        }

        renderModel[4][4] = true;

        return renderModel;
    }


    render() {
        let renderModel = this.getRenderModel();
        let rows = renderModel.map(function(row, i) {
            let cols = row.map(function(col, j) {
                let word = this.word[i][j];
                return (
                    <td><span className={col ? 'active' : 'deactive'}>{word}</span></td>
                )
            }.bind(this));
            return (
                <tr>{cols}</tr>
            )
        }.bind(this));

        return (
            <table className='clock_default_view'>
                    <tbody>
                        {rows}
                    </tbody>
            </table>
        )
    }
}

export class HangulClock extends React.Component {
    render() {
        if (this.props.type == TYPE.DEFAULT) {
            return (
                <DefaultView />
            )
        } else {
            return (
                <DefaultView />
            )
        }

    }
}