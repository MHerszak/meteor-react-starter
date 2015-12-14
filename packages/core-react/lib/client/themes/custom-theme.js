'use strict';

const Colors = MUI.Libs.Colors;
const ColorManipulator = MUI.Libs.ColorManipulator;
const Spacing = MUI.Libs.Spacing;

/**
 * Check out: https://github.com/callemall/material-ui/blob/master/src/styles/theme-manager.js
 * to see more.
 * @type {{spacing: *, fontFamily: string, palette: {primary1Color: string, primary2Color: string, primary3Color: string, accent1Color: string, accent2Color: string, accent3Color: string, textColor: string, alternateTextColor: string, canvasColor: string, borderColor: string, disabledColor: *}}}
 */

let color = {
    coral:"#fa7252",
    darkslategray:"#273135",
    lightgrey:"#e9f0f5",
}

let CustomTheme =
{
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: color.darkslategray,//Colors.blue200,
        primary2Color: Colors.blue400,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.pinkA200,
        accent2Color: Colors.white,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: color.lightgrey, // this will also change your background-color
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    },
    header: {
        backgroundColor: color.darkslategray,
        fontSize: '1.5em',
    },
    subHeader: {
        backgroundColor: color.coral,
        fontSize: '1.1em',
    },
    headerCommon:{
        padding: '10px',
        height:75,
        lineHeight:"40px",
        color: 'white',
    },
    font:{
        fontFamily: this.fontFamily,
        fontWeight: 500,
    }
};
_.extend(Base2Ind.Theme,{CustomTheme});