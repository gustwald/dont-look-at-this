import React, { Component } from 'react';
import classNames from 'classnames';
import logo from "../../icons/condomsize_logo.jpg";

class Logo extends Component {
    state = {
        isLoaded : false
    }

    render(){
        const logoClass = classNames({
            logo: true,
            // 'logo--loaded': setTimeout(function(){true},3000)
          });
        return(
            <div>
                <a href="/"><img src={logo} className={logoClass} /></a>
            </div>
        )
    }
}

export default Logo;
