import React from 'react';

export default class Match extends React.Component {
    render(){
        return (
            <div style={styles.frame}>
                <div>Le Match</div>
            </div>
        )
    }
}

const styles = {
    frame: {
        background: 'black',
        color: 'green',
        height: '100%',
        padding:'1em'
    }
}